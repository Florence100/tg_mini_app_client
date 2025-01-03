import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import useTelegram from '../../hooks/useTelegram';
import { useIsCartEmpty } from '../../hooks/useCartStatus';
import ProductPreview from '../productPreview/ProductPreview';
import products from '../../../data/products';
import './productCatalog.css';


export default function ProductCatalog() {
    const { tg } = useTelegram();
    const isCartEmpty = useIsCartEmpty();
    const navigate = useNavigate();

    useEffect(() => {
        const handleMainBtnClick = () => {
            console.log('handleMainBtnClick');
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
    }, [isCartEmpty, navigate, tg])

    useEffect(() => {
        tg.BackButton.hide();
    })

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