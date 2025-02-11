import React, { useRef, useState, useEffect, useCallback, useMemo } from 'react';
import { useSelector } from 'react-redux';
import DeliveryField from '../DeliveryField/DeliveryField';
import DateField from '../DateField/DateField';
import TimeField from '../TimeField/TimeField';
import AddressField from '../AddressField/AddressField';
import CommentField from '../CommentField/CommentField';
import useDeliveryCost from 'hooks/useDeliveryCost';
import useTelegram from 'hooks/useTelegram';
import { useIsCartEmpty, useCartItems, useCartAmount } from 'hooks/useCartStatus';
import addInvoice from './fetch/addInvoice';
import deleteInvoice from './fetch/deleteInvoice';
import 'react-datepicker/dist/react-datepicker.css';
import './orderForm.css';


export default function OrderForm () {
    const [readyDate, setReadyDate] = useState(null);
    const [readyTime, setReadyTime] = useState(null);
    const [address, setAddress] = useState('');
    const datePickerRef = useRef(null);
    const commentRef = useRef('');

    const { tg, user, chatId } = useTelegram();
    const isCartEmpty = useIsCartEmpty();
    const cartItems = useCartItems();
    const cartAmount = useCartAmount();
    const deliveryCost = useDeliveryCost(cartAmount);
    const deliveryOption = useSelector(state => state.form.delivery);

    const handleSubmit = (e) => {
        e.preventDefault();
    };

    const openPaymentSystem = useCallback(async (payload) => {
        console.log('Payment system will be open');
        try {
            const response = await addInvoice(payload);
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
    }, [tg]);


    const handleMainBtnClick = useCallback(() => {
        const payload = {
            userId         : user?.id || chatId,
            cartItems      : cartItems,
            deliveryOption : deliveryOption,
            deliveryCost   : deliveryOption === 'delivery' ? deliveryCost : 0,
            readyDate      : readyDate,
            readyTime      : readyTime.value,
            address        : address,
            commentRef     : commentRef.current
        }
        console.log('payload:', payload);
        openPaymentSystem(payload);
        tg.MainButton.showProgress();
    }, [address, cartItems, chatId, deliveryCost, deliveryOption, openPaymentSystem, readyDate, readyTime, tg, user?.id]);


    const mainButtonParams = useMemo(() => {
        if (!isCartEmpty && readyDate && readyTime && commentRef) {
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

        return() => {
            tg.MainButton.hide();
            tg.MainButton.offClick(handleMainBtnClick);
        }

    }, [mainButtonParams, handleMainBtnClick, tg]);


    const onInvoiceCloseHandler = useCallback((eventType, eventData) => {
        if (eventType === 'invoice_closed') {
            console.log('eventData: ', eventData)
            if (eventData.status === 'failed' || eventData.status === 'cancelled') {
                deleteInvoice(eventData.slug, eventData.status, chatId, user);
            }
            if (eventData.status === 'paid') {
                console.log('Successful payment. Mini app is closing');
                deleteInvoice(eventData.slug, eventData.status, chatId, user).then(() => {
                    tg.close();
                });
            }
        }
    }, [tg, chatId, user]);


    const wrapReceiveEvent = useCallback((originalFunction) => {
        return function(eventType, eventData) {
            if (eventType === 'invoice_closed') {
                onInvoiceCloseHandler(eventType, eventData);
            }
            if (originalFunction) {
                originalFunction(eventType, eventData);
            }
        };
    }, [onInvoiceCloseHandler]);


    useEffect(() => {
        // Обработка собственных событий Telegram
        let originalReceiveEvent;

        if (window.TelegramGameProxy) {
            originalReceiveEvent = window.TelegramGameProxy.receiveEvent;
            window.TelegramGameProxy.receiveEvent = wrapReceiveEvent(originalReceiveEvent);
        }

        if (window.Telegram && window.Telegram.WebView) {
            originalReceiveEvent = window.Telegram.WebView.receiveEvent;
            window.Telegram.WebView.receiveEvent = wrapReceiveEvent(originalReceiveEvent);
        }

        if (window.TelegramGameProxy_receiveEvent) {
            originalReceiveEvent = window.TelegramGameProxy_receiveEvent;
            window.TelegramGameProxy_receiveEvent = wrapReceiveEvent(originalReceiveEvent);
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
    }, [tg, chatId, user, onInvoiceCloseHandler, wrapReceiveEvent]);

    return (
        <form onSubmit={handleSubmit} className='order-form'>
            <DeliveryField />
            <DateField
                readyDate={readyDate}
                setReadyDate={setReadyDate}
                setReadyTime={setReadyTime}
                datePickerRef={datePickerRef}
            />
            <TimeField
                readyTime={readyTime}
                readyDate={readyDate}
                setReadyTime={setReadyTime}
            />
            { deliveryOption === 'delivery' && 
                <AddressField 
                    address={address}
                    setAddress={setAddress}
                />
            }
            <CommentField 
                comment={commentRef}
            />
        </form>
    )
}