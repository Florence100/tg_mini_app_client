import { useEffect, useMemo } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { Cart } from 'modules/Cart/index';
import { OrderForm } from 'modules/OrderForm/index';
import { useIsCartEmpty } from 'hooks/useIsCartEmpty';
import useTelegram from 'hooks/useTelegram';
import getDeliveryCost from './helpers/getDeliveryCost';
import getCartAmount from './helpers/getCartAmount';
import './checkoutPage.css';


function CheckoutPage () {
    console.log('--- CheckoutPage ---');
    const { tg } = useTelegram();
    const navigate = useNavigate();
    const isCartEmpty = useIsCartEmpty();
    const cartEntities = useSelector(state => state.cart.entities);
    const cartProducts = useMemo(() => Object.values(cartEntities), [cartEntities]);
    const cartAmount = useMemo(() => getCartAmount(cartProducts), [cartProducts]);
    const deliveryCost = useMemo(() => getDeliveryCost(cartAmount), [cartAmount]);

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
                    deliveryCost={deliveryCost}
                    cartAmount={cartAmount}
                />
            }
        </div>
    )
}

export default CheckoutPage;