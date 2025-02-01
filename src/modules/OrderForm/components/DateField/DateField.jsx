import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import DatePicker from 'react-datepicker';
import { registerLocale } from  'react-datepicker';
import { ru } from 'date-fns/locale/ru';
import Overlay from 'components/Overlay/Overlay';
import Header from 'UI/Header/Header';
import getMaxDate from '../../helpers/getMaxDate';
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

    useEffect(() => {
        const handleOrientationChange = () => {
            if (isCalendarOpen) {
                setIsCalendarOpen(false);
                setTimeout(() => {
                    setIsCalendarOpen(true);
                }, 100);
            }
        };

        window.addEventListener('orientationchange', handleOrientationChange);
        return () => {
            window.removeEventListener('orientationchange', handleOrientationChange);
        };
    }, [isCalendarOpen]);

    const handleDateChange = (date) => {
        props.setReadyDate(date);
        props.setReadyTime(null);
    };

    const handleCalendarOpen = () => {
        setCalendarClass('fade-in');
        setIsCalendarOpen(true);
    };

    const handleCalendarClose = () => {
        setCalendarClass('fade-out');
        setIsCalendarOpen(false);
    }

    const handleOverlayClick = () => {
        handleCalendarClose();
    }

    return (
        <div className='readyDate'>
            <Header text={ deliveryOption === 'pickup' ? 'Дата самовывоза:' : 'Дата доставки:' }/>
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
                popperPlacement='top'
                open={isCalendarOpen}
            />
            {isCalendarOpen && <Overlay onClick={handleOverlayClick} />}
        </div>
    )
}