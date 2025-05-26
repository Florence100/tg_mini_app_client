import {
    Datagrid,
    DateField,
    List,
    ReferenceField,
    TextField,
    EditButton,
    BulkDeleteButton,
    SelectInput,
    DateInput,
    useNotify,
} from 'react-admin';
import { useMediaQuery } from '@mui/material';
import { OrderStatusField } from '../OrderStatusField/OrderStatusField';
import { DeliveryStatusField } from '../DeliveryStatusField/DeliveryStatusField';
import { OrderFilterSidebar } from '../OrderFilterSidebar/OrderFilterSidebar';
import { createCSVExporter } from 'helpers/createCSVExporter';
import useTelegram from 'hooks/useTelegram';
import { CastomMoneyField } from '../CastomMoneyField/CastomMoneyField';


const orderFilters = [
    <SelectInput 
        source='status'
        choices={[
            { id: 'paid', name: 'Оплачен' },
            { id: 'cancelled', name: 'Отменен' },
            { id: 'failed', name: 'Ошибка' },
            { id: 'pending', name: 'Ожидание' },
            { id: 'preparing', name: 'Готовится' },
            { id: 'ready for pickup', name: 'Готов к самовывозу' },
            { id: 'ready for delivery', name: 'Готов к доставке' },
            { id: 'delivering now', name: 'В пути' },
            { id: 'picked up', name: 'Забран' },
            { id: 'delivered', name: 'Доставлен' },
            { id: 'returned', name: 'Возвращен' },
        ]}
        label='Статус'
    />,
    <DateInput source='ready_date' label='Дата' />,
    <DateInput source='ready_at_gte' label='Дата с' />,
    <DateInput source='ready_at_lte' label='Дата по' />,
    <SelectInput 
        source='delivery'
        choices={[
            { id: 'pickup', name: 'Самовывоз' },
            { id: 'delivery', name: 'Доставка' }
        ]}
        label='Доставка'
    />
];

export const OrderList = () => {
    const isSmall = useMediaQuery((theme) => theme.breakpoints.down('sm'));
    const { initData, user } = useTelegram();
    const notify = useNotify();

    const fileName = 'orders';
    const exporter = createCSVExporter({ user, initData, notify, fileName });

    const PostBulkActionButtons = () => (
        <BulkDeleteButton
            mutationMode='pessimistic'
            confirmColor='warning'
            confirmTitle='Удалить отмеченные элементы'
            confirmContent='Вы уверены, что хотите удалить отмеченные элементы?'
        />
    );

    return (
        <List
            filters={isSmall ? orderFilters : undefined}
            aside={isSmall ? null : <OrderFilterSidebar />}
            empty={false}
            exporter={ exporter }
        >
            <Datagrid 
                bulkActionButtons={ !isSmall ? <PostBulkActionButtons /> : false }
                sx={ isSmall && {'& td, & th': { padding: '6px 8px', maxWidth: '100px', overflow: 'hidden' }}}
            >
                <TextField source='id' label='№' />
                <ReferenceField 
                    source='user_id' 
                    reference='user' 
                    label='Заказчик' 
                />
                <OrderStatusField source='status' label='Статус' textAlign='center' />
                {!isSmall && <DeliveryStatusField source='delivery' label='Информация о доставке' />}
                {!isSmall && <CastomMoneyField source='delivery_cost' label='Стоимость доставки' />}
                {!isSmall && <DateField source='ready_date' label='Дата готовности' />}
                {!isSmall && <TextField source='ready_time' label='Время готовности' />}
                <ReferenceField source='order_id' reference='invoice' label='Счет' />
                <EditButton />
            </Datagrid>
        </List>
    );
};
