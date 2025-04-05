import { SERVER_URL } from 'consts/consts';
import processErrorResponse from 'helpers/processErrorResponse';

async function authorization(initData) {
    try {
        const response = await fetch(`${SERVER_URL}/user/auth`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `tma ${initData}`
            }
        })

        console.log('auth response:', response)

        if (!response.ok) {
            processErrorResponse(response);
            return;
        }

        const data = await response.json();
        return data;
    } catch (e) {
        console.error(e);
        return { error: e.message, status: e.status };
    }
}

export default authorization;