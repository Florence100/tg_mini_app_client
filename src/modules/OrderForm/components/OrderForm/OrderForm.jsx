import React, { useRef, useEffect, useCallback, useMemo } from 'react';
import { useSelector } from 'react-redux';
import DeliveryField from '../DeliveryField/DeliveryField';
import DateField from '../DateField/DateField';
import TimeField from '../TimeField/TimeField';
import AddressField from '../AddressField/AddressField';
import CommentField from '../CommentField/CommentField';
import useTelegram from 'hooks/useTelegram';
import { useIsCartEmpty } from 'hooks/useIsCartEmpty';
import useTelegramEvents from 'hooks/useTelegramEvents';
import createInvoice from './fetch/createInvoice';
import createOrder from './fetch/createOrder';
import { showWarningPopup } from 'helpers/showPopup';
import handleApiResponse from 'helpers/handleApiResponse';
import formatMoney from 'helpers/formatMoney';
import 'react-datepicker/dist/react-datepicker.css';
import './orderForm.css';


export default function OrderForm ({ deliveryCost, cartAmount }) {
    const commentRef = useRef('');
    const { tg, initData } = useTelegram();
    const isCartEmpty = useIsCartEmpty();
    const deliveryOption = useSelector(state => state.form.delivery);
    const readyDate = useSelector(state => state.form.readyDate);
    const readyTime = useSelector(state => state.form.readyTime);
    const address = useSelector(state => state.form.address);
    const cartItems = useSelector(state => Object.values(state.cart.entities));
    useTelegramEvents();

    const openPaymentSystem = useCallback((orderId) => {
        if (!tg.isVersionAtLeast('6.2')) {
            showWarningPopup(tg, 'Пожалуйста, обновите версию Telegram до версии 6.2 и выше');
            return;
        }

        createInvoice(initData, orderId)
            .then((data) => {
                if (data.error) {
                    handleApiResponse(data, tg);
                    return;
                }
                tg.openInvoice(data.invoiceLink);
            })
            .finally(() => {
                tg.MainButton.hideProgress();
            })
    }, [initData, tg]);


    const handleMainBtnClick = useCallback(() => {
        const payload = {
            deliveryOption : deliveryOption,
            deliveryCost   : deliveryOption === 'delivery' ? deliveryCost : 0,
            readyDate      : readyDate,
            readyTime      : readyTime?.value,
            address        : address,
            comment        : commentRef.current,
            cartItems      : cartItems
        }

        createOrder(initData, payload)
            .then((data) => {
                if (data.error) {
                    handleApiResponse(data, tg);
                    return;
                }

                const orderId = data.orderId;
                openPaymentSystem(orderId);
                tg.MainButton.showProgress();
            })
    }, [deliveryOption, deliveryCost, readyDate, readyTime?.value, address, cartItems, initData, openPaymentSystem, tg]);


    const mainButtonParams = useMemo(() => {
        return {
            text: deliveryOption === 'pickup' 
                ? `Оплатить ${formatMoney(cartAmount).toFixed(2)} руб.` 
                : `Оплатить ${formatMoney(cartAmount + deliveryCost).toFixed(2)} руб.`,
            hasShineEffect: true
        }
    }, [deliveryOption, cartAmount, deliveryCost])

    const shouldShowButton = useMemo(() => {
        if (deliveryOption === 'pickup') {
            return !isCartEmpty && readyDate && readyTime;
        } else if (deliveryOption === 'delivery') {
            return !isCartEmpty && readyDate && readyTime && address;
        }
        return false;
    }, [address, deliveryOption, isCartEmpty, readyDate, readyTime])

    useEffect(() => {
        if (shouldShowButton) {
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
    }, [handleMainBtnClick, mainButtonParams, shouldShowButton, tg.MainButton]);


    const handleSubmit = (e) => {
        e.preventDefault();
    };

    return (
        <form onSubmit={handleSubmit} className='order-form'>
            <DeliveryField />
            <DateField />
            <TimeField />
            { deliveryOption === 'delivery' && <AddressField /> }
            <CommentField comment={commentRef} />
        </form>
    )
}