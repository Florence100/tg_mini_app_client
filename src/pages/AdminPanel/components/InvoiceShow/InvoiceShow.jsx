import { 
    DateField, 
    ReferenceField, 
    Show, 
    SimpleShowLayout, 
    useRecordContext,
    TopToolbar,
    ListButton
} from 'react-admin';
import { CastomMoneyField } from '../CastomMoneyField/CastomMoneyField';
import { PaymentStatusField } from '../PaymentStatusField/PaymentStatusField';

export const InvoiceShow = () => {
    const OrderTitle = () => {
        const record = useRecordContext();
        return <span>{record ? `Счет #${record.id}` : ''}</span>;
    };

    const OrderShowActions = () => (
        <TopToolbar>
            <ListButton />
        </TopToolbar>
    );

    return (
        <Show title={<OrderTitle />} actions={<OrderShowActions />}>
            <SimpleShowLayout spacing={2}>
                <ReferenceField source='order_id' reference='order' label='Заказ №' />
                <PaymentStatusField source='status' label='Статус' />
                <CastomMoneyField source='total_amount' label='Сумма' />
                <ReferenceField source='user_id' reference='user' label='Заказчик' />
                <DateField source='created_at' label='Создан' />
            </SimpleShowLayout>
        </Show>
    )
};