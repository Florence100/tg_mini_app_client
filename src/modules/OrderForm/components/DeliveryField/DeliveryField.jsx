import { useDispatch, useSelector } from 'react-redux';
import { deliveryChange } from '../../store/formSlice';
import RadioInput from 'UI/RadioInput/RadioInput';
import Header from 'UI/Header/Header';

import './deliveryField.css';


export default function DeliveryField () {
    const dispatch = useDispatch();
    const deliveryOption = useSelector(state => state.form.delivery);

    return (
        <div className='delivery'>
            <Header text='Выберите:' />
            <RadioInput 
                label='Самовывоз'
                id='pickup'
                name='deliveryOption'
                value='pickup'
                checked={deliveryOption === 'pickup'}
                onChange={(e) => dispatch(deliveryChange(e.target.value))}
            />
            <RadioInput 
                label={<>Доставка курьером - <b>500 руб.</b>*</>}
                id='delivery'
                name='deliveryOption'
                value='delivery'
                checked={deliveryOption === 'delivery'}
                onChange={(e) => dispatch(deliveryChange(e.target.value))}
            />
            <span>
                * <span className='delivery-info'><b>Бесплатная </b>доставка при заказе от 5 000 руб.</span>
            </span>
        </div>
    )
}