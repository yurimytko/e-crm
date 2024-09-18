import "./dist/orderProduct.css";

export function OrderProduct({ product }) {

    console.log(product);

    return (


        <div className="order_card_user">
            <div className="left_fav">
                <img className="fav_img" src="/img/image 13.svg" alt="" />
                <div className="fav_info">
                    <span className="order_article">
                        Артикул: {product.goodsId?.article}
                    </span>
                    <span className="order_name">{product.goodsId?.name}</span>
                </div>
                <span className="order_cnt">
                    &nbsp;&nbsp;&nbsp;&nbsp;{product?.quantity}x{" "}
                    {product.goodsId?.price}грн
                </span>
            </div>
            <div className="right_fav">
            </div>
        </div>
    );
}
