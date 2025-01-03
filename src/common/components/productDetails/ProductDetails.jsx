import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { add, remove, increment, decrement } from '../../../features/cart/cartSlice';
import { useLoaderData, useNavigate } from 'react-router-dom';
import products from '../../../data/products';
import useTelegram from '../../hooks/useTelegram';
import { useIsCartEmpty } from '../../hooks/useCartStatus';
import Button from '../button/Button';
import ProductCounter from '../productCounter/ProductCounter';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMinus, faPlus } from '@fortawesome/free-solid-svg-icons';
import './productDetails.css';

const PUBLIC_URL = `https://${process.env.REACT_APP_PUBLIC_URL}`;

function productDetailLoader({ params }) {
    const productId = params.productId;
    return productId;
}

export default function ProductDetails() {
    const { tg } = useTelegram();
    const isCartEmpty = useIsCartEmpty();
    const navigate = useNavigate();

    useEffect(() => {
        const handleMainBtnClick = () => {
            navigate('/checkout');
        }

        if (!isCartEmpty) {
            tg.MainButton
                .setParams({
                    color: '#31b545',
                    text: 'Перейти в корзину',
                    hasShineEffect: true
                })
                .show();
            tg.MainButton.onClick(handleMainBtnClick);
        } else {
            tg.MainButton.hide();
            tg.MainButton.offClick(handleMainBtnClick);
        }
        return () => {
            tg.MainButton.hide();
            tg.MainButton.offClick(handleMainBtnClick);
        };
    }, [isCartEmpty, tg, navigate])

    useEffect(() => {
        tg.BackButton.show();
        tg.BackButton.onClick(() => {
            navigate(-1);
        })
        tg.MainButton.setText('Перейти в корзину');
    }, [tg, navigate])

    const productId = useLoaderData();
    //заменить обращением к БД!
    const productArr = products.filter(function(product) {
        return product.id === Number(productId);
    })
    const product = productArr[0];

    const dispatch = useDispatch();

    const handleAddClick = () => {
        dispatch(add(product));
    }

    const handleIncrClick = () => {
        dispatch(increment(product));
    }

    const handleDecrClick = () => {
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
                ? <Button className='add-btn' onClick={handleAddClick}>Добавить</Button>
                : <div className='control-box'>
                    <div>Добавлено в корзину:</div>
                    <div className='count'>
                        <Button className='decr-btn' onClick={handleDecrClick}>
                            <FontAwesomeIcon icon={faMinus} />
                        </Button>
                        <ProductCounter count={count} className={'card-counter'}/>
                        <Button className='incr-btn' onClick={handleIncrClick}>
                            <FontAwesomeIcon icon={faPlus} />
                        </Button>
                    </div>
                </div>
            }
        </div>
    )
}

export { productDetailLoader };