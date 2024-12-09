import deliveryDetails from '../../data/deliveryDetails';

export default function useDeliveryCost(cartAmount) {
    const freeDeliveryThreshold = deliveryDetails.freeDeliveryThreshold;
    const deliveryPrice = deliveryDetails.deliveryPrice;
    const deliveryCost = ( cartAmount > freeDeliveryThreshold || cartAmount === freeDeliveryThreshold ) ? 0 : deliveryPrice;

    return deliveryCost;
}