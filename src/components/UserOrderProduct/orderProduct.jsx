import "./dist/orderProduct.css";

export function OrderProduct({ product }) {

    console.log(product);

    return (


        <div className="order_card_user">
            <div className="left_fav">
                <img className="fav_img" src={product.goodsId?.models[0].image[0].imageUrl} alt="" />
                <div className="fav_info">
                    <span className="order_article">
                        Артикул: {product.goodsId?.article}
                    </span>
                    <span className="order_name">{product.goodsId?.name}</span>
                </div>
                <span className="order_cnt">
                    &nbsp;&nbsp;&nbsp;&nbsp;{product?.quantity}x{" "}
                    {product.goodsId?.models[0].price}грн
                </span>
            </div>
            <div className="right_fav">
            </div>
        </div>
    );
}
