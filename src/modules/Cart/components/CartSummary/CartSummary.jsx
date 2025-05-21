import Header from 'UI/Header/Header';
import { useSelector } from 'react-redux';
import formatMoney from 'helpers/formatMoney';
import './cartSummary.css';


export default function CartSummary(props) {
    const deliveryOption = useSelector(state => state.form.delivery);
    const deliveryCost = props.deliveryCost;
    const cartAmount = props.cartAmount;

    return (
        <div className='summary'>
            <Header text='Итого' />
            <div className='summary-amount'> 
                <span>&#8381;</span>
                { deliveryOption === 'delivery'
                    ? `${formatMoney(cartAmount + deliveryCost).toFixed(2)}`
                    : `${formatMoney(cartAmount).toFixed(2)}`
                }
            </div>
        </div>
    )
}