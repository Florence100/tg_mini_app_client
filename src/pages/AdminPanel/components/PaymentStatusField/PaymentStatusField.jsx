import { useRecordContext } from 'react-admin';

export const PaymentStatusField = () => {
    const record = useRecordContext();
    let color;
    let text;

    switch (record.status) {
        case 'pending':
            text = 'Ожидание';
            color = '#FFA500';
            break;
        case 'failed': 
            text = 'Ошибка';
            color = '#FF0000';
            break;
        case 'cancelled':
            text = 'Отменен';
            color = '#808080';
            break;
        case 'paid':
            text = 'Оплачен';
            color = '#008000';
            break;
        default:
            break;
    }

    return (
        <div 
            style={{
                backgroundColor: color, 
                color: 'white', 
                maxWidth: '150px', 
                borderRadius: '15px',
                textAlign: 'center',
                boxSizing: 'border-box',
                padding: '2px 5px'
            }}
        >
            {text}
        </div>
    );
};