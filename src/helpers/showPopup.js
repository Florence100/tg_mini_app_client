function showAuthErrorPopup(tg, message) {
    tg?.HapticFeedback.notificationOccurred('error');
    tg.showPopup({
        message: message,
        buttons: [{
            text: 'Хорошо, давай',
            id: 'close'
        }]
    });

    tg.onEvent('popupClosed', (buttonId) => {
        if (buttonId.button_id === 'close') {
            tg.close();
        }
    })
}

function showWarningPopup(tg, message, buttonText='Хорошо, спасибо', id='') {
    tg?.HapticFeedback.notificationOccurred('warning');
    tg.showPopup({
        message: message,
        buttons: [{
            text: buttonText,
            id: id
        }]
    });
}

export { showAuthErrorPopup, showWarningPopup };