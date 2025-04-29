import { Link } from 'react-router-dom';
import ProductControl from 'components/ProductControl/ProductControl';
import { SERVER_URL } from 'consts/consts';
import './productCard.css';


export default function ProductCard({ product }) {
    const images = product.images.map((image) => image.src);

    return (
        <div className='product-card'>
            <div className='content'>
                <Link to={`/card/${product.id}`}>
                    <img 
                        className='img' 
                        src={`${SERVER_URL}${images[0]}`} 
                        alt={product.name} 
                        loading='lazy'
                    />
                </Link>
                <div className='name'>{product.name}</div>
                <div className='price'><span>&#8381;</span>{product.price}</div>
            </div>
            <ProductControl product={product} className={'catalog-product-control'}/>
        </div>
    )
}