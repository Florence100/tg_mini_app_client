import { useRecordContext } from 'react-admin';

export const OrderStatusField = () => {
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
        case 'preparing':
            text = 'Готовится';
            color = '#FFD700';
            break;
        case 'ready for pickup':
            text = 'Готов к самовывозу';
            color = '#1E90FF';
            break;
        case 'ready for delivery':
            text = 'Готов к доставке';
            color = '#1E90FF';
            break;
        case 'picked up':
            text = 'Забран';
            color = '#32CD32';
            break;
        case 'delivered':
            text = 'Доставлен';
            color = '#32CD32';
            break;
        case 'delivering now':
            text = 'Доставка';
            color = '#00BFFF';
            break;
        case 'returned':
            text = 'Возвращен';
            color = '#DC143C';
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