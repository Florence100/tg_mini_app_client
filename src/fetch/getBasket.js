import { SERVER_URL } from 'consts/consts';
import processErrorResponse from 'helpers/processErrorResponse';

async function getBasket(initData) {
    try {
        const response = await fetch(`${SERVER_URL}/basket/getBasket`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `tma ${initData}`
            }
        })

        if (!response.ok) {
            const error = await processErrorResponse(response);
            throw error;
        }

        const data = await response.json();
        return data;
    } catch (e) {
        return { error: e.message, status: e.status };
    }
}

export default getBasket;