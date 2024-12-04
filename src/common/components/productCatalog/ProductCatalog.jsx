import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import useTelegram from '../../hooks/useTelegram';
import useCartStatus from 'common/hooks/useCartStatus';
import ProductPreview from '../productPreview/ProductPreview';
import products from '../../../data/products';
import './productCatalog.css';


export default function ProductCatalog() {
    const { tg } = useTelegram();
    const { isCartEmpty } = useCartStatus();
    const navigate = useNavigate();

    useEffect(() => {
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
        };
    }, [isCartEmpty])

    useEffect(() => {
        tg.BackButton.hide();
    })

    const handleMainBtnClick = () => {
        navigate('/checkout');
        tg.MainButton.offClick(handleMainBtnClick);
    }

    return (
        <div className='product-catalog'>
            {
                products.map((item) => (
                    <ProductPreview key={item.id}
                        product={item}
                        className={'item'}
                    />
                ))
            }
        </div>
    )
}