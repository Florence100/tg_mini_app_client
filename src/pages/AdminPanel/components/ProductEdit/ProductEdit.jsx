import { BooleanInput, Edit, NumberInput, SimpleForm, TextInput, ImageInput, ImageField, required } from 'react-admin';
import { useRecordContext } from 'react-admin';
import { useMediaQuery, Box } from '@mui/material';
import { MAX_FILES, MAX_SIZE } from 'consts/consts';


const ProductTitle = () => {
    const record = useRecordContext();
    return <span>Изменить {record ? `${record.name}` : ''}</span>;
};

const validateImages = (value) => {
    if (!value) return;

    if (value.length > MAX_FILES) {
        return `Можно загрузить не более ${MAX_FILES} изображений.`;
    }

    const oversized = value.find(file => file.rawFile && file.rawFile.size > MAX_SIZE);
    if (oversized) {
        return `Файл '${oversized.title}' превышает максимальный размер 150 KB.`;
    }
};

export const ProductEdit = () => {
    const isSmall = useMediaQuery((theme) => theme.breakpoints.down('sm'));

    return (
        <Edit title={<ProductTitle />} >
            <SimpleForm>
                <Box sx={ !isSmall ? { display: 'flex', gap: '16px', width: '100%', flexWrap: 'wrap' } : undefined }>
                    <TextInput source='id' readOnly={true} label='Товар №' sx={{ width: 'calc(50% - 8px)' }} />
                    <TextInput 
                        source='name' 
                        label='Название' 
                        validate={[required()]} 
                        sx={{ width: 'calc(50% - 8px)' }} 
                    />
                </Box>

                <Box sx={ !isSmall ? { display: 'flex', gap: '16px', width: '100%', flexWrap: 'wrap' } : undefined }>
                    <NumberInput 
                        source='price' 
                        label='Цена, руб.' 
                        sx={{ width: 'calc(50% - 8px)' }} 
                        parse={(value) => value != null ? Math.round(parseFloat(value) * 100) : undefined}
                        format={(value) => value != null ? (value / 100).toFixed(2) : ''}
                        validate={[required()]} 
                    />
                    <NumberInput source='weight' label='Вес, г.' sx={{ width: 'calc(50% - 8px)' }} />
                </Box>
                
                <TextInput source='description' multiline rows={5} label='Описание' />

                <Box sx={ !isSmall ? { display: 'flex', width: '100%', gap: '16px', flexWrap: 'wrap' } : undefined }>
                    <NumberInput source='proteins' label='Белки, г.' sx={{ width: 'calc(25% - 12px)' }} />
                    <NumberInput source='fats' label='Жиры, г.' sx={{ width: 'calc(25% - 12px)' }} />
                    <NumberInput source='carbohydrates' label='Углеводы, г.' sx={{ width: 'calc(25% - 12px)' }} />
                    <NumberInput source='calorie' label='Калорийность, ккал.' sx={{ width: 'calc(25% - 12px)' }} />
                </Box>

                <BooleanInput source='actually' label='В наличии' />

                <ImageInput 
                    source='images' 
                    label='Изображения' 
                    placeholder='Переместите изображения для загрузки или нажмите, чтобы выбрать одно. Максимальный размер изображения 150kB. Максимальное количество изображений - 5.' 
                    accept='image/*'
                    maxSize={MAX_SIZE}
                    multiple 
                    validate={validateImages}
                >
                    <ImageField 
                        source='src' 
                        title='title' 
                        sx={{ '& img': { maxHeight: '80px', maxWidth: '80px' } }}
                    />
                </ImageInput>

            </SimpleForm>
        </Edit>
    )
};