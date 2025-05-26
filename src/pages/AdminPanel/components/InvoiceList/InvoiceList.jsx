import { 
    Datagrid, 
    DateField, 
    List, 
    ReferenceField, 
    SelectInput,
    DateInput, 
    TextInput,
    useNotify
} from 'react-admin';
import { CastomMoneyField } from '../CastomMoneyField/CastomMoneyField';
import { PaymentStatusField } from '../PaymentStatusField/PaymentStatusField';
import { useMediaQuery } from '@mui/material';
import { InvoiceFilterSidebar } from '../InvoiceFilterSidebar/InvoiceFilterSidebar';
import { createCSVExporter } from 'helpers/createCSVExporter';
import useTelegram from 'hooks/useTelegram';


const invoiceFilters = [
    <SelectInput 
        source='status'
        choices={[
            { id: 'paid', name: 'Оплачен' },
            { id: 'cancelled', name: 'Отменен' },
            { id: 'failed', name: 'Ошибка' },
            { id: 'pending', name: 'Ожидание' },
        ]}
        label='Статус'
    />,
    <TextInput source='order_id' label='Счет №' />,
    <DateInput source='created_at' label='Дата' />,
    <DateInput source='created_at_gte' label='Дата с' />,
    <DateInput source='created_at_lte' label='Дата по' />,
]

export const InvoiceList = () => {
    const isSmall = useMediaQuery((theme) => theme.breakpoints.down('sm'));
    const { initData, user } = useTelegram();
    const notify = useNotify();

    const fileName = 'invoices';
    const exporter = createCSVExporter({ user, initData, notify, fileName });

    return (
        <List
            filters = { isSmall ? invoiceFilters : false }
            aside = { !isSmall ? <InvoiceFilterSidebar /> : false }
            exporter={ exporter }
        >
            <Datagrid 
                bulkActionButtons={false}
                sx={ isSmall && {'& td, & th': { padding: '6px 8px', maxWidth: '100px', overflow: 'hidden' }}}
            >
                <ReferenceField source='order_id' reference='order' label='Заказ №' />
                { !isSmall && <ReferenceField source='user_id' reference='user' label='Заказчик' /> }
                <PaymentStatusField source='status' label='Статус' />
                <CastomMoneyField source='total_amount' label='Сумма' />
                <DateField source='created_at' label='Дата' />
            </Datagrid>
        </List>
    )
};