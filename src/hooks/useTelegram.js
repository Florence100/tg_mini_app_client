const tg = window.Telegram.WebApp;

export default function useTelegram() {
    return {
        tg,
        initData: tg.initData,
        user: tg.initDataUnsafe?.user,
        queryId: tg.initDataUnsafe?.query_id,
        chatId: tg.initDataUnsafe?.chat?.id
    }
}