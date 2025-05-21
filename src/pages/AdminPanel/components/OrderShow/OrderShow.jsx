import { 
    DateField, 
    ReferenceField, 
    Show, 
    SimpleShowLayout, 
    TextField, 
    useRecordContext, 
    ListButton, 
    EditButton, 
    TopToolbar
} from 'react-admin';
import { OrderStatusField } from '../OrderStatusField/OrderStatusField';
import { DeliveryStatusField } from '../DeliveryStatusField/DeliveryStatusField';
import { CastomArrayField } from '../CastomArrayField/CastomArrayField';
import { CastomMoneyField } from '../CastomMoneyField/CastomMoneyField';


export const OrderShow = () => {
    const OrderTitle = () => {
        const record = useRecordContext();
        return <span>{record ? `Заказ #${record.id}` : ''}</span>;
    };

    const OrderShowActions = () => (
        <TopToolbar>
            <ListButton />
            <EditButton />
        </TopToolbar>
    );

    return (
        <Show title={ <OrderTitle /> } actions={<OrderShowActions />} >
            <SimpleShowLayout spacing={2}>
                <SimpleShowLayout direction='row' spacing={4} sx={{padding: '0'}}>
                    <TextField source='id' label='Заказ №' />
                    <OrderStatusField source='status' label='Статус' />
                    <ReferenceField source='order_id' reference='invoice' label='Счет' />
                </SimpleShowLayout>
                <ReferenceField source='user_id' reference='user' label='Заказчик' />
                <SimpleShowLayout direction='row' spacing={4} sx={{padding: '0'}}>
                    <DeliveryStatusField source='delivery' label='Доставка' />
                    <CastomMoneyField source='delivery_cost' label='Стоимость доставки' />
                </SimpleShowLayout>
                <SimpleShowLayout direction='row' spacing={4} sx={{padding: '0'}}>
                    <DateField source='ready_date' label='Дата готовности' />
                    <TextField source='ready_time' label='Время готовности' />
                </SimpleShowLayout>
                <CastomArrayField source='products_info' label='Информация о заказе' />
                <TextField source='address' label='Адрес доставки' emptyText='—' />
                <TextField source='comment' label='Комментарий' emptyText='—' />
                <DateField source='created_at' label='Создан' />
            </SimpleShowLayout>
        </Show>
    )
};