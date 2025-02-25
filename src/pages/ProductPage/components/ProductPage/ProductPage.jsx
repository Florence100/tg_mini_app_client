import { useEffect, useState } from 'react';
import { useLoaderData, useNavigate } from 'react-router-dom';
import useTelegram from 'hooks/useTelegram';
import { useIsCartEmpty } from 'hooks/useIsCartEmpty';
import useCompareCartData from 'hooks/useCompareCartData';
import ProductDescription from '../ProductDescription/ProductDescription';
import ProductControl from 'components/ProductControl/ProductControl';
import getOneProduct from './fetch/getOneProduct';
import './productPage.css';


function productPageLoader({ params }) {
    const productId = params.productId;
    return productId;
}

export default function ProductPage() {
    const { tg, initData } = useTelegram();
    const isCartEmpty = useIsCartEmpty();
    const navigate = useNavigate();
    const productId = useLoaderData();
    const [product, setProduct] = useState();
    useCompareCartData();

    useEffect(() => {
        getOneProduct(productId, initData)
            .then((data) => {
                if (data.message) {
                    tg.showPopup({
                        message: data.message,
                        buttons: [{
                            text: 'Хорошо, спасибо',
                        }]
                    })
                    return;
                }
                console.log('data: ', data)
                setProduct(...data);
        })
    }, [initData, productId, tg]);

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
            navigate('/');
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