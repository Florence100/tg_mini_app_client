import { useEffect, useState, Suspense } from 'react';
import { useLoaderData, useNavigate } from 'react-router-dom';
import useTelegram from 'hooks/useTelegram';
import { useIsCartEmpty } from 'hooks/useIsCartEmpty';
import ProductControl from 'components/ProductControl/ProductControl';
import getOneProduct from './fetch/getOneProduct';
import handleApiResponse from 'helpers/handleApiResponse';
import { SERVER_URL } from 'consts/consts';
import formatMoney from 'helpers/formatMoney';
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
    const images = product?.images.map((image) => image.src);

    useEffect(() => {
        getOneProduct(productId, initData)
            .then((data) => {
                if (data.error) {
                    handleApiResponse(data, tg);
                    return;
                } else {
                    setProduct(data);
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
        <Suspense fallback={<div>Загрузка...</div>}>
            <div className='product-page'>
                { product && 
                    <div className='product-descr'>
                        <img 
                            className='img' 
                            src={`${SERVER_URL}${images[0]}`} 
                            alt='Фото товара'
                            loading='lazy'
                        />
                        <div className='name'>{product.name}</div>
                        <div className='price'><span>&#8381;</span>{ formatMoney(product.price).toFixed(2) }</div>
                            <ProductControl
                                product={product}
                            />
                        <div className='description'>{product.description}</div>
                    </div>
                }
            </div>
        </Suspense>
    )
}

export { productPageLoader };