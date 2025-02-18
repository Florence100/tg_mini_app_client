import { SERVER_URL } from 'consts/consts';

async function addInvoice(payload, initData) {
    console.log('initData: ', initData);
    try {
        const response = await fetch(`${SERVER_URL}/invoice/add`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `tma ${initData}`
            },
            body: JSON.stringify({
                paymentPayload : payload,
            })
        })
        return response;
    } catch (e) {
        throw new Error(e);
    }
}

export default addInvoice;