import { useDispatch, useSelector } from 'react-redux';
import { add, increment, decrement, remove } from 'app/store';
import Button from 'UI/Button/Button';
import Counter from 'UI/Counter/Counter';
import useTelegram from 'hooks/useTelegram';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMinus, faPlus } from '@fortawesome/free-solid-svg-icons';

import './productControl.css';


export default function ProductControl(props) {
    const { tg } = useTelegram();
    const product = props.product;
    console.log('product: ', product)
    const productId = product.id;
    const productCount = useSelector(state => state.cart.entities[productId]?.count) || 0;

    const dispatch = useDispatch();

    const handleAddClick = () => {
        dispatch(add(product));
        tg?.HapticFeedback.selectionChanged();
    }

    const handleIncrClick = () => {
        dispatch(increment(product));
        tg?.HapticFeedback.selectionChanged();
    }

    const handleDecrClick = () => {
        if (productCount > 1) {
            dispatch(decrement(product));
            tg?.HapticFeedback.selectionChanged();
        } else {
            dispatch(remove(product));
            tg?.HapticFeedback.selectionChanged();
        }
    }

    return (
        <div className={'product-control '}>
            { productCount === 0 
                ? <Button className='add-btn' onClick={handleAddClick}>Добавить</Button>
                : <div>
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