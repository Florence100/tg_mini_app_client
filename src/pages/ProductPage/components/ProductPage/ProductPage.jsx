import { useEffect, useState } from 'react';
import { useLoaderData, useNavigate } from 'react-router-dom';
import useTelegram from 'hooks/useTelegram';
import { useIsCartEmpty } from 'hooks/useCartStatus';
import ProductDescription from '../ProductDescription/ProductDescription';
import ProductControl from 'components/ProductControl/ProductControl';
import getOneProduct from './fetch/getOneProduct';
import './productPage.css';


function productPageLoader({ params }) {
    const productId = params.productId;
    return productId;
}

export default function ProductPage() {
    const { tg } = useTelegram();
    const isCartEmpty = useIsCartEmpty();
    const navigate = useNavigate();
    const productId = useLoaderData();
    const [product, setProduct] = useState();

    useEffect(() => {
        async function fetchData() {
            const [productData] = await getOneProduct(productId);
            setProduct(productData);
        }
        fetchData();
    }, [productId]);

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

    return (
        <div className='product-page'>
            { product && 
                <ProductDescription product={product} />
            }
            { product && 
                <ProductControl
                    product={product}
                    label={'Добавлено в корзину:'}
                />
            }
        </div>
    )
}

export { productPageLoader };