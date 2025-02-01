import { useEffect } from 'react';
import { useLoaderData, useNavigate } from 'react-router-dom';
import products from 'data/products';
import useTelegram from 'hooks/useTelegram';
import { useIsCartEmpty } from 'hooks/useCartStatus';
import ProductDescription from '../ProductDescription/ProductDescription';
import ProductControl from 'components/ProductControl/ProductControl';
import './productPage.css';


function productPageLoader({ params }) {
    const productId = params.productId;
    return productId;
}

export default function ProductPage() {
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
    //feat: заменить обращением к БД!
    const productArr = products.filter(function(product) {
        return product.id === Number(productId);
    })
    const product = productArr[0];


    return (
        <div className='product-page'>
            <ProductDescription product={product} />
            <ProductControl
                product={product}
                label={'Добавлено в корзину:'}
            />
        </div>
    )
}

export { productPageLoader };