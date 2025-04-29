import React, { useEffect } from 'react';
import { Admin, Resource } from 'react-admin';
import { useNavigate } from 'react-router-dom';
import useTelegram from 'hooks/useTelegram';
import dataProvider from '../../data/dataProvider';
import { ProductList } from '../ProductList/ProductList';
import { ProductShow } from '../ProductShow/ProductShow';
import { ProductEdit } from '../ProductEdit/ProductEdit';
import { ProductCreate } from '../ProductCreate/ProductCreate';
import { UserList } from '../UserList/UserList';
import { showWarningPopup } from 'helpers/showPopup';
import StoreIcon from '@mui/icons-material/Store';
import GroupIcon from '@mui/icons-material/Group';

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
        <Admin dataProvider={dataProvider}>
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
                icon={GroupIcon}
                options={{ label: 'Пользователи' }}
            />
        </Admin>
    )
}

export default AdminPanel;
