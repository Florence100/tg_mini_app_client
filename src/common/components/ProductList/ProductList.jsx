import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import useTelegram from '../../hooks/useTelegram';
import useCartStatus from 'common/hooks/useCartStatus';
import ProductItem from '../ProductItem/ProductItem';
import products from '../../../data/products';
import './ProductList.css';


function ProductList() {
    const { tg } = useTelegram();
    const { isEmpty } = useCartStatus();
    const navigate = useNavigate();

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
        tg.BackButton.hide();
    })

    const onMainBtnClickHandler = () => {
        navigate('/cart');
        tg.MainButton.offClick(onMainBtnClickHandler);
    }

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

export { ProductList };