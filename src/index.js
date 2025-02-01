import React from 'react';
import ReactDOM from 'react-dom/client';
import {
    createBrowserRouter,
    RouterProvider,
} from 'react-router-dom';
import { Provider } from 'react-redux';
import App from 'app/App';
import store from 'app/store';
import CatalogPage from 'pages/CatalogPage/components/CatalogPage/CatalogPage';
import ProductPage, { productPageLoader } from 'pages/ProductPage/components/ProductPage/ProductPage';
import ErrorPage from 'pages/ErrorPage/components/ErrorPage/ErrorPage';
import CheckoutPage from 'pages/CheckoutPage/components/CheckoutPage/CheckoutPage';
import './index.css';

const router = createBrowserRouter([
    {
        path: '/',
        element: <App />,
        errorElement: <ErrorPage />,
        children: [
            {
                index: true,
                element: <CatalogPage />,
            },
            {
                path: 'card/:productId',
                element: <ProductPage />,
                loader: productPageLoader,
            },
            {
                path: 'checkout',
                element: <CheckoutPage />
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
