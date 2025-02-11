import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import useTelegram from 'hooks/useTelegram';
import { useIsCartEmpty } from 'hooks/useCartStatus';
import ProductCard from '../ProductCard/ProductCard';
import getProducts from './fetch/getProducts';
import './catalogPage.css';


export default function ProductCatalog() {
    const { tg } = useTelegram();
    const isCartEmpty = useIsCartEmpty();
    const navigate = useNavigate();
    const [products, setProducts] = useState([]);

    useEffect(() => {
        async function fetchData() {
            const productsData = await getProducts();
            setProducts(productsData);
            console.log('productsData: ', productsData);
        }
        fetchData();
    }, []);

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
                products?.map((item) => (
                    <ProductCard product={item} key={item.id} />
                ))
            }
        </div>
    )
}