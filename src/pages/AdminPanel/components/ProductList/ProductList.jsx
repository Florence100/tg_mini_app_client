import { 
    Datagrid, 
    List, 
    TextField, 
    NumberField, 
    EditButton, 
    ImageField, 
    SearchInput,
    BooleanInput,
    useNotify
} from 'react-admin';
import { useMediaQuery } from '@mui/material';
import { ProductFilterSidebar } from '../ProductFilterSidebar/ProductFilterSidebar';
import { ProductStatusField } from '../ProductStatusField/ProductStatusField';
import { createCSVExporter } from 'helpers/createCSVExporter';
import useTelegram from 'hooks/useTelegram';
import { CastomMoneyField } from '../CastomMoneyField/CastomMoneyField';


const productFilters = [
    <SearchInput source='q' alwaysOn placeholder='Поиск...' />,
    <BooleanInput 
        source='actually' 
        label='В наличии'
        parse={(value) => value === true ? 1 : 0 }
        sx={{padding: '8px 16px'}}
    />
];

export const ProductList = () => {
    const isSmall = useMediaQuery((theme) => theme.breakpoints.down('sm'));
    const { initData, user } = useTelegram();
    const notify = useNotify();

    const fileName = 'products';
    const exporter = createCSVExporter({ user, initData, notify, fileName });

    return (
        <List 
            title='Товары' 
            filters={ isSmall ? productFilters : false }
            aside={ isSmall ? false : <ProductFilterSidebar /> }
            exporter={ exporter }
        >
            <Datagrid 
                bulkActionButtons={ isSmall ? false : true }
                sx={ isSmall && {'& td, & th': { padding: '6px 8px' }}}
            >
                { !isSmall && <NumberField source='id' label='№' /> }
                <ImageField 
                    source='images' 
                    src='src' 
                    label={false} 
                    sx={{ '& img': { maxHeight: '30px', maxWidth: '30px', margin: 0 } }}
                />
                <TextField 
                    source='name' 
                    label='Название' 
                />
                <CastomMoneyField source='price' label='Цена' />
                <ProductStatusField 
                    label={ isSmall ? false : 'Статус' } 
                />
                <EditButton />
            </Datagrid>
        </List>
    )
}