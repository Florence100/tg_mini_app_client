import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { add, remove, increment, decrement } from '../../../features/cart/cartSlice';
import { useLoaderData, useNavigate } from 'react-router-dom';
import products from '../../../data/products';
import useTelegram from '../../hooks/useTelegram';
import useCartStatus from 'common/hooks/useCartStatus';
import Button from '../button/Button';
import ProductCounter from '../productCounter/ProductCounter';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMinus, faPlus } from '@fortawesome/free-solid-svg-icons';
import './productCard.css';

const PUBLIC_URL = `https://${process.env.REACT_APP_PUBLIC_URL}`;

function loader({ params }) {
    const productId = params.productId;
    return productId;
}

function ProductCard() {
    const { tg } = useTelegram();
    const { isEmpty } = useCartStatus();
    const navigate = useNavigate();
    // const cart = useSelector(state => state.cart.entities);
    // const isEmpty = Object.keys(cart).length > 0 ? false : true;

    const onMainBtnClickHandler = () => {
        navigate('/checkout');
        tg.MainButton.offClick(onMainBtnClickHandler);
    }

    useEffect(() => {
        if (!isEmpty) {
            tg.MainButton
                .setParams({
                    color: '#31b545',
                    text: 'Перейти в корзину',
                    hasShineEffect: true
                })
                .show();
            tg.MainButton.onClick(onMainBtnClickHandler);
        } else {
            tg.MainButton.hide();
            tg.MainButton.offClick(onMainBtnClickHandler);
        }
        return () => {
            tg.MainButton.hide();
        };
    }, [isEmpty])

    useEffect(() => {
        tg.BackButton.show();
        tg.BackButton.onClick(() => {
            navigate(-1);
        })
        tg.MainButton.setText('Перейти в корзину');
    })

    const productId = useLoaderData();
    //заменить обращением к БД!
    const productArr = products.filter(function(product) {
        return product.id === Number(productId);
    })
    const product = productArr[0];

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

    const count = useSelector(state => state.cart.entities[productId]?.count) || 0;

    return (
        <div className='product-card'>
            <img className='img' src={`${PUBLIC_URL}/${product.img}`} alt='Фото товара'></img>
            <div className='name'>{product.name}</div>
            <div className='price'>{product.price} руб.</div>
            <div className='description'>{product.description}</div>
            <div className='info'>
                <div className='weight'>
                    <div>Вес:</div>
                    <div>{product.weight}</div>
                </div>
                <div className='proteins'>
                    <div>Белки:</div>
                    <div>{product.nutritional.proteins} г.</div>
                </div>
                <div className='fats'>
                    <div>Жиры:</div>
                    <div>{product.nutritional.fats} г.</div>
                </div>
                <div className='carbohydrates'>
                    <div>Углеводы:</div>
                    <div>{product.nutritional.carbohydrates} г.</div>
                </div>
                <div className='calorie'>
                    <div>Энергетическая ценность:</div>
                    <div>{product.nutritional.calorie} ккал.</div>
                </div>
            </div>
            {count === 0 
                ? <Button className='add-btn' onClick={onAddHandler}>Добавить</Button>
                : <div className='control-box'>
                    <div>Добавлено в корзину:</div>
                    <div className='count'>
                        <Button className='decr-btn' onClick={onDecrementHandler}>
                            <FontAwesomeIcon icon={faMinus} />
                        </Button>
                        <ProductCounter count={count} className={'card-counter'}/>
                        <Button className='incr-btn' onClick={onIncrementHandler}>
                            <FontAwesomeIcon icon={faPlus} />
                        </Button>
                    </div>
                </div>
            }
        </div>
    )
}

export { ProductCard, loader };