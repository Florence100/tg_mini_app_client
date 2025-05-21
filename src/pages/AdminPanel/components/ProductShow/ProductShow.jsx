import { 
    NumberField, 
    Show, 
    SimpleShowLayout, 
    TextField, 
    ImageField, 
    TopToolbar, 
    ListButton, 
    EditButton 
} from 'react-admin';
import { useRecordContext } from 'react-admin';
import { ProductStatusField } from '../ProductStatusField/ProductStatusField';
import { CastomMoneyField } from '../CastomMoneyField/CastomMoneyField';


const ProductTitle = () => {
    const record = useRecordContext();
    return <span>{record ? `${record.name}` : ''}</span>;
};

const ProductShowActions = () => (
    <TopToolbar>
        <ListButton />
        <EditButton />
    </TopToolbar>
);

export const ProductShow = () => {
    return (
        <Show title={<ProductTitle />} actions={<ProductShowActions />}>
            <SimpleShowLayout spacing={2}>
                <TextField source='id' label='Товар №' />
                <ImageField 
                    source='images' 
                    src='src' 
                    label={false} 
                    sx={{ '& img': { maxHeight: '80px', maxWidth: '80px' } }}
                />
                <SimpleShowLayout direction='row' spacing={4} sx={{padding: '0'}} >
                    <TextField source='name' label='Название' />
                    <ProductStatusField label='Статус' />
                </SimpleShowLayout>
                <CastomMoneyField source='price' label='Цена' />
                <TextField source='description' label='Описание' />
                <SimpleShowLayout direction='row' spacing={4} sx={{padding: '0'}}>
                    <NumberField source='proteins' label='Белки' />
                    <NumberField source='fats' label='Жиры' />
                    <NumberField source='carbohydrates' label='Углеводы' />
                    <NumberField source='calorie' label='Калорийность' />
                </SimpleShowLayout>
                <NumberField source='weight' label='Вес, г.' />
            </SimpleShowLayout>
        </Show>
    )
};