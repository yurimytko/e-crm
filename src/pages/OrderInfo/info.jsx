import "./dist/info.css"
import { useSearchParams, useNavigate } from "react-router-dom";
import { NavBar } from "../../components/NavBar/nav";
import { useGetOrderQuery } from "../../store/ordersApi";
import { Loader } from "../../components/Loader/loader";
import { UserOrder } from "../../components/UserOrderCard/userOrder";
import { OrderProduct } from "../../components/UserOrderProduct/orderProduct";


export function OrderInfoPage() {
    const navigator = useNavigate()

    const [searchParams] = useSearchParams();
    const orderId = searchParams.get("id");

    const { data, isLoading, isError } = useGetOrderQuery({ id: orderId });

    const order = data?.order;
    if (order) {
        console.log(order)

    }



    const formData = new Date(order?.createdAt).toLocaleDateString()


    return (
        <div className="order_info_page">
            <NavBar />
            <div className="user_right">
                <div className="back_link">
                    <span style={{ cursor: "pointer" }} onClick={() => navigator(-1)}><img src="/img/Group 53.svg" alt="" /> Замовлення</span>
                    <div className="sep_line_link"></div>
                    <span>Детальніше</span>
                </div>
                <div className="about_user">
                    {order ? (
                        <>
                            <div className="info_user_con">
                                <span className="info_user_span">ПІБ: {order.fullname}</span>
                            </div>
                            <div className="info_user_con">
                                <span className="info_user_span">Телефон: {order.phone}</span>
                                <span className="info_user_span">Місто: {order.city}</span>
                            </div>
                        </>
                    ) : (
                        <Loader />
                    )}
                </div>
                <div className="user_order_con">


                    <div className="parent_user">
                        <div className="div1 grid_title_column">нз</div>
                        <div className="div2 grid_title_column">Дата створення</div>
                        <div className="div3 grid_title_column">Доставка</div>
                        <div className="div4 grid_title_column">Місто</div>
                        <div className="div5 grid_title_column">Відділення</div>
                        <div className="div6 grid_title_column">Оплата</div>
                        <div className="div7 grid_title_column">Тип оплати</div>
                        <div className="div8 grid_title_column">Коментар від менеджера</div>
                        <div className="div9 grid_title_column">Коментар до замовлення</div>
                        <div className="div10">Виконано</div>
                        <div className="div11 grid_info_column">{formData}</div>

                        <div className="div122  comments_column">
                            qwrqw
                        </div>
                        <div className="div13 comments_column">{order?.city}</div>
                        <div className="div14 comments_column"> {order?.address}</div>
                        <div className="div15 grid_info_column">
                            {order?.payment ? 'Успішна' : 'Відсутня'}


                        </div>
                        <div className="div16 grid_info_column">Переказ
                        на картку</div>
                        <div className="div17 grid_info_column">123</div>
                        <div className="div18 orders_info">
                            {order?.localStorage.map((product, index) => (
                                <OrderProduct key={index} product={product} />
                            ))}
                        </div>
                        <div className="div19 price">
                            <span>Разом</span>
                            <span>{order?.cost} грн</span></div>
                        <div className="div20 grid_info_column">
                            {order?.managerComment}
                        </div>
                        <div className="div21 grid_info_column">{order?.customerComment}</div>
                    </div>
                </div>
            </div>
        </div>
    )

}


