import { SERVER_URL } from 'consts/consts';

async function deleteInvoice(slug, status, chatId, user, initData) {
    try {
        await fetch(`${SERVER_URL}/invoice/delete`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `tma ${initData}`
            },
            body: JSON.stringify({
                slug: slug,
                status: status,
                chatId: chatId ? chatId : user?.id,
            })
        })
        console.log('delete invoice');
    } catch (error) {
        console.error(error);
    }
}

export default deleteInvoice;