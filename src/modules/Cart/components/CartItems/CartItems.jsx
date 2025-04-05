import { memo } from 'react';
import './cartItems.css';
import { SERVER_URL } from 'consts/consts';


const CartItems = memo(function CartItems({ cartProducts, isCartEmpty }) {
    console.log('---CartItems---');
    return (
        <div className='cart-items'>
            {!isCartEmpty
                ? cartProducts.map(function(item) {
                    return (
                        <div className='cart-item' key={item.id}>
                            <img className='product-img' src={`${SERVER_URL}${item.img}`} alt='Фото товара'></img>
                            <div className='container'>
                                <div>
                                    <span className='name'>{item.name}</span>
                                    <span className='count'> × {item.count}</span>
                                </div>
                                <div className='price'><span>&#8381;</span>{(item.price * item.count).toFixed(2)}</div>
                            </div>
                        </div>
                    )
                })
                : <div className='cart-items'>В корзине нет товаров</div>
            }
        </div>
    )
})

export default CartItems;