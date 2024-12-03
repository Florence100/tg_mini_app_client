import './productCounter.css';

function ProductCounter({count, className}) {
    return (
        <div className={'counter ' + className}>
            {count}
        </div>
    )
}

export default ProductCounter;