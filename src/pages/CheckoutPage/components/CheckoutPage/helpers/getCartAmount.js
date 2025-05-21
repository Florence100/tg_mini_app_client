export default function getCartAmount(cartProducts) {
    const cartAmount = cartProducts.reduce((sum, current) => {
        const count = current.count;
        const price = current.price;
        return sum + (count * price);
    }, 0);

    return cartAmount;
}