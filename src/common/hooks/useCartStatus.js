import { useSelector } from 'react-redux';

const getProductsList = (entities) => {
    return Object.values(entities).map(item => ({
        id: item.id,
        count: item.count,
        price: item.price,
        name: item.name
    }));
};

const getTotalAmount = (productsList) => {
    const totalAmount = productsList.reduce((currentSum, currentNumber) => {
        return currentSum + ( currentNumber.count * currentNumber.price );
    }, 0)
    
    return +totalAmount.toFixed(2);
}

export default function useCartStatus() {
    const entities = useSelector(state => state.cart.entities);
    const isEmpty = Object.keys(entities).length > 0 ? false : true;
    const productsList = getProductsList(entities);
    const totalAmount = getTotalAmount(productsList);

    return {
        isEmpty,
        productsList,
        totalAmount
    }
}