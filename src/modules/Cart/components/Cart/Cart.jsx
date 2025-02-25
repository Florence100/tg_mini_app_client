import { useSelector } from 'react-redux';
import CartHeader from '../CartHeader/CartHeader';
import Order from '../Order/Order';
import CartDelivery from '../CartDelivery/CartDelivery';
import CartSummary from '../CartSummary/CartSummary';
import { useIsCartEmpty } from 'hooks/useIsCartEmpty';
import { CSSTransition } from 'react-transition-group';
import './cart.css';


export default function Cart({ cartProducts, deliveryCost, cartAmount }) {
    const deliveryOption = useSelector(state => state.form.delivery);
    const isCartEmpty = useIsCartEmpty();

    return (
        <div className='cart'>
            <div className='cart-wrapper'>
                <CartHeader />
                <Order
                    isCartEmpty={isCartEmpty}
                    cartProducts={cartProducts}
                />
                <CSSTransition 
                    in={!isCartEmpty && deliveryOption === 'delivery'}
                    timeout={125}
                    classNames='cart-delivery'
                    unmountOnExit
                >
                    <CartDelivery deliveryCost={deliveryCost} />
                </CSSTransition>
                { !isCartEmpty && 
                    <CartSummary
                        cartAmount={cartAmount}
                        deliveryCost={deliveryCost}
                    />
                }
            </div>
        </div>
    )
}