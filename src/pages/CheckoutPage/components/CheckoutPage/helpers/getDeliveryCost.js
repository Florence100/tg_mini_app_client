const MIN_FREE_DELIVERY_AMOUNT = 500000; //в копейках
const DELIVERY_PRICE = 50000; //в копейках

export default function getDeliveryCost(cartAmount) {
    if (cartAmount > MIN_FREE_DELIVERY_AMOUNT || cartAmount === MIN_FREE_DELIVERY_AMOUNT) {
        return 0;
    }
    return DELIVERY_PRICE;
}