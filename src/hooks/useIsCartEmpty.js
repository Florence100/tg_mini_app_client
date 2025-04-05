import { useSelector } from 'react-redux';

function useIsCartEmpty() {
    const entities = useSelector(state => state.cart.entities);
    return Object.keys(entities).length > 0 
        ? false 
        : true;
}

export { useIsCartEmpty }