import { useSelector } from 'react-redux';
import CartHeader from '../CartHeader/CartHeader';
import Order from '../Order/Order';
import CartDelivery from '../CartDelivery/CartDelivery';
import CartSummary from '../CartSummary/CartSummary';
import useDeliveryCost from 'hooks/useDeliveryCost';
import { useIsCartEmpty, useCartItems, useCartAmount } from 'hooks/useCartStatus';
import { CSSTransition } from 'react-transition-group';
import './cart.css';


export default function Cart() {
    const deliveryOption = useSelector(state => state.form.delivery);
    const isCartEmpty = useIsCartEmpty();
    const cartItems = useCartItems();
    const cartAmount = useCartAmount();
    const deliveryCost = useDeliveryCost(cartAmount);

    return (
        <div className='cart'>
            <div className='cart-wrapper'>
                <CartHeader />
                <Order
                    isCartEmpty={isCartEmpty}
                    cartItems={cartItems}
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