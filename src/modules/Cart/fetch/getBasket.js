import { SERVER_URL } from 'consts/consts';

async function getBasket(initData) {
    try {
        const response = await fetch(`${SERVER_URL}/basket/getBasket`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `tma ${initData}`
            }
        })

        const data = await response.json();
        return data;
    } catch (e) {
        console.log(e)
        return new Error(e);
    }
}

export default getBasket;