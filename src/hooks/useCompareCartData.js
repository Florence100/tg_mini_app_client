import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import useTelegram from 'hooks/useTelegram';
import { setCart } from 'app/store';
import getBasket from 'modules/Cart/fetch/getBasket';


function useCompareCartData() {
    const dispatch = useDispatch();
    const { tg, initData } = useTelegram();

    useEffect(() => {
        getBasket(initData).then((data) => {
            if (data.message) {
                tg.showPopup({
                    message: data.message,
                    buttons: [{
                        text: 'Хорошо, спасибо',
                    }]
                })
                return;
            }
            if (data.length > 0) {
                dispatch(setCart(data))
            }
            console.log('Compare Cart Data');
        })
    }, [dispatch, initData, tg])
}

export default useCompareCartData;