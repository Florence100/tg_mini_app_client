import { SERVER_URL } from 'consts/consts';

async function getOneProduct(id, initData) {
    const response = await fetch(`${SERVER_URL}/product/${id}`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `tma ${initData}`
        }
    })

    const data = await response.json();
    return data;
}

export default getOneProduct;