import { useRecordContext, NumberField } from 'react-admin';
import formatMoney from 'helpers/formatMoney';

export const CastomMoneyField = ({source}) => {
    const record = useRecordContext();
    const amount = record[source];
    const formattedAmount = formatMoney(amount);

    return (
        <NumberField 
            source='total_amount' 
            record={{ total_amount: formattedAmount }}
            options={{ style: 'currency', currency: 'RUB' }}
        />
    );
}