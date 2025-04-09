const tg = window.Telegram.WebApp;

export default function useTelegram() {
    tg.setHeaderColor(tg.themeParams.bg_color);
    tg.MainButton.color = '#6A244D';

    return {
        tg,
        initData: tg.initData,
        user: tg.initDataUnsafe?.user,
        queryId: tg.initDataUnsafe?.query_id,
        chatId: tg.initDataUnsafe?.chat?.id,
        theme: tg.colorScheme
    }
}