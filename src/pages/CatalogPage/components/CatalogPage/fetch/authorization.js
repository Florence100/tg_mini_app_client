import { SERVER_URL } from 'consts/consts';

async function authorization(initData) {
    const response = await fetch(`${SERVER_URL}/user/auth`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `tma ${initData}`
        }
    })

    const data = await response.json();
    return data;
}

export default authorization;