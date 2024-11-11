const tg = window.Telegram.WebApp;

export default function useTelegram() {
    return {
        tg,
        user: tg.initDataUnsafe?.user,
        queryId: tg.initDataUnsafe?.query_id,
    }
}