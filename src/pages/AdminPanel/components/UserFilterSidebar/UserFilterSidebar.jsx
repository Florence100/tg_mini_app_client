import { 
    FilterListSection,
    DateInput,
    useListContext,
    SearchInput
} from 'react-admin';
import { useEffect } from 'react';
import { Card, CardContent, Box } from '@mui/material';
import DateRangeIcon from '@mui/icons-material/DateRange';
import { useForm, FormProvider } from 'react-hook-form';


export const UserFilterSidebar = () => {
    const { filterValues, setFilters } = useListContext();
    const methods = useForm({
        defaultValues: {
            created_at_gte: filterValues.created_at_gte,
            created_at_lte: filterValues.created_at_lte,
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
        <Card sx={{ order: -1, mr: 2, mt: 6, width: 250, minWidth: 250, height: 'fit-content' }} >
            <CardContent>
                <FormProvider {...methods}>
                    <Box>
                        <SearchInput source='q' placeholder='Поиск...' />
                        <FilterListSection label='Период' icon={<DateRangeIcon />} >
                            <DateInput source='created_at_gte' label='Дата с' fullWidth />
                            <DateInput source='created_at_lte' label='Дата по' fullWidth />
                        </FilterListSection>
                    </Box>
                </FormProvider>
            </CardContent>
        </Card>
    )
};