import { useDispatch, useSelector } from 'react-redux';
import { add, increment, decrement, remove } from 'modules/Cart/index';
import Button from 'UI/Button/Button';
import Counter from 'UI/Counter/Counter';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMinus, faPlus } from '@fortawesome/free-solid-svg-icons';
import './productControl.css';


export default function ProductControl(props) {
    const product = props.product;
    const productId = product.id;
    const productCount = useSelector(state => state.cart.entities[productId]?.count) || 0;

    const label = props.label;

    const dispatch = useDispatch();

    const handleAddClick = () => {
        dispatch(add(product));
    }

    const handleIncrClick = () => {
        dispatch(increment(product));
    }

    const handleDecrClick = () => {
        if (productCount > 1) {
            dispatch(decrement(product));
        } else {
            dispatch(remove(product));
        }
    }

    return (
        <div className={'product-control ' + props.className}>
            { productCount === 0 
                ? <Button className='add-btn' onClick={handleAddClick}>Добавить</Button>
                : <div>
                    { label && <div>{label}</div>}
                    <div className='btns-box'>
                        <Button className='decr-btn' onClick={handleDecrClick}>
                            <FontAwesomeIcon icon={faMinus} />
                        </Button>
                        <Counter count={productCount} className={'product-counter'} />
                        <Button className='incr-btn' onClick={handleIncrClick}>
                            <FontAwesomeIcon icon={faPlus} />
                        </Button>
                    </div>
                  </div>
            }
        </div>
    )
}