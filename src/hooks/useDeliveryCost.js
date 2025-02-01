const MIN_FREE_DELIVERY_AMOUNT = 5000;
const DELIVERY_PRICE = 500;

function useDeliveryCost(cartAmount) {
    if (cartAmount > MIN_FREE_DELIVERY_AMOUNT) {
        return 0;
    }
    return DELIVERY_PRICE;
}

export default useDeliveryCost;