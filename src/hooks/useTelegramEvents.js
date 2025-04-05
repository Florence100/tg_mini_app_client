import { useEffect, useCallback } from 'react';
import updateInvoiceStatus from 'fetch/updateInvoiceStatus';
import clearBasket from 'fetch/clearBasket';
import useTelegram from 'hooks/useTelegram';


const useTelegramEvents = () => {
    const { tg, initData } = useTelegram();

    const onInvoiceCloseHandler = useCallback((eventType, eventData) => {
        if (eventType !== 'invoice_closed') return;

        const { slug, status } = eventData;

        if (status === 'failed' || status === 'cancelled') {
            updateInvoiceStatus(initData, slug, status);
        }
        if (status === 'paid') {
            console.log('Successful payment. Mini app is closing');
            updateInvoiceStatus(initData, slug, status)
                .then(() => {
                    clearBasket(initData).then(() => tg.close());
                })
        }
    }, [initData, tg]);

    const wrapReceiveEvent = useCallback((originalFunction) => (eventType, eventData) => {
        switch (eventType) {
            case 'invoice_closed':
                onInvoiceCloseHandler(eventType, eventData);
                break;
            default:
                break;
        }
        if (originalFunction) {
            originalFunction(eventType, eventData);
        }
    }, [onInvoiceCloseHandler]);

    useEffect(() => {
        const updateReceiveEvent = (source) => {
            if (source) {
                const originalReceiveEvent = source.receiveEvent;
                source.receiveEvent = wrapReceiveEvent(originalReceiveEvent);
                return originalReceiveEvent;
            }
        };

        const restoreReceiveEvent = (source, originalReceiveEvent) => {
            if (source) {
                source.receiveEvent = originalReceiveEvent;
            }
        };

        const originalReceiveEventGameProxy = updateReceiveEvent(window.TelegramGameProxy);
        const originalReceiveEventWebView = updateReceiveEvent(window.Telegram?.WebView);
        const originalReceiveEventGameProxyAlt = updateReceiveEvent(window.TelegramGameProxy_receiveEvent);

        return () => {
            restoreReceiveEvent(window.TelegramGameProxy, originalReceiveEventGameProxy);
            restoreReceiveEvent(window.Telegram?.WebView, originalReceiveEventWebView);
            restoreReceiveEvent(window.TelegramGameProxy_receiveEvent, originalReceiveEventGameProxyAlt);
        };
    }, [wrapReceiveEvent]);
};

export default useTelegramEvents;
