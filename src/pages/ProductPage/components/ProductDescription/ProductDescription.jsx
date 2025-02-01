import { PUBLIC_URL } from 'consts/consts';
import './productDescription.css';


export default function ProductDescr({ product }) {
    // const product = props.product;
    return (
        <div className='product-descr'>
            <img className='img' src={`${PUBLIC_URL}/${product.img}`} alt='Фото товара'></img>
            <div className='name'>{product.name}</div>
            <div className='price'>{product.price} руб.</div>
            <div className='description'>{product.description}</div>
            <div className='info'>
                <div className='weight'>
                    <div>Вес:</div>
                    <div>{product.weight}</div>
                </div>
                <div className='proteins'>
                    <div>Белки:</div>
                    <div>{product.nutritional.proteins} г.</div>
                </div>
                <div className='fats'>
                    <div>Жиры:</div>
                    <div>{product.nutritional.fats} г.</div>
                </div>
                <div className='carbohydrates'>
                    <div>Углеводы:</div>
                    <div>{product.nutritional.carbohydrates} г.</div>
                </div>
                <div className='calorie'>
                    <div>Энергетическая ценность:</div>
                    <div>{product.nutritional.calorie} ккал.</div>
                </div>
            </div>
        </div>
    )
}