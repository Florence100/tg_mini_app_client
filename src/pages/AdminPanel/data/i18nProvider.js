import polyglotI18nProvider from 'ra-i18n-polyglot';
import russianMessages from 'ra-language-russian';

const customMessages = {
  ...russianMessages,
  ra: {
    ...russianMessages.ra,
    message: {
      ...russianMessages.ra.message,
    //   are_you_sure: 'Вы уверены, что хотите удалить этот элемент?',
    },
    action: {
      ...russianMessages.ra.action,
      confirm: 'Удалить',
      cancel: 'Отмена',
    },
  },
};

const i18nProvider = polyglotI18nProvider(() => customMessages, 'ru');

export default i18nProvider;
