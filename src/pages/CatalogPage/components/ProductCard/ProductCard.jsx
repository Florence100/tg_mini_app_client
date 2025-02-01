import { Link } from 'react-router-dom';
import ProductControl from 'components/ProductControl/ProductControl';
import './productCard.css';


export default function ProductCard({ product }) {
    return (
        <div className='product-card'>
            <Link to={`/card/${product.id}`}>
                <img className='img' src={product.img} alt='Фото товара'></img>
            </Link>
            <div className='name'>{product.name}</div>
            <div className='price'>{product.price.toFixed(2)} руб.</div>
            <ProductControl product={product} className={'catalog-product-control'}/>
        </div>
    )
}