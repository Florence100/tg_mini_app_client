import { SERVER_URL } from 'consts/consts';

async function getProducts() {
    const response = await fetch(`${SERVER_URL}/product`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
        }
    })

    const data = await response.json();
    return data;
}

export default getProducts;