import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import useCartStatus from '../../common/hooks/useCartStatus';
import useDeliveryCost from '../../common/hooks/useDeliveryCost';
import products from '../../data/products';
import './cart.css';

function Cart() {
    const navigate = useNavigate();
    const deliveryOption = useSelector(state => state.form.delivery);
    const { isEmpty, productsList, totalAmount } = useCartStatus();
    const deliveryCost = useDeliveryCost();

    const onEditHandler = () => {
        navigate('/');
    }

    return (
        <div className='cart'>
            <div className='cart-header'>
                <div className='header-order'>Ваш заказ</div>
                <div className='header-edit' onClick={ onEditHandler }>Изменить</div>
            </div>
            <div className='order'>
                {!isEmpty
                    ? productsList.map(function(item) {
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
            {!isEmpty && deliveryOption === 'delivery' &&
                <div className='cart-delivery'>
                    <b>Доставка курьером</b>
                    <div>
                        {deliveryCost ? `${deliveryCost.toFixed(2)} руб.` : 'Бесплатно'}
                    </div>
                </div>
            }
            {!isEmpty && 
                <div className='summary'>
                    <div className='summary-text'>Итого</div>
                    <div className='summary-amount'> 
                        { deliveryOption === 'delivery'
                            ? `${(totalAmount + deliveryCost).toFixed(2)} руб.`
                            : `${totalAmount.toFixed(2)} руб.`
                        }
                    </div>
                </div>
            }
        </div>
    )
}

export default Cart;