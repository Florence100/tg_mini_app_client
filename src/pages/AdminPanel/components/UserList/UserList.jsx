import { 
    Datagrid, 
    DateField, 
    List, 
    TextField, 
    DateInput, 
    SearchInput,
    useNotify
} from 'react-admin';
import { useMediaQuery } from '@mui/material';
import { UserFilterSidebar } from '../UserFilterSidebar/UserFilterSidebar';
import { createCSVExporter } from 'helpers/createCSVExporter';
import useTelegram from 'hooks/useTelegram';

const userFilters = [
    <SearchInput source='q' alwaysOn placeholder='Поиск...' />,
    <DateInput source='created_at_gte' label='Создан с' />,
    <DateInput source='created_at_lte' label='Создан по' />,
];

export const UserList = () => {
    const isSmall = useMediaQuery((theme) => theme.breakpoints.down('sm'));
    const { initData, user } = useTelegram();
    const notify = useNotify();

    const fileName = 'users';
    const exporter = createCSVExporter({ user, initData, notify, fileName });

    return(
        <List 
            title='Пользователи'
            filters={isSmall ? userFilters : undefined}
            aside={isSmall ? null : <UserFilterSidebar />}
            exporter={ exporter }
        >
            <Datagrid 
                bulkActionButtons={false}
                sx={ isSmall && {'& td, & th': { padding: '6px 8px' }}}
            >
                <TextField source='id' label='TG id' />
                { !isSmall && <TextField source='user_name' label='Никнейм' emptyText='—' /> }
                <TextField source='first_name' label='Имя' />
                <DateField source='created_at' label='Дата создания' />
            </Datagrid>
        </List>
    )
};