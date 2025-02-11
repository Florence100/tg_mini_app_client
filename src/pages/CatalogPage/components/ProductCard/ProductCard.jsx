import { Link } from 'react-router-dom';
import ProductControl from 'components/ProductControl/ProductControl';
import './productCard.css';
import { SERVER_URL } from 'consts/consts';


export default function ProductCard({ product }) {
    return (
        <div className='product-card'>
            <Link to={`/card/${product.id}`}>
                <img className='img' src={`${SERVER_URL}${product.img_path}`} alt={product.name} />
            </Link>
            <div className='name'>{product.name}</div>
            <div className='price'>{product.price.toFixed(2)} руб.</div>
            <ProductControl product={product} className={'catalog-product-control'}/>
        </div>
    )
}