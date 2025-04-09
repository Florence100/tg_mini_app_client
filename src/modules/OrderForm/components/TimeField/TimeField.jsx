import React, { useState } from 'react';
import Select, { components } from 'react-select';
import { useSelector, useDispatch } from 'react-redux';
import { readyTimeChange } from '../../store/formSlice';
import Overlay from 'components/Overlay/Overlay';
import Header from 'UI/Header/Header';
import useTelegram from 'hooks/useTelegram';
import './timeField.css';

const timeOptions = [
    { value: '12:00-14:00', label: '12:00 - 14:00' },
    { value: '14:00-16:00', label: '14:00 - 16:00' },
    { value: '16:00-18:00', label: '16:00 - 18:00' },
    { value: '18:00-20:00', label: '18:00 - 20:00' },
    { value: '20:00-22:00', label: '20:00 - 22:00' },
];

export default function TimeField() {
    const dispatch = useDispatch();
    const deliveryOption = useSelector(state => state.form.delivery);
    const readyDate = useSelector(state => state.form.readyDate);
    const readyTime = useSelector(state => state.form.readyTime);
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const { tg } = useTelegram();

    const handleTimeChange = (time) => {
        dispatch(readyTimeChange(time));
        tg?.HapticFeedback.selectionChanged();
    }

    const handleSelectOpen = () => {
        setIsMenuOpen(true);
    };

    const handleSelectClose = () => {
        setIsMenuOpen(false);
    }

    const handleOverlayClick = (e) => {
        e.stopPropagation();
        setIsMenuOpen(false);
    }

    const CustomInput = (props) => (
        <components.Input 
            {...props} 
            inputMode='none'
            readOnly
        />
    );

    return (
        <div className='readyTime'>
            <Header text={ deliveryOption === 'pickup' ? 'Время самовывоза:' : 'Время доставки:' }/>
            <Select
                options={timeOptions}
                value={readyTime}
                onChange={handleTimeChange}
                onMenuOpen={handleSelectOpen}
                onMenuClose={handleSelectClose}
                openMenuOnClick={true}
                isDisabled={readyDate ? false : true}
                isOptionDisabled={ (option) => {
                    const currentDate = new Date();
                    const selectedDate = new Date(readyDate);
                    const endTime = parseInt(option.value.split('-')[1].split(':')[0]);
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
                        backgroundColor: 'var(--tg-theme-bg-color)'
                    }),
                    menu: (baseStyles, state) => ({
                        ...baseStyles,
                        borderRadius: 0,
                        boxShadow: '0 4px 8px rgba(0, 0, 0, 0.5)',
                        border: '1px solid var(--tg-theme-section-separator-color)',
                        zIndex: 1000,
                        backgroundColor: 'var(--tg-theme-bg-color)',
                    }),
                    option: (baseStyles, state) => ({
                        ...baseStyles,
                        padding: 'var(--medium-padding)',
                        backgroundColor: state.isSelected 
                            ? 'var(--primary-color)' 
                            :  'var(--tg-theme-bg-color)',
                        ':active': {
                            backgroundColor: 'var(--primary-color-translucent)',
                        },
                    }),
                    valueContainer: (baseStyles, state) => ({
                        ...baseStyles,
                        padding: 'var(--medium-padding)',
                    }),
                    input: (baseStyles, state) => ({
                        ...baseStyles,
                        margin: 0,
                        padding: 0,
                    }),
                    singleValue: (baseStyles, state) => ({
                        ...baseStyles,
                        color: 'var(--tg-theme-text-color)'
                    }),
                    placeholder: (baseStyles, states) => ({
                        ...baseStyles,
                        color: 'var(--tg-theme-hint-color)',
                        fontSize: '1rem',
                        margin: 0,
                        fontFamily: "'Montserrat-regular', sans-serif"
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
            {isMenuOpen && <Overlay onClick={handleOverlayClick} />}
        </div>
    )
}