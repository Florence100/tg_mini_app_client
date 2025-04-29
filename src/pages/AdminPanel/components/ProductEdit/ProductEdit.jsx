import { BooleanInput, Edit, NumberInput, SimpleForm, TextInput, ImageInput, ImageField, Button } from 'react-admin';
import { useRecordContext } from 'react-admin';

const ProductTitle = () => {
    const record = useRecordContext();
    return <span>Изменить {record ? `${record.name}` : ''}</span>;
};

export const ProductEdit = () => (
    <Edit title={<ProductTitle />} >
        <SimpleForm>
            <TextInput source="id" InputProps={{ disabled: true }} />
            <TextInput source="name" label="Наименование" />
            <NumberInput source="price" label="Цена" />
            <TextInput source="description" multiline rows={5} label="Описание" />
            <NumberInput source="weight" label="Вес" />
            <NumberInput source="proteins" label="Белки" />
            <NumberInput source="fats" label="Жиры" />
            <NumberInput source="carbohydrates" label="Углеводы" />
            <NumberInput source="calorie" label="Калорийность" />
            <BooleanInput source="actually" label="Актуально" />
            <ImageInput 
                source="images" 
                label="Изображения" 
                placeholder="Переместите изображения для загрузки или нажмите, чтобы выбрать одно" 
                accept="image/*"
                // maxSize="150000"
                multiple 
            >
                <ImageField 
                    source="src" 
                    title="title" 
                    sx={{ '& img': { maxHeight: '80px', maxWidth: '80px' } }}
                />
            </ImageInput>
        </SimpleForm>
    </Edit>
);