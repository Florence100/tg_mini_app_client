import Header from 'UI/Header/Header';
import { useSelector } from 'react-redux';
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
                    ? `${(cartAmount + deliveryCost).toFixed(2)}`
                    : `${cartAmount.toFixed(2)}`
                }
            </div>
        </div>
    )
}