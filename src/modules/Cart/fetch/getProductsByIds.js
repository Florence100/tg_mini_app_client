import { SERVER_URL } from 'consts/consts';

export default async function getProductsByIds(initData, params) {
    try {
        const response = await fetch(`${SERVER_URL}/product/products?${params}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `tma ${initData}`
            }
        });

        const data = await response.json();
        return data;
    } catch (e) {
        return new Error('Ошибка при получении данных');
    }
};



