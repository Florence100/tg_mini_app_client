import React from 'react';
import { useSelector } from 'react-redux';
import DatePicker from 'react-datepicker';
import { registerLocale } from  'react-datepicker';
import { ru } from 'date-fns/locale/ru';


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
                ref={props.datePickerRef}
                selected={props.readyDate}
                onChange={handleDateChange}
                minDate={new Date()}
                maxDate={getMaxDate()}
                locale='ru'
                dateFormat='dd-MM-yyyy'
                customInput={<CustomDateInput />}
            />
        </div>
    )
}