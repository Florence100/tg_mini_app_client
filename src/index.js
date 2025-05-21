import React, { useEffect, useState, Suspense, lazy } from 'react';
import ReactDOM from 'react-dom/client';
import {
    createBrowserRouter,
    RouterProvider,
} from 'react-router-dom';
import { Provider } from 'react-redux';
import App from 'app/App';
import { store } from 'app/store';
import { productPageLoader } from 'pages/ProductPage/components/ProductPage/ProductPage';
import ErrorPage from 'pages/ErrorPage/components/ErrorPage/ErrorPage';
import useTelegram from 'hooks/useTelegram';
import authorization from 'fetch/authorization';
import './index.css';


const LazyAdminPanel = lazy(() => import('pages/AdminPanel/components/AdminPanel/AdminPanel'));
const LasyProductPage = lazy(() => import('pages/ProductPage/components/ProductPage/ProductPage'));
const LasyCatalogPage = lazy(() => import('pages/CatalogPage/components/CatalogPage/CatalogPage'));
const LasyCheckoutPage = lazy(() => import('pages/CheckoutPage/components/CheckoutPage/CheckoutPage'));

function AdminPanelWrapper() {
    return (
        <Suspense fallback={<div>Загрузка админ-панели...</div>}>
            <LazyAdminPanel />
        </Suspense>
    )
}

function RouterWrapper({ isAdmin }) {
    const router = createBrowserRouter([
        {
            path: '/',
            element: <App isAdmin={isAdmin} />,
            errorElement: <ErrorPage />,
            children: [
                {
                    index: true,
                    element: <LasyCatalogPage />
                },
                {
                    path: 'card/:productId',
                    element: <LasyProductPage />,
                    loader: productPageLoader
                },
                {
                    path: 'checkout',
                    element: <LasyCheckoutPage />
                },
                ...(isAdmin ? [{
                    path: 'admin',
                    element: <AdminPanelWrapper />
                }] : [])
            ]
        }
    ], {
        future: {
            v7_fetcherPersist: true,
            v7_normalizeFormMethod: true,
            v7_partialHydration: true,
            v7_skipActionErrorRevalidation: true
        }
    });

    return (
        <RouterProvider 
            router={router} 
            future={{
                v7_startTransition: true,
                v7_relativeSplatPath: true
            }}
        />
    );
}

function Root() {
    const { initData } = useTelegram();
    const [isAdmin, setIsAdmin] = useState(null);

    useEffect(() => {
        authorization(initData).then((data) => {
            setIsAdmin(data?.roles?.includes('admin'));
        });
    }, [initData]);

    return (
        <Provider store={store}>
            {isAdmin !== null && <RouterWrapper isAdmin={isAdmin} />}
        </Provider>
    );
}

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    <React.StrictMode>
        <Root />
    </React.StrictMode>
);

