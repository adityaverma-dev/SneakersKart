import React from "react";
import { rednerCardImage } from "utils/tools";

const CardDetail = ({products, removeItem}) => {
    const renderItems = () => (
        products ? 
            products.map((product, index) => {
                // Debug: Log the image URL to check if it's correct
                const imageUrl = rednerCardImage(product.images);
                console.log('Image URL:', imageUrl);
                
                return (
                    <div className="user_product_block" key={`${product._id}${index}`}>
                        <div className="Item">
                            <div className="image"
                                style= {{
                                    background: `url("${imageUrl}") no-repeat center center`,
                                }}
                            >

                            </div>
                        </div>
                        <div className="item">
                            <h4>Product name</h4>
                            <div>
                                {product.brand.name} {product.model}
                            </div>
                        </div>
                        <div className="item">
                            <h4>Price</h4>
                            <div>
                                ${product.price}
                            </div>
                        </div>
                        <div className="item btn">
                            <div className="cart_remove_btn" onClick={() => removeItem(index)}>
                                Remove
                            </div>
                        </div>
                    </div>
                );
            })
        : null
    );

    return (
        <div>
            {renderItems()}
        </div>
    );
};

export default CardDetail;