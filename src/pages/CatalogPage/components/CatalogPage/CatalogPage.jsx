import { useEffect, useContext, useMemo, Suspense } from 'react';
import { useNavigate } from 'react-router-dom';
import useTelegram from 'hooks/useTelegram';
import { useIsCartEmpty } from 'hooks/useIsCartEmpty';
import ProductCard from '../ProductCard/ProductCard';
import { ProductsContext, IsAdminContext } from 'app/App';
import Button from 'UI/Button/Button';
import './catalogPage.css';

export default function CatalogPage() {
    const { tg } = useTelegram();
    const isCartEmpty = useIsCartEmpty();
    const navigate = useNavigate();
    const products = useContext(ProductsContext);
    const isAdmin = useContext(IsAdminContext);

    useEffect(() => {
        const handleMainBtnClick = () => {
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
        <Suspense fallback={<div>Загрузка...</div>}>
            <div className='catalog-page'>
                {productsCards}
            </div>
            { isAdmin && (
                <div className='admin-login'>
                    <Button 
                        className='admin-btn' 
                        onClick={() => {
                            window.location.href = '/admin' 
                        }}>
                        Войти в админ-панель
                    </Button>
                </div>
            )}
        </Suspense>
    )
}