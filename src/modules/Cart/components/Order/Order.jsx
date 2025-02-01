import products from 'data/products';
import './order.css';


export default function Order(props) {
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