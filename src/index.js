import React from 'react';
import ReactDOM from 'react-dom/client';
import {
    createBrowserRouter,
    RouterProvider,
} from 'react-router-dom';
import { Provider } from 'react-redux';
import App from './app/App';
import store from './app/store';
import  { ProductList } from './common/components/ProductList/ProductList';
import ErrorPage from './common/components/ErrorPage/ErrorPage';
import {
    ProductCard,
    loader as productCardLoader
} from './common/components/ProductCard/ProductCard';
import Cart from 'features/cart/Cart';
import './index.css';

const router = createBrowserRouter([
    {
        path: '/',
        element: <App />,
        errorElement: <ErrorPage />,
        children: [
            {
                index: true,
                element: <ProductList />,
            },
            {
                path: 'card/:productId',
                element: <ProductCard />,
                loader: productCardLoader,
            },
            {
                path: 'cart',
                element: <Cart />
            }
        ],
    },
]);


const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    <React.StrictMode>
        <Provider store={store}>
            <RouterProvider router={router} />
        </Provider>
    </React.StrictMode>
);
