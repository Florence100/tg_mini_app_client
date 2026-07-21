# Telegram Mini App Client

The frontend component of a full-stack Telegram Mini App.  
The project is built using React, Redux, and the Telegram Web Apps API.  

The application enables users to order desserts directly within Telegram and communicates with the backend server via a REST API.

---

## Project Description

The mini-app allows the user to browse the dessert catalog, place orders, and interact with the interface without leaving Telegram.  
It features theme support, responsiveness, and proper integration with the Telegram Web Apps API.

---

## Technology stack

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

## Core functionality

- Product catalog display and filtering  
- Order placement and data transmission to the server  
- Integration with the Telegram WebApps API (initialization, user data, events)  
- Authorization and interaction with the backend REST API  
- Support for responsiveness and Telegram color themes  
- Display of notifications and states (loading, errors)

---

## Environment setup

HTTPS is required for the Mini App to function correctly.  
Example of a `.env` file:

```bash
REACT_APP_PUBLIC_URL=https://4mhfmdzg-3000.euw.devtunnels.ms
REACT_APP_SERVER_URL=https://4mhfmdzg-8001.euw.devtunnels.ms
```
---

## How to run the project:

```bash
# Clone the repository
git clone https://github.com/Florence100/tg_mini_app_client
cd tg_mini_app_client
```

# Install dependencies
npm install

# Create a .env file and fill in the data (see above).

# Run the project
npm run start

## Interface screenshots

Mini App Main Page:
![Home](https://github.com/Florence100/tg_mini_app_client/issues/15#issue-3494537986)

Placing an order:
![Order](https://github.com/Florence100/tg_mini_app_client/issues/16#issue-3494569027)

Admin panel:
![Admin panel](https://github.com/Florence100/tg_mini_app_client/issues/17#issue-3494575649)
