import { useSelector, useDispatch } from 'react-redux';
import { useEffect } from 'react';
import useTelegram from '../../hooks/useTelegram';
import ProductItem from '../ProductItem/ProductItem';
import products from '../../../data/data';
import './ProductList.css';

function ProductList() {
    const { tg } = useTelegram();
    const cart = useSelector(state => state.cart.entities);
    const isEmpty = Object.keys(cart).length > 0 ? false : true;

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

    return (
        <div className='list'>
            {
                products.map((item) => (
                    <ProductItem key={item.id}
                        product={item}
                        className={'item'}
                    />
                ))
            }
        </div>
    )
}

export default ProductList;