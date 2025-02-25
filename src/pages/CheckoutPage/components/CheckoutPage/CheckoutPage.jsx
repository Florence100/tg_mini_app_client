import { useEffect, useMemo, useState } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { Cart } from 'modules/Cart/index';
import { OrderForm } from 'modules/OrderForm/index';
import useTelegram from 'hooks/useTelegram';
import { useIsCartEmpty } from 'hooks/useIsCartEmpty';
import useDeliveryCost from 'hooks/useDeliveryCost';
import getBasket from 'modules/Cart/fetch/getBasket';
import './checkoutPage.css';


function CheckoutPage () {
    const { tg, initData } = useTelegram();
    const isCartEmpty = useIsCartEmpty();
    const cartEntities = useSelector(state => state.cart.entities);
    const navigate = useNavigate();
    const [cartProducts, setCartProducts] = useState([]);

    const cartAmount = useMemo(() => {
        const cartAmount = cartProducts.reduce((sum, current) => {
            const count = current.count;
            const price = current.price;
            return sum + (count * price);
        }, 0);
    
        return +cartAmount.toFixed(2);
    }, [cartProducts])

    useEffect(() => {
        getBasket(initData).then((data) => {
            if (!data.error && !data.message) {
                console.log('data cart', data)
                data.length > 0 
                    ? setCartProducts(data) 
                    : setCartProducts([]);
            } else {
                tg.showPopup({
                    message: data.message,
                    buttons: [{
                        text: 'Хорошо, спасибо',
                    }]
                })
            }
        })
    }, [cartEntities, initData, tg]);

    const deliveryCost = useDeliveryCost(cartAmount);

    useEffect(() => {
        function handleBackBtnClick () {
            navigate('/');
        }

        tg.BackButton.show();
        tg.BackButton.onClick(handleBackBtnClick);

        return () => {
            tg.BackButton.hide();
            tg.BackButton.offClick(handleBackBtnClick);
        }
    }, [tg, navigate]);


    return (
        <div className='checkout'>
            <Cart 
                cartProducts={cartProducts}
                deliveryCost={deliveryCost}
                cartAmount={cartAmount}
            />
            {!isCartEmpty && 
                <OrderForm 
                    cartProducts={cartProducts}
                    deliveryCost={deliveryCost}
                    cartAmount={cartAmount}
                />}
        </div>
    )
}

export default CheckoutPage;