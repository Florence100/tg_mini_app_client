import './ProductList.css';
import ProductItem from '../ProductItem/ProductItem';
import { useSelector, useDispatch } from 'react-redux';
import { add, remove, increment, decrement } from '../../features/cart/cartSlice';
import { useEffect } from 'react';
import useTelegram from '../../hooks/useTelegram';
import products from '../../data/data';

function ProductList() {
    const { tg } = useTelegram();
    const cart = useSelector(state => state.cart.entities);
    const isEmpty = Object.keys(cart).length > 0 ? false : true;
    console.log(isEmpty)

    useEffect(() => {
        if (!isEmpty) {
            tg.MainButton.show();
            tg.MainButton.setParams({
                text: 'Оформить заказ',
                color: '#31b545',
                hasShineEffect: true
            })
        } else {
            tg.MainButton.hide();
        }
    }, [cart])

    const dispatch = useDispatch();

    function onAdd(product) {
        dispatch(add(product));
    }

    function onIncrement(product) {
        dispatch(increment(product));
    }

    function onDecrement(product) {
        dispatch(decrement(product));
    }

    function onRemove(product) {
        dispatch(remove(product));
    }

    return (
        <div className="list">
            {
                products.map((item) => (
                    <ProductItem key={item.id}
                        product={item}
                        onAdd={onAdd}
                        onRemove={onRemove}
                        onIncrement={onIncrement}
                        onDecrement={onDecrement}
                        className={'item'}
                    />
                ))
            }
        </div>
    )
}

export default ProductList;