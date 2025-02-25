import { SERVER_URL } from 'consts/consts';

async function addProduct(initData, productId) {
    try {
        const response = await fetch(`${SERVER_URL}/basket/add`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `tma ${initData}`
            },
            body: JSON.stringify({
                productId : productId,
                count : 1
            })
        })

        return response.json();
    } catch (e) {
        console.log(e)
        return new Error(e);
    }
}

export default addProduct;