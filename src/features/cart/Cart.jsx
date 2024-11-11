import { useEffect, useState } from 'react';
import DOMPurify from 'dompurify';
import useTelegram from '../../common/hooks/useTelegram';
import useCartStatus from 'common/hooks/useCartStatus';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { clearCart } from './cartSlice';
import products from '../../data/data';
import './cart.css';

const serverUrl = process.env.REACT_APP_SERVER_URL;

function Cart() {
    const [comment, setComment] = useState('');
    const { tg } = useTelegram();
    const { isEmpty, productsList, totalAmount } = useCartStatus();
    const dispatch = useDispatch();
    const navigate = useNavigate();

    useEffect(() => {
        tg.BackButton.show();
        tg.BackButton.onClick(() => {
            navigate(-1);
        })
    })

    useEffect(() => {
        tg.onEvent('invoiceClosed', onInvoiceCloseHandler);
        
        return () => {
            tg.offEvent('invoiceClosed', onInvoiceCloseHandler);
        }
    })

    useEffect(() => {
        if (!isEmpty) {
            tg.MainButton
                .setParams({
                    color: '#31b545',
                    text: `Оплатить ${totalAmount} руб.`,
                    hasShineEffect: true
                })
                .show();
            tg.MainButton.onClick(onMainBtnClickHandler);
        }
        return () => {
            tg.MainButton.hide();
            tg.MainButton.offClick(onMainBtnClickHandler);
        };
    }, [isEmpty, comment])

    const openPaymentSystem = async () => {
        try {
            const response = await fetch(`${serverUrl}/create-invoice`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    productsList: productsList,
                    payload: {
                        comment: comment
                    }
                })
                // body: JSON.stringify(productsList),
            })
            
            const data = await response.json();
            tg.openInvoice(data.invoiceLink);
        } catch (error) {
            console.error(error);
            //Добавить навигацию на страницу ошибки
        }
    }

    const onMainBtnClickHandler = () => {
        openPaymentSystem();
    }

    const onInputChangeHandler = (event) => {
        console.log(event.target.value)
        const sanitizedValue = DOMPurify.sanitize(event.target.value);
        console.log(sanitizedValue)
        setComment(sanitizedValue);
    }

    const onEditHandler = () => {
        navigate('/');
    }

    const onInvoiceCloseHandler = (data) => {
        if (data.status === 'paid') {
            dispatch(clearCart());
            tg.close();
        }
    }

    return (
        <div className='cart'>
            <div className='cart-header'>
                <div className='header-order'>Ваш заказ</div>
                <div className='header-edit' onClick={ onEditHandler }>Изменить</div>
            </div>
            <div className='order'>
                {!isEmpty
                    ? productsList.map(function(item) {
                        //заменить обращением к БД!
                        const product = products.filter(function(product) {
                            return product.id === Number(item.id);
                        })[0]
                        //------------------------//
                        
                        return (
                            <div className='order-item' key={item.id}>
                                <img className='product-img' src={product.img} alt='Фото товара'></img>
                                <div className='container'>
                                    <div className='name'>{product.name}</div>
                                    <div className='count'> × {item.count}</div>
                                </div>
                                <div>
                                    <div className='price'>{(product.price * item.count).toFixed(2)} руб.</div>
                                </div>
                            </div>
                        )
                    })
                    : <div className='order-item'>В корзине нет товаров</div>
                }
            </div>
            {!isEmpty && 
                <div className='text-field-wrap'>
                    <textarea 
                        className='text-field' 
                        rows='1' 
                        placeholder='Комментарий к заказу'
                        onChange={onInputChangeHandler}
                    ></textarea>
                </div>
            }
        </div>
    )
}

export default Cart;