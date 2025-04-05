import { useEffect, useState } from 'react';
import { useLoaderData, useNavigate } from 'react-router-dom';
import useTelegram from 'hooks/useTelegram';
import { useIsCartEmpty } from 'hooks/useIsCartEmpty';
import ProductControl from 'components/ProductControl/ProductControl';
import getOneProduct from './fetch/getOneProduct';
import handleApiResponse from 'helpers/handleApiResponse';
import { SERVER_URL } from 'consts/consts';
import './productPage.css';


function productPageLoader({ params }) {
    const productId = params.productId;
    return productId;
}

export default function ProductPage() {
    console.log('--- Product Page ---');
    const { tg, initData } = useTelegram();
    const isCartEmpty = useIsCartEmpty();
    const navigate = useNavigate();
    const productId = useLoaderData();
    const [product, setProduct] = useState();

    useEffect(() => {
        getOneProduct(productId, initData)
            .then((data) => {
                if (data.error) {
                    handleApiResponse(data, tg);
                    return;
                }
                if (data.length > 0) {
                    setProduct(...data);
                }
        })
    }, [initData, productId, tg]);

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
    }, [isCartEmpty, tg, navigate])

    useEffect(() => {
        tg.BackButton.show();
        tg.BackButton.onClick(() => {
            navigate('/');
        })
        return () => {
            tg.BackButton.hide();
        }
    }, [tg, navigate])

    return (
        <div className='product-page'>
            { product && 
                <div className='product-descr'>
                    <img className='img' src={`${SERVER_URL}${product.img}`} alt='Фото товара'></img>
                    <div className='name'>{product.name}</div>
                    <div className='price'><span>&#8381;</span>{product.price}</div>
                        <ProductControl
                            product={product}
                        />
                    <div className='description'>{product.description}</div>
                </div>
            }
        </div>
    )
}

export { productPageLoader };