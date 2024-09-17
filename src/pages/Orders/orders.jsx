import { NavBar } from "../../components/NavBar/nav";
import "./dist/orders.css";
import { OrderCard } from "../../components/OrderCard/orderCard";
import { useGetOrdersQuery, useDeleteOrderMutation } from "../../store/ordersApi";
import { Loader } from "../../components/Loader/loader";
import { useLazyExportOrdersQuery } from "../../store/exportApi";
import { useState, useEffect } from "react";

export function OrdersPage() {
    const [selectedIds, setSelectedIds] = useState([]);
    const [isSelected, setIsSelected] = useState(false);

    const { data: orders = [], isLoading, error } = useGetOrdersQuery();
    const [deleteOrders] = useDeleteOrderMutation();
    const [triggerExport, { isLoading: exportLoading }] = useLazyExportOrdersQuery();

    useEffect(() => {
        console.log("Selected IDs:", selectedIds); // Logs selectedIds to monitor changes
    }, [selectedIds]);

    if (isLoading) {
        return <Loader />;
    }

    if (error) {
    }

    const handleClick = async () => {
        try {
            const result = await triggerExport(); // Trigger the query manually

            if (result.error) {
                console.error("Error exporting orders:", result.error);
            } else {
                console.log("Raw CSV Data:", result.data); // Log the raw CSV data

                const blob = new Blob([result.data], { type: "text/csv;charset=utf-8;" });
                const link = document.createElement("a");
                const url = URL.createObjectURL(blob);
                link.href = url;
                link.setAttribute("download", "Замовлення.csv"); // Set filename
                document.body.appendChild(link);
                link.click();
                document.body.removeChild(link);
            }
        } catch (err) {
            console.error("Error exporting orders:", err);
        }
    };

    const handleButtonClick = () => {
        setIsSelected(!isSelected);
    };

    const handleCheckboxChange = (event, id) => {
        const isChecked = event.target.checked;
        if (isChecked) {
            setSelectedIds(prevIds => [...prevIds, id]);
        } else {
            setSelectedIds(prevIds => prevIds.filter(ide => ide !== id));
        }
    };

    const Delete = async () => {
        try {
            if (selectedIds.length > 0) {
                await deleteOrders({id: selectedIds.join(',')});
                console.log(selectedIds.join(','))
                setSelectedIds([]);
            }
        } catch (e) {
            console.error(e);
        }
    };

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
                    <button className="select_btn" onClick={handleButtonClick}>
                        <img src="./img/Group 20574425.svg" alt="" />
                        Виділити замовлення
                    </button>
                    <button style={{ opacity: isSelected ? 1 : 0 }} onClick={Delete} className="delete">
                        <img src="./img/Delete (1).svg" alt="" />
                        Видалити виділене
                    </button>
                </div>
                <div className="table_order_section">
                    <div ></div>

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
                    <div className="export_btn" onClick={handleClick}>
                        <img src="/img/Export CSV.svg" alt="Export CSV" />
                    </div>
                </div>
                <div className="table">
                    {orders.orders ? (
                        orders.orders.map((order) => (
                            <OrderCard
                                handleCheckboxChange={handleCheckboxChange}
                                isSelected={isSelected}
                                key={order.id}
                                order={order}
                            />
                        ))
                    ) : (
                        <div>No orders available</div>
                    )}
                </div>
            </div>
        </div>
    );
}
