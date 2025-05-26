import { useRecordContext } from 'react-admin';
import { BooleanField } from 'react-admin';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import CancelIcon from '@mui/icons-material/Cancel';


export const ProductStatusField = () => {
    const record = useRecordContext();

    return (
        <BooleanField 
            source='actually'  
            valueLabelTrue='В наличии'
            valueLabelFalse='Нет в наличии'
            TrueIcon={CheckCircleIcon} 
            FalseIcon={CancelIcon} 
            sx={{
                color: record.actually ? '#37c65c' : 'var(--tg-theme-destructive-text-color)'
            }}
        />
    )
}