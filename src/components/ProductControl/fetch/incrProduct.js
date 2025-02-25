import { SERVER_URL } from 'consts/consts';

async function incrProduct(initData, productId) {
    try {
        const response = await fetch(`${SERVER_URL}/basket/incr`, {
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
        console.log(e.message);
        return new Error(e);
    }
}

export default incrProduct;