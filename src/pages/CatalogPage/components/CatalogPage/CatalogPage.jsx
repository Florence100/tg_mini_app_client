import { useEffect, useContext, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import useTelegram from 'hooks/useTelegram';
import { useIsCartEmpty } from 'hooks/useIsCartEmpty';
import ProductCard from '../ProductCard/ProductCard';
import { ProductsContext } from 'app/App';
import './catalogPage.css';

export default function CatalogPage() {
    const { tg } = useTelegram();
    const isCartEmpty = useIsCartEmpty();
    const navigate = useNavigate();
    const products = useContext(ProductsContext);

    useEffect(() => {
        const handleMainBtnClick = () => {
            // tg?.HapticFeedback.impactOccurred('medium');
            navigate('/checkout');
        }

        if (!isCartEmpty) {
            tg.MainButton
                .setParams({
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

    const productsCards = useMemo(() => {
        return products.map((item) => <ProductCard product={item} key={item.id} />);
    }, [products])

    return (
        <div className='catalog-page'>
            {productsCards}
        </div>
    )
}