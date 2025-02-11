import { SERVER_URL } from 'consts/consts';
import './productDescription.css';


export default function ProductDescr({ product }) {
    return (
        <div className='product-descr'>
            <img className='img' src={`${SERVER_URL}${product.img_path}`} alt='Фото товара'></img>
            <div className='name'>{product.name}</div>
            <div className='price'>{product.price.toFixed(2)} руб.</div>
            <div className='description'>{product.description}</div>
            <div className='info'>
                <div className='weight'>
                    <div>Вес:</div>
                    <div>{product.weight}</div>
                </div>
                <div className='proteins'>
                    <div>Белки:</div>
                    <div>{product.proteins.toFixed(2)} г.</div>
                </div>
                <div className='fats'>
                    <div>Жиры:</div>
                    <div>{product.fats.toFixed(2)} г.</div>
                </div>
                <div className='carbohydrates'>
                    <div>Углеводы:</div>
                    <div>{product.carbohydrates.toFixed(2)} г.</div>
                </div>
                <div className='calorie'>
                    <div>Энергетическая ценность:</div>
                    <div>{product.calorie.toFixed(2)} ккал.</div>
                </div>
            </div>
        </div>
    )
}