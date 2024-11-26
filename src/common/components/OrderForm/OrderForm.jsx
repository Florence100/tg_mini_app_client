import React from 'react';
import DOMPurify from 'dompurify';
import DatePicker from 'react-datepicker';
import { registerLocale } from  "react-datepicker";
import { ru } from 'date-fns/locale/ru';
import Select from 'react-select';
import 'react-datepicker/dist/react-datepicker.css';
import './OrderForm.css';

function OrderForm(props) {
    registerLocale('ru', ru);

    const timeOptions = [
        { value: '12:00-14:00', label: '12:00 - 14:00' },
        { value: '14:00-16:00', label: '14:00 - 16:00' },
        { value: '16:00-18:00', label: '16:00 - 18:00' },
        { value: '18:00-20:00', label: '18:00 - 20:00' },
        { value: '20:00-22:00', label: '20:00 - 22:00' },
    ];

    const handleSubmit = (e) => {
        e.preventDefault();
    };

    const getMaxDate = () => {
        const currentDate = new Date();
        const thirtyDaysInMs = 30 * 24 * 60 * 60 * 1000; //30 days in ms
        return new Date(currentDate.getTime() + thirtyDaysInMs);
    }
    
    const onDateChangeHandler = (date) => {
        props.setReadyDate(date);
        props.setReadyTime(null);
    };

    const onTimeChangeHandler = (time) => {
        props.setReadyTime(time);
    }

    const onCommentChangeHandler = (event) => {
        const sanitizedValue = DOMPurify.sanitize(event.target.value);
        props.setComment(sanitizedValue);
    }

    return (
        <form onSubmit={handleSubmit} className='order-form'>
            <div className='delivery'>
                <div className='header'>Выберите:</div>
                <label>
                    <input
                        type='radio'
                        id='pickup'
                        name='deliveryOption'
                        value='pickup'
                        checked={props.deliveryOption === 'pickup'}
                        onChange={(e) => props.setDeliveryOption(e.target.value)}
                    />
                    <span className='custom-radio'></span>
                    <span>Самовывоз</span>
                </label>
                <label>
                    <input
                        type='radio'
                        id='delivery'
                        name='deliveryOption'
                        value='delivery'
                        checked={props.deliveryOption === 'delivery'}
                        onChange={(e) => props.setDeliveryOption(e.target.value)}
                    />
                    <span className='custom-radio'></span>
                    <span>Доставка курьером - <b>500 руб.</b>*</span>
                </label>
                <span>
                    * <span className='delivery-info'><b>Бесплатная </b>доставка при заказе от 5 000 руб.</span>
                </span>
            </div>
            <div className='readyDate'>
                <label htmlFor='readyDate' className='header'>
                    {props.deliveryOption === 'pickup' ? 'Дата самовывоза:' : 'Дата доставки:'}
                </label>
                <DatePicker
                    selected={props.readyDate}
                    onChange={onDateChangeHandler}
                    minDate={new Date()}
                    maxDate={getMaxDate()}
                    locale='ru'
                    dateFormat='dd-MM-yyyy'
                    placeholderText='Выберите дату'
                />
            </div>
            <div className='readyTime'>
                <label htmlFor='readyTime' className='header'>
                    {props.deliveryOption === 'pickup' ? 'Время самовывоза:' : 'Время доставки:'}
                </label>
                <Select
                    options={timeOptions}
                    value={props.readyTime}
                    onChange={onTimeChangeHandler}
                    isOptionDisabled={(option) => {
                        const currentDate = new Date();
                        const selectedDate = new Date(props.readyDate);
                        selectedDate.setHours(parseInt(option.value.split(':')[0]));
                        //готовность не ранее 1 часа от текущего времени
                        return currentDate.getTime() + 1 * 60 * 60 * 1000 > selectedDate.getTime();
                    }}
                    placeholder='Выберите время'
                />
            </div>
            <div className='text-field-wrap'>
                <textarea 
                    className='text-field' 
                    rows='1' 
                    placeholder='Комментарий к заказу'
                    onChange={onCommentChangeHandler}
                ></textarea>
            </div>
        </form>
    )
}

export { OrderForm };