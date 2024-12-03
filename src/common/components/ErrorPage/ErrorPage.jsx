import './errorPage.css';
import { useRouteError } from 'react-router-dom';

export default function ErrorPage() {
    const error = useRouteError();
    console.error(error);

    return (
        <div className="error-page">
            <h1>Вот незадача!</h1>
            <p>Страница не найдена. Попробуйте еще</p>
            <p>
                <i>{error.statusText || error.message}</i>
            </p>
        </div>
    );
}
