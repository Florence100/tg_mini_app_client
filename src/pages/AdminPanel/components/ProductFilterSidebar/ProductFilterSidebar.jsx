import { 
    FilterList,
    FilterListItem,
    useListContext,
    SearchInput
} from 'react-admin';
import { useEffect } from 'react';
import { useForm, FormProvider } from 'react-hook-form';
import { Card, CardContent, Box } from '@mui/material';
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';


const ProductFilterList = () => (
    <FilterList label='Статус' icon={<CheckCircleOutlineIcon />} >
        <FilterListItem label='В наличии' value={{ actually: 1 }} />
        <FilterListItem label='Нет в наличии' value={{ actually: 0 }} />
    </FilterList>
)


export const ProductFilterSidebar = () => {
    const { filterValues, setFilters } = useListContext();
    const methods = useForm({
        defaultValues: {
            q: filterValues.q
        },
    });

    const { watch } = methods;

    useEffect(() => {
        const subscription = watch((values) => {
            const next = { ...filterValues, ...values };
            const isSame = JSON.stringify(filterValues) === JSON.stringify(next);
            if (!isSame) {
                setFilters(next, null, false);
            }
        });
        return () => subscription.unsubscribe();
    }, [watch, setFilters, filterValues]);

    return (
        <Card sx={{ order: -1, mr: 2, mt: 6, width: 250, minWidth: 250, height: 'fit-content' }}>
            <CardContent>
                <FormProvider {...methods}>
                    <Box>
                        <SearchInput source='q' placeholder='Поиск...' />
                        <ProductFilterList />
                    </Box>
                </FormProvider>
            </CardContent>
        </Card>
    )
};