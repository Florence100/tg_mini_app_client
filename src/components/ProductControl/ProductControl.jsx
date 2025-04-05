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
import handleApiResponse from 'helpers/handleApiResponse';
import './productControl.css';


export default function ProductControl(props) {
    console.log('---ProductControl---')
    const product = props.product;
    const productId = product.id;
    const productCount = useSelector(state => state.cart.entities[productId]?.count) || 0;
    const { tg, initData } = useTelegram();

    const dispatch = useDispatch();

    const handleAddClick = () => {
        dispatch(add(product));
        addProduct(initData, productId)
            .then((data) => {
                if (data.error) {
                    handleApiResponse(data, tg);
                    return;
                }
            })
    }

    const handleIncrClick = () => {
        dispatch(increment(product));
        incrProduct(initData, productId)
            .then((data) => {
                if (data.error) {
                    handleApiResponse(data, tg);
                    return;
                }
            })
    }

    const handleDecrClick = () => {
        if (productCount > 1) {
            dispatch(decrement(product));
            decrProduct(initData, productId)
                .then((data) => {
                    if (data.error) {
                        handleApiResponse(data, tg);
                        return;
                    }
                })
        } else {
            dispatch(remove(product));
            removeProduct(initData, productId)
                .then((data) => {
                    if (data.error) {
                        handleApiResponse(data, tg);
                        return;
                    }
                })
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