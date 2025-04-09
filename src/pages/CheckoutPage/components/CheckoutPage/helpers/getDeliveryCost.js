const MIN_FREE_DELIVERY_AMOUNT = 5000;
const DELIVERY_PRICE = 500;

export default function getDeliveryCost(cartAmount) {
    if (cartAmount > MIN_FREE_DELIVERY_AMOUNT || cartAmount === MIN_FREE_DELIVERY_AMOUNT) {
        return 0;
    }
    return DELIVERY_PRICE;
}