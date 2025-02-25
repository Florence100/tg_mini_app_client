import './order.css';
import { SERVER_URL } from 'consts/consts';


export default function Order(props) {
    const cartProducts = props.cartProducts;
    
    return (
        <div className='order'>
            {!props.isCartEmpty
                ? cartProducts.map(function(item) {
                    return (
                        <div className='order-item' key={item.id}>
                            <img className='product-img' src={`${SERVER_URL}${item.img}`} alt='Фото товара'></img>
                            <div className='container'>
                                <div className='name'>{item.name}</div>
                                <div className='count'> × {item.count}</div>
                            </div>
                            <div>
                                <div className='price'>{(item.price * item.count).toFixed(2)} руб.</div>
                            </div>
                        </div>
                    )
                })
                : <div className='order-item'>В корзине нет товаров</div>
            }
        </div>
    )
}