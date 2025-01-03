import { useDispatch, useSelector } from 'react-redux';
import { deliveryChange } from '../../../../features/orderForm/formSlice';
import './deliveryField.css';


export default function DeliveryField () {
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