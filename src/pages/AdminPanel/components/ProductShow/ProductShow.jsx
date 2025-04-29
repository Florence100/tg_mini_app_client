import { BooleanField, NumberField, Show, SimpleShowLayout, TextField, ImageField } from 'react-admin';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import CancelIcon from '@mui/icons-material/Cancel';
import { useRecordContext } from 'react-admin';

const ProductTitle = () => {
    const record = useRecordContext();
    return <span>{record ? `${record.name}` : ''}</span>;
};

export const ProductShow = () => (
    <Show title={<ProductTitle />} >
        <SimpleShowLayout>
            <TextField source="id" />
            <TextField source="name" label="Наименование" />
            <ImageField 
                source="images" 
                src="src" 
                label={false} 
                sx={{ '& img': { maxHeight: '80px', maxWidth: '80px' } }}
            />
            <BooleanField 
                source="actually" 
                label="Активно" 
                TrueIcon={CheckCircleIcon} 
                FalseIcon={CancelIcon} 
                sx={{
                    color: 'var(--tg-theme-hint-color)',
                }}
            />
            <NumberField source="price" label="Цена" options={{ style: 'currency', currency: 'RUB' }} />
            <TextField source="description" label="Описание" />
            <NumberField source="weight" label="Вес" />
            <NumberField source="proteins" label="Белки" />
            <NumberField source="fats" label="Жиры" />
            <NumberField source="carbohydrates" label="Углеводы" />
            <NumberField source="calorie" label="Калорийность" />
        </SimpleShowLayout>
    </Show>
);