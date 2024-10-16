import './ProductItem.css';
import Button from '../Button/Button';
import { useSelector } from 'react-redux';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMinus, faPlus } from '@fortawesome/free-solid-svg-icons'

function ProductItem({ product, className, onAdd, onRemove, onIncrement, onDecrement }) {
    const productId = product.id;
    const count = useSelector(state => state.cart.entities[productId]?.count) || 0;

    const onAddHandler = () => {
        onAdd(product);
    }

    const onIncrementHandler = () => {
        onIncrement(product);
    }

    const onDecrementHandler = () => {
        if (count > 1) {
            onDecrement(product);
        } else {
            onRemove(product);
        }
    }

    return (
        <div className={"product " + className}>
            <div>
                <img className="product-img" src={product.img} alt="product photo"></img>
                <div className="name">{product.name}</div>
                <div className="price">{product.price} руб.</div>
                {count > 0 && <div className="count">{ count }</div>}
            </div>

            {count === 0 
                ? <Button className="add-btn" onClick={onAddHandler}>Добавить</Button>
                : <div className="btns-box">
                    <Button className="decr-btn" onClick={onDecrementHandler}>
                        <FontAwesomeIcon icon={faMinus} />
                    </Button>
                    <Button className="incr-btn" onClick={onIncrementHandler}>
                    <FontAwesomeIcon icon={faPlus} />
                    </Button>
                </div>
            }
        </div>
    )
}

export default ProductItem;