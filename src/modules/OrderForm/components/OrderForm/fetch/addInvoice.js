import { SERVER_URL } from 'consts/consts';

async function createInvoice(payload) {
    console.log('payload: ', payload)
    const response = await fetch(`${SERVER_URL}/invoice/add`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            paymentPayload : payload,
        })
    })

    return response;
}

export default createInvoice;