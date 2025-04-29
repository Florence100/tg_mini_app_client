import { memo } from 'react';
import './cartItems.css';
import { SERVER_URL } from 'consts/consts';


const CartItems = memo(function CartItems({ cartProducts, isCartEmpty }) {
    console.log('cartProducts: ', cartProducts)
    return (
        <div className='cart-items'>
            {!isCartEmpty
                ? cartProducts.map(function(item) {
                    // const images = item?.images.map((image) => image.src);

                    return (
                        <div className='cart-item' key={item.id}>
                            <img 
                                className='product-img' 
                                src={`${SERVER_URL}${item.img}`} 
                                alt='Фото товара'
                                loading='lazy'
                            />
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
                : <div>В корзине нет товаров</div>
            }
        </div>
    )
})

export default CartItems;