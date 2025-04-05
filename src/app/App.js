import { useEffect, createContext, useState } from 'react';
import { Outlet } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import useTelegram from 'hooks/useTelegram';
import getProducts from 'fetch/getProducts';
import authorization from 'fetch/authorization';
import getBasket from 'fetch/getBasket';
import handleApiResponse from 'helpers/handleApiResponse';
import { setCart } from 'app/store';
import './app.css';

const ProductsContext = createContext([]);

function App() {
    console.log('--- App ---');
    const { tg, initData } = useTelegram();
    const dispatch = useDispatch();
    const [products, setProducts] = useState([]);
    const [theme, setTheme] = useState(tg.colorScheme);

    useEffect(() => {
        tg.onEvent('themeChanged', () => {
            setTheme(tg.colorScheme);
        })
    }, [tg, tg.colorScheme])

    useEffect(() => {
        tg.onEvent('activated', () => {
            console.log('activated')
        })
    }, [tg])

    useEffect(() => {
        getProducts(initData)
            .then((data) => {
                console.log('getproducts', data)
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
                        console.log('App data', data)
                        if (data?.error) {
                            handleApiResponse(data, tg);
                            return;
                        }
                    })
                    .then(() => {
                        getBasket(initData)
                            .then((data) => {
                                if (data.error) {
                                    handleApiResponse(data, tg);
                                    return;
                                }
                                if (data.length > 0) {
                                    dispatch(setCart(data));
                                }
                            })
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
            <div className={`App ${theme}`}>
                { products.length > 0 && <Outlet /> }
            </div>
        </ProductsContext.Provider>
    );
}

export default App;
export { ProductsContext };

