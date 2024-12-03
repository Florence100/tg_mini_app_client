import useCartStatus from './useCartStatus';
import delivery from '../../data/delivery';

export default function useDeliveryCost() {
    const { totalAmount } = useCartStatus();
    const freeDeliveryThreshold = delivery.freeDeliveryThreshold;
    const deliveryPrice = delivery.deliveryPrice;
    const deliveryCost = ( totalAmount > freeDeliveryThreshold || totalAmount === freeDeliveryThreshold ) ? 0 : deliveryPrice;

    // console.log('deliveryCost', deliveryCost)

    return deliveryCost;
}