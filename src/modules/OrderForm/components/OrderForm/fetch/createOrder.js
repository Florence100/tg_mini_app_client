import { SERVER_URL } from 'consts/consts';
import processErrorResponse from 'helpers/processErrorResponse';

async function createOrder(initData, payload) {
    try {
        const response = await fetch(`${SERVER_URL}/order/create`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `tma ${initData}`
            },
            body: JSON.stringify({
                deliveryOption : payload.deliveryOption,
                deliveryCost   : payload.deliveryCost,
                readyDate      : payload.readyDate,
                readyTime      : payload.readyTime,
                address        : payload.address,
                comment        : payload.comment,
                cartItems      : payload.cartItems
            })
        })

        if (!response.ok) {
            const error = await processErrorResponse(response);
            throw error;
        }

        return response.json();
    } catch (e) {
        return { error: e.message, status: e.status };
    }
}

export default createOrder;