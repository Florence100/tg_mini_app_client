import { useDispatch, useSelector } from 'react-redux';
import { add, increment, decrement, remove } from 'app/store';
import Button from 'UI/Button/Button';
import Counter from 'UI/Counter/Counter';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMinus, faPlus } from '@fortawesome/free-solid-svg-icons';
import addProduct from './fetch/addProduct';
import removeProduct from './fetch/removeProduct';
import incrProduct from './fetch/incrProduct';
import decrProduct from './fetch/decrProduct';
import useTelegram from 'hooks/useTelegram';
import './productControl.css';


export default function ProductControl(props) {
    const product = props.product;
    const productId = product.id;
    const productCount = useSelector(state => state.cart.entities[productId]?.count) || 0;
    const { initData } = useTelegram();

    const label = props.label;

    const dispatch = useDispatch();

    const handleAddClick = () => {
        dispatch(add(product));
        addProduct(initData, productId);
    }

    const handleIncrClick = () => {
        dispatch(increment(product));
        incrProduct(initData, productId);
    }

    const handleDecrClick = () => {
        if (productCount > 1) {
            dispatch(decrement(product));
            decrProduct(initData, productId);
        } else {
            dispatch(remove(product));
            removeProduct(initData, productId);
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