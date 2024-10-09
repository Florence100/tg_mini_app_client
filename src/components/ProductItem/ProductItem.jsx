import "./ProductItem.css";
import Button from "../Button/Button";

function ProductItem({product, className, onAdd}) {
    const onAddHandler = () => {
        onAdd(product);
    }

    return (
        <div className={"product " + className}>
            <div>
                <img className="product-img" src={product.img} alt="product photo"></img>
                <div className="title">{product.title}</div>
                <div className="price">${product.price}</div>
            </div>
            <Button className="add-btn" onClick={onAddHandler}>Добавить</Button>
        </div>
    )
}

export default ProductItem;