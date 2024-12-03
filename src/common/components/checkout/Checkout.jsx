import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import Cart from '../../../features/cart/Cart';
import { OrderForm } from '../orderForm/OrderForm';
import useTelegram from '../../hooks/useTelegram';
import useCartStatus from '../../hooks/useCartStatus';
import useDeliveryCost from '../../hooks/useDeliveryCost';
import './checkout.css';

function Checkout () {
    const { tg } = useTelegram();
    const navigate = useNavigate();
    const { isEmpty, productsList, totalAmount } = useCartStatus();
    const [readyDate, setReadyDate] = useState(null);
    const [readyTime, setReadyTime] = useState(null);
    const [comment, setComment] = useState('');
    const serverUrl = `https://${ process.env.REACT_APP_SERVER_URL }`;
    const deliveryCost = useDeliveryCost();
    const deliveryOption = useSelector(state => state.form.delivery);

    useEffect(() => {
        tg.BackButton.show();
        tg.BackButton.onClick(() => {
            navigate(-1);
        })
    })

    useEffect(() => {
        if (!isEmpty && deliveryOption && readyDate && readyTime ) {
            tg.MainButton
                .setParams({
                    color: '#31b545',
                    text: 
                        deliveryOption === 'delivery'
                            ? `Оплатить ${(totalAmount + deliveryCost).toFixed(2)} руб.`
                            : `Оплатить ${totalAmount.toFixed(2)} руб.`,
                    hasShineEffect: true
                })
                .show();
            tg.MainButton.onClick(onMainBtnClickHandler);
        }
        return () => {
            tg.MainButton.hide();
            tg.MainButton.offClick(onMainBtnClickHandler);
        };
    }, [isEmpty, deliveryOption, deliveryCost, readyDate, readyTime])


    useEffect(() => {
        const onInvoiceCloseHandler = (eventType, eventData) => {
            if (eventType === 'invoice_closed') {
                if (eventData.status === 'paid') {
                    tg.close();
                }
            }
        }
        
        const wrapReceiveEvent = (originalFunction) => {
            return function(eventType, eventData) {
                if (eventType === 'invoice_closed') {
                    onInvoiceCloseHandler(eventType, eventData);
                }
                if (originalFunction) {
                    originalFunction(eventType, eventData);
                }
            };
        }

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
    }, [])

    const onMainBtnClickHandler = () => {
        openPaymentSystem();
    }

    const openPaymentSystem = async () => {
        try {
            const response = await fetch(`${serverUrl}/create-invoice`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    paymentPayload : {
                        productsList   : productsList,
                        deliveryOption : deliveryOption,
                        deliveryCost   : deliveryOption === 'delivery' ? deliveryCost : 0,
                        readyDate      : readyDate,
                        readyTime      : readyTime.value,
                        comment        : comment
                    },
                })
            })
            
            const data = await response.json();
            tg.openInvoice(data.invoiceLink);
        } catch (error) {
            console.error(error);
            //Добавить навигацию на страницу ошибки
        }
    }

    return (
        <div className='checkout'>
            <Cart></Cart>
            {!isEmpty && 
                <OrderForm 
                    comment={comment}
                    readyDate={readyDate}
                    readyTime={readyTime}
                    setReadyDate={setReadyDate}
                    setReadyTime={setReadyTime}
                    setComment={setComment}
                />
            }
        </div>
    )
}

export default Checkout;