import { 
    DateField, 
    Show, 
    SimpleShowLayout, 
    TextField, 
    useRecordContext, 
    ImageField, 
    ListButton, 
    TopToolbar, 
    ReferenceManyField,
    Datagrid
} from 'react-admin';
import { useMediaQuery } from '@mui/material';
import { OrderStatusField } from '../OrderStatusField/OrderStatusField';
import { CastomMoneyField } from '../CastomMoneyField/CastomMoneyField';

const UserTitle = () => {
    const record = useRecordContext();
    return <span>{record ? `Пользователь #${record.id}` : ''}</span>;
};

export const UserShow = () => {
    const isSmall = useMediaQuery((theme) => theme.breakpoints.down('sm'));

    const UserShowActions = () => (
        <TopToolbar>
            <ListButton />
        </TopToolbar>
    );

    return (
        <Show title={<UserTitle/> } actions={<UserShowActions />} >
            <SimpleShowLayout spacing={2}>
                <TextField source='id' label='TG id' />
                <ImageField 
                    source='photo_url' 
                    label={false} 
                    sx={{ '& img': { maxHeight: '80px', maxWidth: '80px', margin: '0px' } }} 
                />
                <SimpleShowLayout direction='row' spacing={4} sx={{padding: '0'}}>
                    <TextField source='user_name' label='Никнейм' emptyText='—' />
                    <TextField source='first_name' label='Имя' />
                    <TextField source='last_name' label='Фамилия' emptyText='—' />
                </SimpleShowLayout>
                <DateField source='created_at' label='Создан' />
                <ReferenceManyField reference='order' target='user_id' label='Заказы' >
                    <Datagrid 
                        bulkActionButtons={false} 
                        sx={ isSmall && {'& td, & th': { padding: '6px 8px' }}} 
                    >
                        <TextField source='id' label='№' />
                        <DateField source='created_at' label='Создано' />
                        <OrderStatusField source='status' label='Статус' />
                        <CastomMoneyField source='total_amount' label='Сумма'/>
                    </Datagrid>
                </ReferenceManyField>
            </SimpleShowLayout>
        </Show>
    )
};

// const formattedTotal = (totalAmount / 100).toFixed(2);