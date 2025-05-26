import { 
    FilterList,
    FilterListItem,
    FilterListSection,
    DateInput,
    useListContext,
    TextInput
} from 'react-admin';
import { useEffect } from 'react';
import { useForm, FormProvider } from 'react-hook-form';
import PublishedWithChangesIcon from '@mui/icons-material/PublishedWithChanges';
import DateRangeIcon from '@mui/icons-material/DateRange';
import { Card, CardContent, Box } from '@mui/material';


const InvoiceFilterList = () => (
    <FilterList label='Статус' icon={<PublishedWithChangesIcon />} >
        <FilterListItem label='Оплачен' value={{ status: 'paid' }} />
        <FilterListItem label='Отменен' value={{ status: 'cancelled' }} />
        <FilterListItem label='Ошибка' value={{ status: 'failed' }} />
        <FilterListItem label='Ожидание' value={{ status: 'pending' }} />
    </FilterList>
)

export const InvoiceFilterSidebar = () => {
    const { filterValues, setFilters } = useListContext();
    const methods = useForm({
        defaultValues: {
            order_id: filterValues.order_id,
            created_at: filterValues.created_at,
            created_at_gte: filterValues.created_at_gte,
            created_at_lte: filterValues.created_at_lte
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
        <Card sx={{ order: -1, mr: 2, mt: 6, width: 250, height: 'fit-content' }}>
            <CardContent>
                <FormProvider {...methods}>
                    <Box>
                        <TextInput source='order_id' label='Счет №' />
                        <InvoiceFilterList />
                        <FilterListSection label='Дата и период' icon={<DateRangeIcon />} >
                            <DateInput source='created_at' label='Дата' />
                            <DateInput source='created_at_gte' label='Дата с' />
                            <DateInput source='created_at_lte' label='Дата по' />
                        </FilterListSection>
                    </Box>
                </FormProvider>
            </CardContent>
        </Card>
    )
};