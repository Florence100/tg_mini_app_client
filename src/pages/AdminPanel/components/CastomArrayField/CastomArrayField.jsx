import { useRecordContext, ArrayField, TextField, Datagrid } from 'react-admin';
import { useMediaQuery } from '@mui/material';
import { CastomMoneyField } from '../CastomMoneyField/CastomMoneyField';


export const CastomArrayField = ({ sourse }) => {
    const isSmall = useMediaQuery((theme) => theme.breakpoints.down('sm'));
    const record = useRecordContext(sourse);
    const productsInfo = JSON.parse(record.products_info);
    const data = {products_info: productsInfo}

    return (
        <ArrayField record={data} source='products_info' >
            <Datagrid bulkActionButtons={false} sx={{ maxWidth: '500px' }} >
                <TextField source='product_id' label='№' />
                <TextField source='name' label='Товар' />
                <TextField source='count' label={isSmall ? 'Кол-во' : 'Количество'} />
                <CastomMoneyField source='price' label='Цена' />
            </Datagrid>
        </ArrayField>
    );
}