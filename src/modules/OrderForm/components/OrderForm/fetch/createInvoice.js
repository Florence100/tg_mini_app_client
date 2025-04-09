import { SERVER_URL } from 'consts/consts';
import processErrorResponse from 'helpers/processErrorResponse';

async function createInvoice(initData, orderId) {
    try {
        const response = await fetch(`${SERVER_URL}/invoice/create`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `tma ${initData}`
            },
            body: JSON.stringify({
                orderId: orderId,
            })
        });

        if (!response.ok) {
            const error = await processErrorResponse(response);
            throw error;
        }

        return response.json();
    } catch (e) {
        return { error: e.message, status: e.status };
    }
   
}

export default createInvoice;