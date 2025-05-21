import { useRecordContext } from 'react-admin';

export const DeliveryStatusField = ({ source }) => {
    const record = useRecordContext();

    return (
        <div>{ record.delivery === 'pickup' ? 'Самовывоз' : 'Доставка' }</div>
    );
};