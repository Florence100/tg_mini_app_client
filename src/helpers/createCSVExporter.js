import jsonExport from 'jsonexport/dist';
import { SERVER_URL } from 'consts/consts';


export const createCSVExporter = ({ user, initData, notify, fileName }) => (records) => {
    jsonExport(records, { rowDelimiter: ';' }, async (err, csv) => {
        if (err) {
            console.error('Export error:', err);
            return;
        }

        if (!user) {
            notify('Ошибка: не найден пользователь Telegram', { type: 'error' });
            return;
        }

        const utf8BOM = '\uFEFF';
        const blob = new Blob([utf8BOM + csv], { type: 'text/csv;charset=utf-8;' });
        const formData = new FormData();
        formData.append('userId', user.id);
        const date = new Date();
        formData.append('document', blob, `${fileName}_${date.getDate()}.${date.getMonth()}.${date.getFullYear()}.csv`);

        try {
            const res = await fetch(`${SERVER_URL}/document/send`, {
                method: 'POST',
                body: formData,
                headers: {
                    'Authorization': `tma ${initData}`,
                }
            });

            if (!res.ok) {
                const errText = await res.text();
                throw new Error(errText);
            }

            notify('CSV отправлен в Telegram', { type: 'success' });
        } catch (e) {
            console.error(e);
            notify('Ошибка при отправке CSV: ' + e.message, { type: 'error' });
        }
    });
};
