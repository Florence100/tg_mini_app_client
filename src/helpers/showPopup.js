function showAuthErrorPopup(tg, message) {
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

function showWarningPopup(tg, message) {
    tg.showPopup({
        message: message,
        buttons: [{
            text: 'Хорошо, спасибо'
        }]
    });
}

export { showAuthErrorPopup, showWarningPopup };