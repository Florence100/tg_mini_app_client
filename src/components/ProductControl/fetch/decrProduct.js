import { SERVER_URL } from 'consts/consts';

async function decrProduct(initData, productId) {
    try {
        const response = await fetch(`${SERVER_URL}/basket/decr`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `tma ${initData}`
            },
            body: JSON.stringify({
                productId : productId,
            })
        })

        return response.json();
    } catch (e) {
        throw new Error(e);
    }
}

export default decrProduct;