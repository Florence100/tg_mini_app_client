import './ProductItem.css';
import Button from '../Button/Button';
import { useSelector, useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import { add, remove, increment, decrement } from '../../../features/cart/cartSlice';
import ProductCounter from '../ProductCounter/ProductCounter';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMinus, faPlus } from '@fortawesome/free-solid-svg-icons';


function ProductItem({ product, className }) {
    const productId = product.id;
    const count = useSelector(state => state.cart.entities[productId]?.count) || 0;

    const dispatch = useDispatch();

    const onAddHandler = () => {
        dispatch(add(product));
    }

    const onIncrementHandler = () => {
        dispatch(increment(product));
    }

    const onDecrementHandler = () => {
        if (count > 1) {
            dispatch(decrement(product));
        } else {
            dispatch(remove(product));
        }
    }

    return (
        <div className={'product ' + className}>
            <div>
                <Link to={`/card/${product.id}`}>
                    <img className='product-img' src={product.img} alt='Фото товара'></img>
                </Link>
                <div className='name'>{product.name}</div>
                <div className='price'>{product.price} руб.</div>
                {count > 0 && <ProductCounter count={count} className={'item-counter'}/>}
                {/* {count > 0 && <div className='count'>{ count }</div>} */}
            </div>

            {count === 0 
                ? <Button className='add-btn' onClick={onAddHandler}>Добавить</Button>
                : <div className='btns-box'>
                    <Button className='decr-btn' onClick={onDecrementHandler}>
                        <FontAwesomeIcon icon={faMinus} />
                    </Button>
                    <Button className='incr-btn' onClick={onIncrementHandler}>
                        <FontAwesomeIcon icon={faPlus} />
                    </Button>
                </div>
            }
        </div>
    )
}

export default ProductItem;