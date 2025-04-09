import { showAuthErrorPopup, showWarningPopup } from 'helpers/showPopup';

export default function handleApiResponse(data, tg) {
    const status = data.status;
    const message = data.error;
    if (status === 401 || status === 403) {
        showAuthErrorPopup(tg, message);
    } else {
        showWarningPopup(tg, message);
    }
}