import './cartDelivery.css';

export default function CartDelivery(props) {
    const deliveryCost = props.deliveryCost;

    return (
        <div className='cart-delivery'>
            <b>Доставка курьером</b>
            <div>
                {deliveryCost ? `${deliveryCost.toFixed(2)} руб.` : 'Бесплатно'}
            </div>
        </div>
    )
}