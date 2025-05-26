import { useRecordContext } from 'react-admin';
import { Link } from '@mui/material';

export const FullUrlField = ({ source }) => {
    const record = useRecordContext();

    return (
        <Link href={`https://t.me/${record.user_name}`} >{record.user_name}</Link>
    );
};