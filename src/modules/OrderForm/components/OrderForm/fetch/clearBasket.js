import { SERVER_URL } from 'consts/consts';

async function clearBasket(initData) {
    try {
        const response = await fetch(`${SERVER_URL}/basket/clear`, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `tma ${initData}`
            },
        })
        return response;
    } catch (e) {
        throw new Error(e);
    }
}

export default clearBasket;