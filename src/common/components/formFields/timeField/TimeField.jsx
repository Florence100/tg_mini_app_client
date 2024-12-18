import Select, { components } from 'react-select';
import { useSelector } from 'react-redux';


export default function TimeField(props) {
    const deliveryOption = useSelector(state => state.form.delivery);

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

    const CustomInput = (props) => (
        <components.Input 
            {...props} 
            inputMode='none' 
            readOnly 
            onChange={() => {}}
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
                onMenuOpen={props.handleSelectMenuOpen}
                isOptionDisabled={(option) => {
                    const currentDate = new Date();
                    const selectedDate = new Date(props.readyDate);
                    selectedDate.setHours(parseInt(option.value.split(':')[0]));
                    //готовность не ранее 1 часа от текущего времени
                    return currentDate.getTime() + 1 * 60 * 60 * 1000 > selectedDate.getTime();
                } }
                placeholder='Выберите время'
                components={{ Input: CustomInput }}
            />
        </div>
    )
}