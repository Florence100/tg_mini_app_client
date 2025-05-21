import formatMoney from 'helpers/formatMoney';
import './cartDelivery.css';

export default function CartDelivery(props) {
    const deliveryCost = props.deliveryCost;

    return (
        <div className='cart-delivery'>
            <div>Доставка курьером</div>
            <div className='price'>
                <span>&#8381;</span>
                {deliveryCost ? `${formatMoney(deliveryCost).toFixed(2)}` : '0.00'}
            </div>
        </div>
    )
}