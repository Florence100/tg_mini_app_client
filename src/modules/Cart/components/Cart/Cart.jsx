import { useRef } from 'react';
import { useSelector } from 'react-redux';
import CartHeader from '../CartHeader/CartHeader';
import CartItems from '../CartItems/CartItems';
import CartDelivery from '../CartDelivery/CartDelivery';
import CartSummary from '../CartSummary/CartSummary';
import { useIsCartEmpty } from 'hooks/useIsCartEmpty';
import { CSSTransition } from 'react-transition-group';
import './cart.css';


export default function Cart({ cartProducts, deliveryCost, cartAmount }) {
    const deliveryOption = useSelector(state => state.form.delivery);
    const isCartEmpty = useIsCartEmpty();
    const nodeRef = useRef(null);

    return (
        <div className='cart'>
            <div className='cart-wrapper'>
                <CartHeader />
                <CartItems
                    isCartEmpty={isCartEmpty}
                    cartProducts={cartProducts}
                />
                <CSSTransition 
                    nodeRef={nodeRef}
                    in={!isCartEmpty && deliveryOption === 'delivery'}
                    timeout={125}
                    classNames='cart-delivery'
                    unmountOnExit
                >
                    <CartDelivery 
                        nodeRef={nodeRef}
                        deliveryCost={deliveryCost} 
                    />
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