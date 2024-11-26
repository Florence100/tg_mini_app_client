import { useEffect } from 'react';
import { Outlet } from 'react-router-dom';
import useTelegram from '../common/hooks/useTelegram';
import './App.css';

function App() {
    const serverUrl = `https://${process.env.REACT_APP_SERVER_URL}`;
    const { tg, chatId } = useTelegram();
    tg.BackButton.hide();

    useEffect(() => {
        tg.ready();
    }, [])

    useEffect(() => {
        const eventSource = new EventSource(`${serverUrl}/sse-endpoint`);
        console.log('eventSource:', eventSource)

        eventSource.addEventListener('paymentSuccess', (event) => {
            console.log('paymentSuccess');
            const data = JSON.parse(event.data);
            if (data.chatId === chatId) {
                tg.close();
            }
        });

        return () => {
            eventSource.close();
        };
    }, [])

    // const onInvoiceCloseHandler = (data) => {
    //     console.log('------------------invoice closed!------------------')
    //     if (data.status === 'paid') {
    //         tg.close();
    //     }
    // };

    // useEffect(() => {
    //     console.log('------------------useEffect start working!------------------')
    //     tg.onEvent('invoiceClosed', onInvoiceCloseHandler);
      
    //     return () => {
    //         console.log('------------------useEffect stop working!------------------')
    //         tg.offEvent('invoiceClosed', onInvoiceCloseHandler);
    //     };
    // }, [])


    return (
        <div className='App'>
            <Outlet />
        </div>
    );
}

export default App;
