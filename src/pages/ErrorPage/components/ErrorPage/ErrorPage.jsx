import { useRouteError } from 'react-router-dom';
import { useEffect } from 'react';
import useTelegram from 'hooks/useTelegram';
import { useNavigate } from 'react-router-dom';
import './errorPage.css';


export default function ErrorPage() {
    const error = useRouteError();
    const { tg } = useTelegram();
    const navigate = useNavigate();

    useEffect(() => {
        function handleBackBtnClick () {
            navigate('/');
        }

        tg.BackButton.show();
        tg.BackButton.onClick(handleBackBtnClick);

        return () => {
            tg.BackButton.hide();
            tg.BackButton.offClick(handleBackBtnClick);
        }
    }, [tg, navigate]);

    return (
        <div className='error-page'>
            <h1>Вот незадача!</h1>
            <p>Страница не найдена. Попробуйте еще</p>
            <p>
                <i>{error.statusText || error.message}</i>
            </p>
        </div>
    );
}
