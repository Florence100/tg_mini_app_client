import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Cart } from 'modules/Cart/index';
import { OrderForm } from 'modules/OrderForm/index';
import useTelegram from 'hooks/useTelegram';
import { useIsCartEmpty } from 'hooks/useCartStatus';
import './checkoutPage.css';


function CheckoutPage () {
    const { tg } = useTelegram();
    const isCartEmpty = useIsCartEmpty();
    const navigate = useNavigate();

    useEffect(() => {
        function handleBackBtnClick () {
            navigate(-1);
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
            <Cart />
            {!isCartEmpty && <OrderForm />}
        </div>
    )
}

export default CheckoutPage;