import { useEffect, createContext, useState, useMemo } from 'react';
import { Outlet } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import useTelegram from 'hooks/useTelegram';
import getProducts from 'fetch/getProducts';
import handleApiResponse from 'helpers/handleApiResponse';
import './app.css';

const ProductsContext = createContext([]);
const IsAdminContext = createContext(false);

function App({ isAdmin }) {
    const { tg, initData } = useTelegram();
    const dispatch = useDispatch();
    const [products, setProducts] = useState([]);
    const cartEntities = useSelector(state => state.cart.entities);
    const cartItems = useMemo(() => Object.values(cartEntities), [cartEntities]);

    useEffect(() => {
        tg.onEvent('themeChanged', () => {
            tg.setHeaderColor(tg.themeParams.bg_color);
        })
        tg.ready();
        tg.BackButton.hide();
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
    }, [dispatch, initData, tg]);

    return (
        <ProductsContext.Provider value={products}>
            <IsAdminContext.Provider value={isAdmin}>
                <div className={'App'}>
                    { products.length > 0 && <Outlet /> }
                </div>
            </IsAdminContext.Provider>
        </ProductsContext.Provider>
    );
}

export default App;
export { ProductsContext, IsAdminContext };

