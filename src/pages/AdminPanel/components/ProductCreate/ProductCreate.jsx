import { 
    BooleanInput, 
    Create, 
    NumberInput, 
    SimpleForm, 
    TextInput, 
    ImageInput, 
    ImageField,
    TopToolbar,
    ListButton,
    required
} from 'react-admin';
import { useMediaQuery, Box } from '@mui/material';


const ProductCreateActions = () => (
    <TopToolbar>
        <ListButton />
    </TopToolbar>
);

export const ProductCreate = () => {
    const isSmall = useMediaQuery((theme) => theme.breakpoints.down('sm'));

    return (
        <Create actions={ <ProductCreateActions /> }>
            <SimpleForm>
                <TextInput 
                    source='name' 
                    label='Наименование' 
                    sx={{ width: 'calc(50% - 8px)' }} 
                    validate={[required()]} 
                />
                <Box sx={ !isSmall ? { display: 'flex', gap: '16px', width: '100%', flexWrap: 'wrap' } : undefined }>
                    <NumberInput 
                        source='price' 
                        label='Цена, руб.' 
                        sx={{ width: 'calc(50% - 8px)' }} 
                        format={(value) => value != null ? (value / 100).toFixed(2) : ''}
                        parse={(value) => value != null ? Math.round(parseFloat(value) * 100) : undefined}
                        validate={[required()]}
                    />
                    <NumberInput source='weight' label='Вес' sx={{ width: 'calc(50% - 8px)' }} />
                </Box>
                
                <TextInput source='description' multiline rows={5} label='Описание' />
                
                <Box sx={ !isSmall ? { display: 'flex', gap: '16px', width: '100%', flexWrap: 'wrap' } : undefined }>
                    <NumberInput source='proteins' label='Белки' sx={{ width: 'calc(25% - 12px)' }} />
                    <NumberInput source='fats' label='Жиры' sx={{ width: 'calc(25% - 12px)' }} />
                    <NumberInput source='carbohydrates' label='Углеводы' sx={{ width: 'calc(25% - 12px)' }} />
                    <NumberInput source='calorie' label='Калорийность' sx={{ width: 'calc(25% - 12px)' }} />
                </Box>
                
                <BooleanInput 
                    source='actually' 
                    label='В наличии' 
                />

                <ImageInput 
                    source='images' 
                    label='Изображения' 
                    placeholder='Переместите изображения для загрузки или нажмите, чтобы выбрать одно' 
                    accept='image/*'
                    maxSize='150000'
                    multiple 
                >
                    <ImageField 
                        source='src' 
                        title='title' 
                        sx={{ '& img': { maxHeight: '80px', maxWidth: '80px' } }} 
                    />
                </ImageInput>
            </SimpleForm>
        </Create>
    )
};