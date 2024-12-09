import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import products from '../../data/products';
import './cart.css';


function CartHeader() {
    const navigate = useNavigate();

    const handleEditClick = () => {
        navigate('/');
    }

    return (
        <div className='cart-header'>
            <div className='header-order'>Ваш заказ</div>
            <div className='header-edit' onClick={handleEditClick}>Изменить</div>
        </div>
    )
}


function Order(props) {
    return (
        <div className='order'>
            {!props.isCartEmpty
                ? props.cartItems.map(function(item) {
                    //заменить обращением к БД!
                    const product = products.filter(function(product) {
                        return product.id === Number(item.id);
                    })[0]
                    //------------------------//
                    
                    return (
                        <div className='order-item' key={item.id}>
                            <img className='product-img' src={product.img} alt='Фото товара'></img>
                            <div className='container'>
                                <div className='name'>{product.name}</div>
                                <div className='count'> × {item.count}</div>
                            </div>
                            <div>
                                <div className='price'>{(product.price * item.count).toFixed(2)} руб.</div>
                            </div>
                        </div>
                    )
                })
                : <div className='order-item'>В корзине нет товаров</div>
            }
        </div>
    )
}


function CartDelivery(props) {
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


function CartSummary(props) {
    const deliveryOption = useSelector(state => state.form.delivery);
    const deliveryCost = props.deliveryCost;

    return (
        <div className='summary'>
            <div className='summary-text'>Итого</div>
            <div className='summary-amount'> 
                { deliveryOption === 'delivery'
                    ? `${(props.cartAmount + deliveryCost).toFixed(2)} руб.`
                    : `${props.cartAmount.toFixed(2)} руб.`
                }
            </div>
        </div>
    )
}


export default function Cart(props) {
    const deliveryOption = useSelector(state => state.form.delivery);
    const isCartEmpty = props.isCartEmpty;
    const cartAmount = props.cartAmount;
    const cartItems = props.cartItems;
    const deliveryCost = props.deliveryCost;

    return (
        <div className='cart'>
            <CartHeader />
            <Order
                isCartEmpty={isCartEmpty}
                cartItems={cartItems}
            />
            {!isCartEmpty && deliveryOption === 'delivery' &&
                <CartDelivery 
                    deliveryCost={deliveryCost}
                />
            }
            {!isCartEmpty && 
                <CartSummary
                    cartAmount={cartAmount}
                    deliveryCost={deliveryCost}
                />
            }
        </div>
    )
}