import { SERVER_URL } from 'consts/consts';

async function getOneProduct(id) {
    const response = await fetch(`${SERVER_URL}/product/${id}`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
        }
    })

    const data = await response.json();
    return data;
}

export default getOneProduct;