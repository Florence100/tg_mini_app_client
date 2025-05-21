import React, { useEffect } from 'react';
import { Admin, Resource } from 'react-admin';
import { useNavigate } from 'react-router-dom';
import useTelegram from 'hooks/useTelegram';
import dataProvider from '../../data/dataProvider';
import i18nProvider from 'pages/AdminPanel/data/i18nProvider';
import { ProductList } from '../ProductList/ProductList';
import { ProductShow } from '../ProductShow/ProductShow';
import { ProductEdit } from '../ProductEdit/ProductEdit';
import { ProductCreate } from '../ProductCreate/ProductCreate';
import { UserList } from '../UserList/UserList';
import { UserShow } from '../UserShow/UserShow';
import { OrderList } from '../OrderList/OrderList';
import { showWarningPopup } from 'helpers/showPopup';
import { OrderShow } from '../OrderShow/OrderShow';
import { OrderEdit } from '../OrderEdit/OrderEdit';
import { InvoiceList } from '../InvoiceList/InvoiceList';
import StoreIcon from '@mui/icons-material/Store';
import GroupIcon from '@mui/icons-material/Group';
import RequestQuoteIcon from '@mui/icons-material/RequestQuote';
import { InvoiceShow } from '../InvoiceShow/InvoiceShow';

function AdminPanel() {
    const { tg } = useTelegram();;
    const navigate = useNavigate();

    useEffect(() => {
        function handleBackBtnClick () {
            showWarningPopup(tg, 'Вы уверены, что хотите выйти?', 'Да', 'exit');
        }

        function onPopupCloseHandler (buttonId) {
            if (buttonId.button_id === 'exit') {
                navigate('/');
            }
        }

        tg.BackButton.show();
        tg.BackButton.onClick(handleBackBtnClick);
        tg.onEvent('popupClosed', onPopupCloseHandler);

        return () => {
            tg.BackButton.hide();
            tg.offEvent('popupClosed', onPopupCloseHandler);
            tg.BackButton.offClick(handleBackBtnClick);
        }
    }, [tg, navigate])

    return (
        <Admin dataProvider={dataProvider} i18nProvider={i18nProvider} >
            <Resource 
                name="products" 
                list={ProductList} 
                show={ProductShow} 
                edit={ProductEdit} 
                create={ProductCreate}
                icon={StoreIcon}
                options={{ label: 'Товары' }}
            />
            <Resource 
                name="user" 
                list={UserList}
                show={UserShow}
                icon={GroupIcon}
                options={{ label: 'Пользователи' }}
                recordRepresentation={(record) => `${record.first_name}`}
            />
            <Resource 
                name="order"
                list={OrderList}
                show={OrderShow}
                edit={OrderEdit}
                options={{ label: 'Заказы' }}
                recordRepresentation={(record) => `#${record.order_id}`}
            />
            <Resource 
                name="invoice"
                list={InvoiceList}
                show={InvoiceShow}
                options={{ label: 'Счета' }}
                icon={RequestQuoteIcon}
            />
        </Admin>
    )
}

export default AdminPanel;
