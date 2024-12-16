import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import DOMPurify from 'dompurify';
import DatePicker from 'react-datepicker';
import { registerLocale } from  'react-datepicker';
import { ru } from 'date-fns/locale/ru';
import Select from 'react-select';
import { deliveryChange } from './formSlice';
import 'react-datepicker/dist/react-datepicker.css';
import './orderForm.css';


function DeliveryChoice () {
    const dispatch = useDispatch();
    const deliveryOption = useSelector(state => state.form.delivery);

    return (
        <div className='delivery'>
            <div className='header'>Выберите:</div>
            <label>
                <input
                    type='radio'
                    id='pickup'
                    name='deliveryOption'
                    value='pickup'
                    checked={deliveryOption === 'pickup'}
                    onChange={(e) => dispatch(deliveryChange(e.target.value))}
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
                    checked={deliveryOption === 'delivery'}
                    onChange={(e) => dispatch(deliveryChange(e.target.value))}
                />
                <span className='custom-radio'></span>
                <span>Доставка курьером - <b>500 руб.</b>*</span>
            </label>
            <span>
                * <span className='delivery-info'><b>Бесплатная </b>доставка при заказе от 5 000 руб.</span>
            </span>
        </div>
    )
}


function ReadyDateChoice (props) {
    registerLocale('ru', ru);
    const deliveryOption = useSelector (state => state.form.delivery);

    const getMaxDate = () => {
        const currentDate = new Date();
        const thirtyDaysInMs = 30 * 24 * 60 * 60 * 1000; //30 days in ms
        return new Date(currentDate.getTime() + thirtyDaysInMs);
    }
    
    const handleDateChange = (date) => {
        props.setReadyDate(date);
        props.setReadyTime(null);
    };

    return (
        <div className='readyDate'>
            <label htmlFor='readyDate' className='header'>
                { deliveryOption === 'pickup' ? 'Дата самовывоза:' : 'Дата доставки:' }
            </label>
            <DatePicker
                selected = { props.readyDate }
                onChange = { handleDateChange }
                minDate = { new Date() }
                maxDate = { getMaxDate() }
                locale = 'ru'
                dateFormat = 'dd-MM-yyyy'
                placeholderText = 'Выберите дату'
            />
        </div>
    )
}


function ReadyTimeChoice (props) {
    const deliveryOption = useSelector (state => state.form.delivery);

    const timeOptions = [
        { value: '12:00-14:00', label: '12:00 - 14:00' },
        { value: '14:00-16:00', label: '14:00 - 16:00' },
        { value: '16:00-18:00', label: '16:00 - 18:00' },
        { value: '18:00-20:00', label: '18:00 - 20:00' },
        { value: '20:00-22:00', label: '20:00 - 22:00' },
    ];

    const handleTimeChange = (time) => {
        props.setReadyTime(time);
    }

    return (
        <div className='readyTime'>
            <label htmlFor='readyTime' className='header'>
                { deliveryOption === 'pickup' ? 'Время самовывоза:' : 'Время доставки:' }
            </label>
            <Select
                options = { timeOptions }
                value = { props.readyTime }
                onChange = { handleTimeChange }
                isOptionDisabled = { (option) => {
                    const currentDate = new Date();
                    const selectedDate = new Date(props.readyDate);
                    selectedDate.setHours(parseInt(option.value.split(':')[0]));
                    //готовность не ранее 1 часа от текущего времени
                    return currentDate.getTime() + 1 * 60 * 60 * 1000 > selectedDate.getTime();
                } }
                placeholder='Выберите время'
            />
        </div>
    )
}


function AddressField(props) {
    const handleAddressChange = (event) => {
        const sanitizedValue = DOMPurify.sanitize(event.target.value);
        props.setAddress(sanitizedValue);
    }

    return (
        <div className='text-field-wrap'>
            <textarea
                className = 'text-field'
                rows = '1'
                placeholder = 'Адрес доставки'
                onChange = { handleAddressChange }
            ></textarea>
        </div>
    )
}


function CommentField(props) {
    const handleCommentChange = (event) => {
        const sanitizedValue = DOMPurify.sanitize(event.target.value);
        props.setComment(sanitizedValue);
    }

    return (
        <div className='text-field-wrap'>
            <textarea
                className = 'text-field'
                rows = '1'
                placeholder = 'Комментарий к заказу'
                onChange = { handleCommentChange }
            ></textarea>
        </div>
    )
}


export default function OrderForm (props) {
    console.log('props: ', props)
    const deliveryOption = useSelector(state => state.form.delivery);
    console.log('deliveryOption: ', deliveryOption)

    const handleSubmit = (e) => {
        e.preventDefault();
    };

    return (
        <form onSubmit={handleSubmit} className='order-form'>
            <DeliveryChoice />
            <ReadyDateChoice 
                readyDate    = { props.readyDate }
                setReadyDate = { props.setReadyDate }
                setReadyTime = { props.setReadyTime }
            />
            <ReadyTimeChoice 
                readyTime    = { props.readyTime }
                setReadyTime = { props.setReadyTime }
            />
            { deliveryOption === 'delivery' && 
                <AddressField 
                    address    = { props.address }
                    setAddress = { props.setAddress }
                />
            }
            <CommentField 
                comment    = { props.comment }
                setComment = { props.setComment }
            />
        </form>
    )
}