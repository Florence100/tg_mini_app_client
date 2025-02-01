import { useNavigate } from 'react-router-dom';
import Header from 'UI/Header/Header';
import './cartHeader.css';


export default function CartHeader() {
    const navigate = useNavigate();

    const handleEditClick = () => {
        navigate('/');
    }

    return (
        <div className='cart-header'>
            <Header text='Ваш заказ' />
            <div className='header-edit' onClick={handleEditClick}>Изменить</div>
        </div>
    )
}