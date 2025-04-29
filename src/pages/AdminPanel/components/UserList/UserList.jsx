import { Datagrid, DateField, List, TextField } from 'react-admin';

export const UserList = () => (
    <List 
        sort={{ field: 'created_at', order: 'DESC' }}
        title="Пользователи"
    >
        <Datagrid>
            <TextField source="id" />
            <TextField source="first_name" />
            <TextField source="user_name" />
            <TextField source="last_name" />
            <TextField source="photo_url" />
            <DateField source="created_at" />
        </Datagrid>
    </List>
);