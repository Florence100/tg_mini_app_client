import { 
    DateInput, 
    Edit, 
    SimpleForm, 
    TextInput, 
    SelectInput,  
    useRecordContext, 
    TopToolbar, 
    ListButton, 
    ShowButton, 
    Toolbar, 
    SaveButton, 
    DeleteWithConfirmButton,
    NumberInput
} from 'react-admin';
import { Box, useMediaQuery } from '@mui/material';
import { CastomArrayField } from '../CastomArrayField/CastomArrayField';

const StatusSelect = () => {
    const record = useRecordContext();
    let defaultStatusName = '';

    if (!record) return null;

    switch (record.status) {
        case 'pending': 
            defaultStatusName = 'Ожидание';
            break;
        case 'failed':
            defaultStatusName = 'Ошибка';
            break;
        case 'cancelled':
            defaultStatusName = 'Отменен';
            break;
        case 'paid':
            defaultStatusName = 'Оплачен';
            break;
        default:
            break;
    }

    return (
        <SelectInput
            source='status'
            choices={[
                { id: record.status, name: defaultStatusName },
                { id: 'preparing', name: 'Готовится' },
                { id: 'ready for pickup', name: 'Готов к самовывозу' },
                { id: 'ready for delivery', name: 'Готов к доставке' },
                { id: 'delivering now', name: 'В пути' },
                { id: 'picked up', name: 'Забран' },
                { id: 'delivered', name: 'Доставлен' },
                { id: 'returned', name: 'Возвращен' },
            ]}
            // validate={required()}
            label='Статус'
            defaultValue={record.status}
            translateChoice={false}
            sx={{ width: 'calc(50% - 8px)' }}
        />
    );
};

const timeOptions = [
    { id: '12:00-14:00', name: '12:00 - 14:00' },
    { id: '14:00-16:00', name: '14:00 - 16:00' },
    { id: '16:00-18:00', name: '16:00 - 18:00' },
    { id: '18:00-20:00', name: '18:00 - 20:00' },
    { id: '20:00-22:00', name: '20:00 - 22:00' },
];

const TimeSelect = () => {
    return (
        <SelectInput 
            source='ready_time'
            choices={timeOptions}
            label='Время готовности'
            translateChoice={false}
            sx={{ width: 'calc(50% - 8px)' }}
            // validate={required()}
        />
    )
}

const DeliveryInput = () => {
    const record = useRecordContext();
    if (!record) return null;

    return (
        <TextInput 
            source='delivery' 
            label='Доставка' 
            disabled={true} 
            format= { (value) => value === 'pickup' ? 'Самовывоз' : 'Доставка' }
            sx={{ width: 'calc(50% - 8px)' }} 
        />
    )
}

export const OrderEdit = () => {
    const OrderTitle = () => {
        const record = useRecordContext();
        return <span>{record ? `Заказ #${record.id}` : ''}</span>;
    };

    const OrderEditActions = () => (
        <TopToolbar>
            <ListButton />
            <ShowButton />
        </TopToolbar>
    );

    const OrderEditToolbar = () => {
        const record = useRecordContext();
        return (
            <Toolbar sx={{display: 'flex', justifyContent: 'space-between'}}>
                <SaveButton />
                <DeleteWithConfirmButton 
                    confirmTitle={`Удалить заказ #${record.id}`}
                    confirmContent={'Вы уверены, что хотите удалить этот элемент?'}
                    confirmColor='warning'
                />
            </Toolbar>
        )
    }

    const isSmall = useMediaQuery((theme) => theme.breakpoints.down('sm'));

    return (
        <Edit title={<OrderTitle />} actions={<OrderEditActions />} >
            <SimpleForm 
                toolbar={<OrderEditToolbar />}
            >
                <Box sx={ !isSmall ? { display: 'flex', gap: '16px', width: '100%', flexWrap: 'wrap' } : undefined } >
                    <TextInput source='id' label='№ заказа' readOnly sx={{ width: 'calc(50% - 8px)' }} />
                    <TextInput source='user_id' label='Заказчик' disabled={true} sx={{ width: 'calc(50% - 8px)' }} />
                </Box>

                <Box sx={ !isSmall ? { display: 'flex', gap: '16px', width: '100%', flexWrap: 'wrap' } : undefined } >
                    <DeliveryInput />
                    <NumberInput 
                        source='delivery_cost' 
                        disabled={true} 
                        label='Стоимость доставки' 
                        sx={{ width: 'calc(50% - 8px)' }} 
                        format={(value) => value != null ? (value / 100).toFixed(2) : ''}
                    />
                </Box>

                <Box sx={ !isSmall ? { display: 'flex', gap: '16px', width: '100%', flexWrap: 'wrap' } : undefined }>
                    <StatusSelect />
                    <DateInput source='created_at' label='Создан' disabled={true} sx={{ width: 'calc(50% - 8px)' }} />
                </Box>

                <Box sx={ !isSmall ? { display: 'flex', gap: '16px', width: '100%', flexWrap: 'wrap' } : undefined } >
                    <DateInput source='ready_date' label='Дата готовности' sx={{ width: 'calc(50% - 8px)' }} />
                    <TimeSelect />
                </Box>
                
                <Box sx={ !isSmall ? { display: 'flex', gap: '16px', width: '100%', flexWrap: 'wrap' } : undefined } >
                    <TextInput source='address' label='Адрес доставки' multiline={true} resettable={true} sx={{ width: 'calc(50% - 8px)' }}/>
                    <TextInput source='comment' label='Комментарий' multiline={true} resettable={true} sx={{ width: 'calc(50% - 8px)' }} />
                </Box>

                <CastomArrayField source='products_info' label='Информация о заказе' />
            </SimpleForm>
        </Edit>
    )
};