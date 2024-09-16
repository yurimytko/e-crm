import "./dist/orderCard.css"

export function OrderCard({order}){


    const formattedDate = new Date(order.createdAt).toLocaleDateString('uk-UA');

    return(
        <div className="order_card">
            <div className="table_info_o" id="id" >1001</div>
            <div className="table_info_o" >{formattedDate}</div>
            <div className="table_info_o" >{order.fullname}</div>
            <div className="table_info_o" >{order.phone}</div>
            <div className="table_info_o" >{order.deliveryType}</div>
            <div className="table_info_o" >{order.city}</div>
            <div className="table_info_o" >{order.address}</div>
            <div className="table_info_o" >{order.payment}</div>
            <div className="table_info_o" >1001</div>
            <div className="table_info_o" >{order.customerComment}</div>
            <div className="table_info_o" >1001</div>
            <div className="table_info_o" >{order.status}</div>
            <div className="card_control_order">
                <img src="./img/Edit.svg" alt="" />
                <div className="sep_line"></div>
                <img src="./img/Delete.svg" alt=""/>

            </div>

        </div>
    )
}