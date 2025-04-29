import { Datagrid, List, TextField, NumberField, BooleanField, EditButton, ImageField } from 'react-admin';
import { useMediaQuery } from "@mui/material";
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import CancelIcon from '@mui/icons-material/Cancel';

export const ProductList = () => {
    const isSmall = useMediaQuery((theme) => theme.breakpoints.down('sm'));

    return (
        <List title="Товары">
            { isSmall ? (
                <Datagrid>
                    <ImageField 
                        source="images" 
                        src="src" 
                        label={false} 
                        sx={{ '& img': { maxHeight: '40px', maxWidth: '40px' } }}
                    />
                    <TextField source="name" label={false} />
                    <BooleanField 
                        source="actually" 
                        label={false}
                        TrueIcon={CheckCircleIcon} 
                        FalseIcon={CancelIcon} 
                        sx={{
                            color: 'var(--tg-theme-hint-color)',
                        }}
                    />
                    <EditButton />
                </Datagrid>
            ) : (
                <Datagrid>
                    <NumberField source="id" />
                    <ImageField 
                        source="images" 
                        src="src" 
                        label={false} 
                        sx={{ '& img': { maxHeight: '40px', maxWidth: '40px' } }}
                    />
                    <TextField source="name" label="Наименование" />
                    <NumberField source="price" label="Цена" options={{ style: 'currency', currency: 'RUB' }} />
                    <BooleanField 
                        source="actually" 
                        label="Активно" 
                        TrueIcon={CheckCircleIcon} 
                        FalseIcon={CancelIcon} 
                        sx={{
                            color: 'var(--tg-theme-hint-color)',
                        }}
                    />
                    <EditButton />
                </Datagrid>
            )}
        </List>
    )
}