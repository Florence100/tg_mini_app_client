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
import handleApiResponse from 'helpers/handleApiResponse';
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

const createAppRouter = (isAdmin) => createBrowserRouter([
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
]);


function Root() {
    const { initData, tg } = useTelegram();
    const [isAdmin, setIsAdmin] = useState(null);

    useEffect(() => {
        if (!initData) return;

        authorization(initData)
            .then((data) => {
                if (data.error) {
                    handleApiResponse(data, tg);
                    return;
                }
                const isUserAdmin = data?.roles?.includes('admin');
                setIsAdmin(isUserAdmin);
                localStorage.setItem('initData', initData);
            })
    }, [initData, tg]);

    if (isAdmin === null) return null;

    const router = createAppRouter(isAdmin);

    return (
        <Provider store={store}>
            <RouterProvider
                router={router}
                future={{
                    v7_startTransition: true,
                    v7_relativeSplatPath: true
                }}
            />
        </Provider>
    );
}

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    <React.StrictMode>
        <Root />
    </React.StrictMode>
);

