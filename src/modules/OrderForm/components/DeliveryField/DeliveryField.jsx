import { useDispatch, useSelector } from 'react-redux';
import { deliveryChange } from '../../store/formSlice';
import RadioInput from 'UI/RadioInput/RadioInput';
import Header from 'UI/Header/Header';
import useTelegram from 'hooks/useTelegram';
import './deliveryField.css';


export default function DeliveryField () {
    const { tg } = useTelegram();
    const dispatch = useDispatch();
    const deliveryOption = useSelector(state => state.form.delivery);

    const handleDeliveryChange = (e) => {
        dispatch(deliveryChange(e.target.value));
        tg?.HapticFeedback.selectionChanged();
    }

    return (
        <div className='delivery'>
            <Header text='Выберите:' />
            <RadioInput 
                label='Самовывоз'
                id='pickup'
                name='deliveryOption'
                value='pickup'
                checked={deliveryOption === 'pickup'}
                onChange={handleDeliveryChange}
                // onChange={(e) => dispatch(deliveryChange(e.target.value))}
            />
            <RadioInput 
                label={<>Доставка *</>}
                id='delivery'
                name='deliveryOption'
                value='delivery'
                checked={deliveryOption === 'delivery'}
                onChange={handleDeliveryChange}
                // onChange={(e) => dispatch(deliveryChange(e.target.value))}
            />
            <div className='delivery-info'>* Стоимость доставки <span>&#8381;</span>500. При заказе от <span className='currency'>&#8381;</span>5.000 доставка бесплатна.</div>
        </div>
    )
}