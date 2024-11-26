import { useEffect, useState } from 'react';
import useTelegram from '../../common/hooks/useTelegram';
import useCartStatus from 'common/hooks/useCartStatus';
import { useNavigate } from 'react-router-dom';
import { OrderForm } from 'common/components/OrderForm/OrderForm';
import products from '../../data/products';
import delivery from 'data/delivery';
import './cart.css';

function Cart() {
    const { tg, user } = useTelegram();
    const { isEmpty, productsList, totalAmount } = useCartStatus();
    const navigate = useNavigate();
    const [deliveryOption, setDeliveryOption] = useState('pickup');
    const [readyDate, setReadyDate] = useState(null);
    const [readyTime, setReadyTime] = useState(null);
    const [comment, setComment] = useState('');
    const serverUrl = `https://${process.env.REACT_APP_SERVER_URL}`;
    const freeDeliveryThreshold = delivery.freeDeliveryThreshold;
    const deliveryPrice = delivery.deliveryPrice;

    useEffect(() => {
        tg.BackButton.show();
        tg.BackButton.onClick(() => {
            navigate(-1);
        })
    })

    useEffect(() => {
        if (!isEmpty && deliveryOption && readyDate && readyTime ) {
            tg.MainButton
                .setParams({
                    color: '#31b545',
                    text: 
                        deliveryOption === 'delivery'
                            ? `Оплатить ${(totalAmount + deliveryCost()).toFixed(2)} руб.`
                            : `Оплатить ${totalAmount.toFixed(2)} руб.`,
                    hasShineEffect: true
                })
                .show();
            tg.MainButton.onClick(onMainBtnClickHandler);
        }
        return () => {
            tg.MainButton.hide();
            tg.MainButton.offClick(onMainBtnClickHandler);
        };
    }, [isEmpty, deliveryOption, readyDate, readyTime])

    const openPaymentSystem = async () => {
        // const userId = user?.id;
        // const sessionId = Date.now();
        // const callbackUrl = `${webUrl}/payment-callback?userId=${userId}&sessionId=${sessionId}`;

        try {
            const response = await fetch(`${serverUrl}/create-invoice`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    paymentPayload : {
                        productsList   : productsList,
                        deliveryOption : deliveryOption,
                        deliveryCost   : deliveryOption === 'delivery' ? deliveryCost() : 0,
                        readyDate      : readyDate,
                        readyTime      : readyTime.value,
                        comment        : comment
                    },
                    // callbackUrl: callbackUrl
                })
            })
            
            const data = await response.json();
            tg.openInvoice(data.invoiceLink);
        } catch (error) {
            console.error(error);
            //Добавить навигацию на страницу ошибки
        }
    }

    const deliveryCost = () => {
        return ( totalAmount > freeDeliveryThreshold || totalAmount === freeDeliveryThreshold ) ? 0 : deliveryPrice;
    }

    const onMainBtnClickHandler = () => {
        openPaymentSystem();
    }

    const onEditHandler = () => {
        navigate('/');
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
            {!isEmpty && deliveryOption === 'delivery' &&
                <div className='cart-delivery'>
                    <b>Доставка курьером</b>
                    <div>
                        {deliveryCost() ? `${deliveryCost().toFixed(2)} руб.` : 'Бесплатно'}
                    </div>
                </div>
            }
            {!isEmpty && 
                <div className='summary'>
                    <div className='summary-text'>Итого</div>
                    <div className='summary-amount'> 
                        { deliveryOption === 'delivery'
                            ? `${(totalAmount + deliveryCost()).toFixed(2)} руб.`
                            : `${totalAmount.toFixed(2)} руб.`
                        }
                    </div>
                </div>
            }
            {!isEmpty && 
                <OrderForm 
                    setDeliveryOption={setDeliveryOption}
                    setReadyDate={setReadyDate}
                    setReadyTime={setReadyTime}
                    setComment={setComment}
                    deliveryOption={deliveryOption}
                    readyDate={readyDate}
                    readyTime={readyTime}
                />
            }
        </div>
    )
}

export default Cart;