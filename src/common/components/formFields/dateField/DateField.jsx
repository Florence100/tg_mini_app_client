import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import DatePicker from 'react-datepicker';
import { registerLocale } from  'react-datepicker';
import { ru } from 'date-fns/locale/ru';
import './dateField.css';

registerLocale('ru', ru);


const CustomDateInput = React.forwardRef(({ value, onClick }, ref) => (
    <input
      value={value}
      onClick={onClick}
      ref={ref}
      placeholder='Выберите дату'
      inputMode='none' // Отключаем виртуальную клавиатуру
      readOnly
    />
));


export default function DateField(props) {
    const deliveryOption = useSelector(state => state.form.delivery);
    const [calendarClass, setCalendarClass] = useState('fade-in');
    const [isCalendarOpen, setIsCalendarOpen] = useState(false);

    const getMaxDate = () => { 
        const currentDate = new Date();
        const thirtyDaysInMs = 30 * 24 * 60 * 60 * 1000; //30 days in ms 
        return new Date(currentDate.getTime() + thirtyDaysInMs);
    } 

    const handleDateChange = (date) => {
        props.setReadyDate(date);
        props.setReadyTime(null);
    };

    const handleCalendarOpen = () => {
        console.log('handleCalendarOpen', isCalendarOpen)
        setCalendarClass('fade-in');
        setIsCalendarOpen(true);
    };

    const handleCalendarClose = () => {
        console.log('handleCalendarClose', isCalendarOpen)
        setCalendarClass('fade-out');
        setIsCalendarOpen(false);
    }

    return (
        <div className='readyDate'>
            <label htmlFor='readyDate' className='header'>
                { deliveryOption === 'pickup' ? 'Дата самовывоза:' : 'Дата доставки:' }
            </label>
            <DatePicker
                ref={props.datePickerRef}
                selected={props.readyDate}
                onChange={handleDateChange}
                minDate={new Date()}
                maxDate={getMaxDate()}
                locale='ru'
                dateFormat='dd-MM-yyyy'
                customInput={<CustomDateInput />}
                onCalendarOpen={handleCalendarOpen}
                onCalendarClose={handleCalendarClose}
                calendarClassName={calendarClass}
            />
            {isCalendarOpen && <div className='datepicker-overlay' onClick={handleCalendarClose}></div>}
        </div>
    )
}