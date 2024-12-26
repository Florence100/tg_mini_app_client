import React, { useState } from 'react';
import Select, { components } from 'react-select';
import { useSelector } from 'react-redux';
import './timeField.css';


export default function TimeField(props) {
    const deliveryOption = useSelector(state => state.form.delivery);
    const [isMenuOpen, setIsMenuOpen] = useState(false);

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

    const handleSelectOpen = () => {
        setIsMenuOpen(true);
    };

    const handleSelectClose = () => {
        setIsMenuOpen(false);
    }

    const CustomInput = (props) => (
        <components.Input 
            {...props} 
            inputMode='none' 
            readOnly 
            onClick={handleSelectOpen}
        />
    );

    return (
        <div className='readyTime'>
            <label htmlFor='readyTime' className='header'>
                { deliveryOption === 'pickup' ? 'Время самовывоза:' : 'Время доставки:' }
            </label>
            <Select
                options={timeOptions}
                value={props.readyTime}
                onChange={handleTimeChange}
                onMenuOpen={handleSelectOpen}
                onMenuClose={handleSelectClose}
                openMenuOnClick={true}
                onFocus={() => console.log('Focus')}
                onKeyDown={() => console.log('Key Down')}
                isOptionDisabled={(option) => {
                    const currentDate = new Date();
                    const selectedDate = new Date(props.readyDate);
                    // const startTime = parseInt(option.value.split(':')[0]);
                    const endTime = parseInt(option.value.split('-')[1].split(':')[0]);
                    // Устанавливаем часы объекта selectedDate на значение конечного времени
                    selectedDate.setHours(endTime);
                    // Проверяем, готов ли заказ не ранее чем через 1 час от текущего времени
                    return currentDate.getTime() + 1 * 60 * 60 * 1000 > selectedDate.getTime();
                } }
                placeholder='Выберите время'
                components={{ Input: CustomInput }}
                menuPlacement='top'
                classNamePrefix={isMenuOpen ? 'menu-open' : 'menu-close'}
                styles={{
                    control: (baseStyles, state) => ({
                        ...baseStyles,
                        borderRadius: 0,
                        border: 0,
                        borderBottom: '1px solid var(--tg-theme-section-separator-color)',
                        boxShadow: 'none',
                        backgroundColor: 'var(--tg-theme-bg-color)',
                    }),
                    menu: (baseStyles, state) => ({
                        ...baseStyles,
                        borderRadius: 0,
                        boxShadow: '0 4px 8px rgba(0, 0, 0, 0.5)',
                        border: '1px solid var(--tg-theme-section-separator-color)',
                    }),
                    option: (baseStyles, state) => ({
                        ...baseStyles,
                        padding: 'var(--medium-padding) var(--big-padding)',
                        backgroundColor: state.isSelected ? 'var(--primary-color)' : 'var(--tg-theme-bg-color)',
                    }),
                    valueContainer: (baseStyles, state) => ({
                        ...baseStyles,
                        padding: 'var(--medium-padding) var(--big-padding)',
                    }),
                    input: (baseStyles, state) => ({
                        ...baseStyles,
                        margin: 0,
                        padding: 0,
                    }),
                    placeholder: (baseStyles, states) => ({
                        ...baseStyles,
                        color: 'var(--tg-theme-hint-color)',
                        fontSize: '1rem',
                        margin: 0,
                        fontFamily: "'Arial', sans-serif"
                    }),
                    dropdownIndicator: (baseStyles, states) => ({
                        ...baseStyles,
                        width: '100%',
                        position: 'absolute',
                        top: 0,
                        left: 0,
                        height: '100%',
                        opacity: 0,
                    })
                }}
            />
        </div>
    )
}