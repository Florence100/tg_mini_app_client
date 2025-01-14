import { useEffect, useState, useRef, useCallback, useMemo } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import Cart from '../../../features/cart/Cart';
import OrderForm from '../../../features/orderForm/OrderForm';
import useTelegram from '../../hooks/useTelegram';
import useDeliveryCost from '../../hooks/useDeliveryCost';
import './checkout.css';
import { useIsCartEmpty, useCartItems, useCartAmount } from '../../hooks/useCartStatus';

const serverUrl = `https://${process.env.REACT_APP_SERVER_URL}`;


function Checkout () {
    const { tg, user, chatId } = useTelegram();
    const isCartEmpty = useIsCartEmpty();
    const cartItems = useCartItems();
    const cartAmount = useCartAmount();
    const navigate = useNavigate();
    const [readyDate, setReadyDate] = useState(null);
    const [readyTime, setReadyTime] = useState(null);
    const [address, setAddress] = useState('');
    const deliveryCost = useDeliveryCost(cartAmount);
    const deliveryOption = useSelector(state => state.form.delivery);

    const commentRef = useRef('');

    useEffect(() => {
        function handleBackBtnClick () {
            navigate(-1);
        }

        tg.BackButton.show();
        tg.BackButton.onClick(handleBackBtnClick);

        return () => {
            tg.BackButton.hide();
            tg.BackButton.offClick(handleBackBtnClick);
        }
    }, [tg, navigate])


    const openPaymentSystem = useCallback(async () => {
        console.log('Payment system will be open');
        try {
            const response = await fetch(`${serverUrl}/create-invoice`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    paymentPayload : {
                        userId         : user?.id,
                        cartItems      : cartItems,
                        deliveryOption : deliveryOption,
                        deliveryCost   : deliveryOption === 'delivery' ? deliveryCost : 0,
                        readyDate      : readyDate,
                        readyTime      : readyTime.value,
                        address        : address,
                        comment        : commentRef.current
                    },
                })
            })
            
            const data = await response.json();
            tg.openInvoice(data.invoiceLink);
        } catch (error) {
            console.error(error);
            if (tg.isVersionAtLeast('6.2')) {
                tg.showPopup({ 
                    message: 'Произошла ошибка при создании счета. Попробуйте еще раз.',
                    buttons: [{
                        text: 'Хорошо, спасибо',
                    }]
                })
            } else {
                alert('Произошла ошибка при создании счета. Попробуйте еще раз.');
            }
        } finally {
            tg.MainButton.hideProgress();
        }
    }, [address, cartItems, deliveryCost, deliveryOption, readyDate, readyTime, tg, user?.id])


    const handleMainBtnClick = useCallback(() => {
        openPaymentSystem();
        tg.MainButton.showProgress();
    }, [openPaymentSystem, tg.MainButton]);


    const mainButtonParams = useMemo(() => {
        if (!isCartEmpty && readyDate && readyTime) {
            if (deliveryOption === 'pickup') {
                return {
                    color: '#31b545',
                    text: `Оплатить ${cartAmount.toFixed(2)} руб.`,
                    hasShineEffect: true };
            } else if (deliveryOption === 'delivery' && address) {
                return {
                    color: '#31b545',
                    text: `Оплатить ${(cartAmount + deliveryCost).toFixed(2)} руб.`,
                    hasShineEffect: true
                };
            }
        }
        return null;
    }, [address, cartAmount, deliveryCost, deliveryOption, isCartEmpty, readyDate, readyTime]);


    useEffect(() => {
        if (mainButtonParams) {
            tg.MainButton.setParams(mainButtonParams).show();
            tg.MainButton.onClick(handleMainBtnClick);
        } else {
            tg.MainButton.hide();
            tg.MainButton.offClick(handleMainBtnClick);
        }
    }, [mainButtonParams, handleMainBtnClick, tg.MainButton]);


    const invoiceDelete = useCallback(async (slug, status) => {
        try {
            await fetch(`${serverUrl}/delete-invoice`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    slug: slug,
                    status: status,
                    chatId: chatId ? chatId : user?.id,
                })
            })
        } catch (error) {
            console.error(error);
        }
    }, [chatId, user?.id])


    const onInvoiceCloseHandler = useCallback((eventType, eventData) => {
        if (eventType === 'invoice_closed') {
            console.log('eventData: ', eventData)
            if (eventData.status === 'failed' || eventData.status === 'cancelled') {
                invoiceDelete(eventData.slug, eventData.status);
            }
            if (eventData.status === 'paid') {
                console.log('Successful payment. Mini app is closing');
                invoiceDelete(eventData.slug, eventData.status).then(() => {
                    tg.close();
                });
            }
        }
    }, [invoiceDelete, tg])


    const wrapReceiveEvent = useCallback((originalFunction) => {
        return function(eventType, eventData) {
            if (eventType === 'invoice_closed') {
                onInvoiceCloseHandler(eventType, eventData);
            }
            if (originalFunction) {
                originalFunction(eventType, eventData);
            }
        };
    }, [onInvoiceCloseHandler])


    useEffect(() => {
        // Обработка собственных событий Telegram
        let originalReceiveEvent;

        if (window.TelegramGameProxy) {
            originalReceiveEvent = window.TelegramGameProxy.receiveEvent;
            window.TelegramGameProxy.receiveEvent = wrapReceiveEvent(window.TelegramGameProxy.receiveEvent);
        }

        if (window.Telegram && window.Telegram.WebView) {
            originalReceiveEvent = window.Telegram.WebView.receiveEvent;
            window.Telegram.WebView.receiveEvent = wrapReceiveEvent(window.Telegram.WebView.receiveEvent);
        }

        if (window.TelegramGameProxy_receiveEvent) {
            originalReceiveEvent = window.TelegramGameProxy_receiveEvent;
            window.TelegramGameProxy_receiveEvent = wrapReceiveEvent(window.TelegramGameProxy_receiveEvent);
        }

        return () => {
            if (window.TelegramGameProxy) {
                window.TelegramGameProxy.receiveEvent = originalReceiveEvent;
            }
    
            if (window.Telegram && window.Telegram.WebView) {
                window.Telegram.WebView.receiveEvent = originalReceiveEvent;
            }
    
            if (window.TelegramGameProxy_receiveEvent) {
                window.TelegramGameProxy_receiveEvent = originalReceiveEvent;
            }
        };
    }, [tg, chatId, user, invoiceDelete, onInvoiceCloseHandler, wrapReceiveEvent])


    return (
        <div className='checkout'>
            <Cart
                isCartEmpty={isCartEmpty}
                cartItems={cartItems}
                cartAmount={cartAmount}
                deliveryCost={deliveryCost}
            ></Cart>
            {!isCartEmpty && 
                <OrderForm 
                    comment={commentRef}
                    address={address}
                    readyDate={readyDate}
                    readyTime={readyTime}
                    setReadyDate={setReadyDate}
                    setReadyTime={setReadyTime}
                    setAddress={setAddress}
                />
            }
        </div>
    )
}

export default Checkout;