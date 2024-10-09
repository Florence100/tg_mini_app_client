import './ProductList.css';
import ProductItem from '../ProductItem/ProductItem';

const products = [
    {id: 1, title: 'Пирог', price: '2.99', composition: '', img: './img/Cake_148.png'},
    {id: 2, title: 'Бургер', price: '4.99', composition: '', img: './img/Burger_148.png'},
    {id: 3, title: 'Картофель фри', price: '1.49', composition: '', img: './img/Fries_148.png'},
    {id: 4, title: 'Хотдог', price: '3.49', composition: '', img: './img/Hotdog_148.png'},
    {id: 5, title: 'Тако', price: '3.99', composition: '', img: './img/Tako_148.png'},
    {id: 6, title: 'Пицца', price: '7.99', composition: '', img: './img/Pizza_148.png',},
    {id: 7, title: 'Пончик', price: '1.49', composition: '', img: './img/Donut_148.png'},
    {id: 8, title: 'Попкорн', price: '1.99', composition: '', img: './img/Popcorn_148.png'},
    {id: 9, title: 'Кола', price: '1.49', composition: '', img: './img/Coke_148.png'},
    {id: 10, title: 'Мороженое', price: '5.99', composition: '', img: './img/Icecream_148.png'},
    {id: 11, title: 'Печенье', price: '3.99', composition: '', img: './img/Cookie_148.png'},
    {id: 12, title: 'Флан', price: '7.99', composition: '', img: './img/Flan_148.png'}
]

function ProductList() {
    function onAdd(product) {
        alert(`Вы добавили ${product.title}`);
    }

    return (
        <div className="list">
            {
                products.map((item) => (
                    <ProductItem 
                        product={item}
                        onAdd={onAdd}
                        className={'item'}
                    />
                ))
            }
        </div>
    )
}

export default ProductList;