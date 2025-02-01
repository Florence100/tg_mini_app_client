import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import useTelegram from 'hooks/useTelegram';
import { useIsCartEmpty } from 'hooks/useCartStatus';
import ProductCard from '../ProductCard/ProductCard';
// import ProductPreview from 'components/ProductPreview/ProductPreview';
// import ProductControl from 'components/ProductControl/ProductControl';
import products from 'data/products';
import './catalogPage.css';


export default function ProductCatalog() {
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
    }, [isCartEmpty, navigate, tg])

    useEffect(() => {
        tg.BackButton.hide();
    })

    return (
        <div className='catalog-page'>
            {
                products.map((item) => (
                    <ProductCard product={item} key={item.id} />
                ))
            }
        </div>
    )
}