import { SERVER_URL } from 'consts/consts';

async function getProducts(initData) {
    try {
        const response = await fetch(`${SERVER_URL}/product`, {
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

export default getProducts;