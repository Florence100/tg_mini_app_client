import { useEffect, createContext, useState } from 'react';
import { Outlet } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import useTelegram from 'hooks/useTelegram';
import getProducts from 'fetch/getProducts';
import authorization from 'fetch/authorization';
import handleApiResponse from 'helpers/handleApiResponse';
import './app.css';

const ProductsContext = createContext([]);

function App() {
    const { tg, initData } = useTelegram();
    const dispatch = useDispatch();
    const [products, setProducts] = useState([]);
    const cartItems = useSelector(state => Object.values(state.cart.entities));

    // useEffect(() => {
    //     tg?.checkHomeScreenStatus((status) => {
    //         console.log('status', status)
    //         console.log('addToHomeScreen доступен:', typeof tg.addToHomeScreen === 'function');
    //         if (status === 'unsupported' || status === 'added') {
    //             return;
    //         } 
    //         if (status === 'missed' || status === 'unknown') {
    //             tg.addToHomeScreen();
    //             console.log('addToHomeScreen выполнен');
    //         }
    //     })
    // }, [tg])

    useEffect(() => {
        tg.onEvent('themeChanged', () => {
            tg.setHeaderColor(tg.themeParams.bg_color);
        })
    }, [tg])

    useEffect(() => {
        tg.isClosingConfirmationEnabled = cartItems.length > 0 ? true : false;
    }, [cartItems, tg])

    useEffect(() => {
        getProducts(initData)
            .then((data) => {
                if (data.error) {
                    handleApiResponse(data, tg);
                    return;
                }
                if (data.length > 0) {
                    setProducts(data);
                }
            })
            .then(() => {
                authorization(initData)
                    .then((data) => {
                        if (data?.error) {
                            handleApiResponse(data, tg);
                            return;
                        }
                    })
            })
    }, [dispatch, initData, tg]);

    useEffect(() => {
        tg.ready();
    }, [tg]);

    useEffect(() => {
        tg.BackButton.hide();
    }, [tg]);

    return (
        <ProductsContext.Provider value={products}>
            <div className={`App`}>
                { products.length > 0 && <Outlet /> }
            </div>
        </ProductsContext.Provider>
    );
}

export default App;
export { ProductsContext };

