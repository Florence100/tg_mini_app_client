# Telegram Mini App Client

Frontend часть fullstack-приложения для Telegram Mini Apps.  
Проект реализован на React с использованием Redux и Telegram Web Apps API.  

Приложение предназначено для заказа десертов прямо в Telegram и взаимодействует с backend-сервером через REST API.

---

## Описание проекта

Мини-приложение позволяет пользователю просматривать каталог десертов, оформлять заказы и взаимодействовать с интерфейсом без выхода из Telegram.  
Реализованы темы, адаптивность и корректная работа с Telegram Web Apps API.

---

## Технологический стек

- React  
- Redux Toolkit  
- React Router DOM  
- React-admin  
- JavaScript (ES6+)  
- SCSS  
- Telegram Web Apps API  
- REST API  
- Vite  

---

## Основной функционал

- Отображение и фильтрация каталога товаров  
- Оформление заказов и передача данных на сервер  
- Интеграция с Telegram WebApps API (инициализация, user data, события)  
- Авторизация и взаимодействие с backend REST API  
- Поддержка адаптивности и цветовых тем Telegram  
- Отображение уведомлений и состояний (загрузка, ошибки)

---

## Настройка окружения

Для корректной работы Mini App требуется HTTPS.  
Пример `.env` файла:

```bash
REACT_APP_PUBLIC_URL=https://4mhfmdzg-3000.euw.devtunnels.ms
REACT_APP_SERVER_URL=https://4mhfmdzg-8001.euw.devtunnels.ms
```
---

## Как запустить проект

```bash
# Клонировать репозиторий
git clone https://github.com/Florence100/tg_mini_app_client
cd tg_mini_app_client
```

# Установить зависимости
npm install

# Создать .env и заполнить данные (см. выше)

# Запустить проект
npm run start

## Скриншоты интерфейса

Главная страница Mini App:
![Home](https://github.com/Florence100/tg_mini_app_client/issues/15#issue-3494537986)

Оформление заказа:
![Order](https://github.com/Florence100/tg_mini_app_client/issues/16#issue-3494569027)

Панель администратора:
![Admin panel](https://github.com/Florence100/tg_mini_app_client/issues/17#issue-3494575649)
