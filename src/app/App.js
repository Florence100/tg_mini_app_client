import { useEffect } from 'react';
import { Outlet } from 'react-router-dom';
import useTelegram from '../common/hooks/useTelegram';
import './app.css';

function App() {
    const { tg } = useTelegram();
    tg.BackButton.hide();

    useEffect(() => {
        tg.ready();
    }, [])

    return (
        <div className='App'>
            <Outlet />
        </div>
    );
}

export default App;
