import { NavBar } from "../../components/NavBar/nav";
import "./dist/orders.css";
import { OrderCard } from "../../components/OrderCard/orderCard";
import { useGetOrdersQuery } from "../../store/ordersApi";

export function OrdersPage() {
    const { data: orders = [], isLoading, error } = useGetOrdersQuery();

    if (isLoading) {
        return <div>Loading...</div>;
    }

    if (error) {
        return <div>Error loading orders: {error.message}</div>;
    }

    return (
        <div className="orders_page">
            <NavBar />
            <div className="table_part">
                <div className="page_title">Список замовлень</div>
                <div className="control_panel">
                    <div className="add_order">
                        <img src="./img/plus.png" alt="" />
                        <p className="btn_text">Створити замовлення</p>
                    </div>
                    <div className="filter_order">
                        <img src="./img/Filter.svg" alt="" />
                        <p className="btn_text">Фільтр замовлень</p>
                    </div>
                </div>
                <div className="table_order_section">
                    <div className="table_titles">HT</div>
                    <div className="table_titles">Дата створення</div>
                    <div className="table_titles">ПІБ</div>
                    <div className="table_titles">Телефон</div>
                    <div className="table_titles">Доставка</div>
                    <div className="table_titles">Місто</div>
                    <div className="table_titles">Відділення</div>
                    <div className="table_titles">Оплата</div>
                    <div className="table_titles">Тип оплати</div>
                    <div className="table_titles">Коментар до замовлення</div>
                    <div className="table_titles">Коментар від менеджера</div>
                    <div className="table_titles">Статус</div>
                    
                </div>
                <div className="table">
                    {orders.orders.map((order) => (
                        <OrderCard key={order.id} order={order} />
                    ))}
                </div>
            </div>
        </div>
    );
}
