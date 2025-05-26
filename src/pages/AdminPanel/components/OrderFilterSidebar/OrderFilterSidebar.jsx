import {
    FilterList,
    FilterListItem,
    FilterListSection,
    useListContext,
    DateInput,
} from 'react-admin';
import { useEffect } from 'react';
import { Card, CardContent, Box } from '@mui/material';
import PublishedWithChangesIcon from '@mui/icons-material/PublishedWithChanges';
import LocalShippingOutlinedIcon from '@mui/icons-material/LocalShippingOutlined';
import DateRangeIcon from '@mui/icons-material/DateRange';
import { useForm, FormProvider } from 'react-hook-form';


const DateFilterInputs = () => {
    const { filterValues, setFilters } = useListContext();
    const methods = useForm({
        defaultValues: {
            ready_date: filterValues.ready_date,
            ready_at_gte: filterValues.ready_at_gte,
            ready_at_lte: filterValues.ready_at_lte,
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
        <FormProvider {...methods}>
            <Box>
                <DateInput source='ready_date' label='Дата' fullWidth />
                <DateInput source='ready_at_gte' label='Дата с' fullWidth />
                <DateInput source='ready_at_lte' label='Дата по' fullWidth />
            </Box>
        </FormProvider>
    );
};

const OrderFilterList = () => (
    <FilterList label='Статус' icon={<PublishedWithChangesIcon />}>
        <FilterListItem label='Оплачен' value={{ status: 'paid' }} />
        <FilterListItem label='Отменен' value={{ status: 'cancelled' }} />
        <FilterListItem label='Ошибка' value={{ status: 'failed' }} />
        <FilterListItem label='Ожидание' value={{ status: 'pending' }} />
        <FilterListItem label='Готовится' value={{ status: 'preparing' }} />
        <FilterListItem label='Готов к самовывозу' value={{ status: 'ready for pickup' }} />
        <FilterListItem label='Готов к доставке' value={{ status: 'ready for delivery' }} />
        <FilterListItem label='В пути' value={{ status: 'delivering now' }} />
        <FilterListItem label='Забран' value={{ status: 'picked up' }} />
        <FilterListItem label='Доставлен' value={{ status: 'delivered' }} />
        <FilterListItem label='Возвращен' value={{ status: 'returned' }} />
    </FilterList>
)

const DeliveryFilterList = () => (
    <FilterList label='Доставка' icon={<LocalShippingOutlinedIcon />}>
        <FilterListItem label='Доставка' value={{ delivery: 'delivery' }} />
        <FilterListItem label='Самовывоз' value={{ delivery: 'pickup' }} />
    </FilterList>
)

export const OrderFilterSidebar = () => {
    return (
        <Card sx={{ order: -1, mr: 2, mt: 6, width: 250, minWidth: 250, height: 'fit-content' }}>
            <CardContent>
                <OrderFilterList />
                <DeliveryFilterList />
                <FilterListSection label='Дата и период' icon={<DateRangeIcon />}>
                    <DateFilterInputs />
                </FilterListSection>
            </CardContent>
        </Card>
    );
};
