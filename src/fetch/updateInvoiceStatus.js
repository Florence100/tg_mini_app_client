import { SERVER_URL } from 'consts/consts';

async function updateInvoiceStatus(initData, slug, status) {
    try {
        await fetch(`${SERVER_URL}/invoice/update`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `tma ${initData}`
            },
            body: JSON.stringify({
                slug: slug,
                status: status,
            })
        })
    } catch (e) {
        throw new Error(e);
    }
}

export default updateInvoiceStatus;