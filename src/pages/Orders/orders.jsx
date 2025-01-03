import { NavBar } from "../../components/NavBar/nav";
import "./dist/orders.css";
import { OrderCard } from "../../components/OrderCard/orderCard";
import { useGetOrdersQuery, useDeleteOrderMutation } from "../../store/ordersApi";
import { Loader } from "../../components/Loader/loader";
import { useLazyExportOrdersQuery, useLazyExportOrdersByIdQuery } from "../../store/exportApi";
import { useState, useEffect } from "react";
import { UpdateOrder } from "../../components/UpdateOrder/upOrder";

export function OrdersPage() {
    const [selectedIds, setSelectedIds] = useState([]);
    const [isSelected, setIsSelected] = useState(false);

    const [selectedOrder, setSelectedOrder] = useState(null);

    const { data: orders = [], isLoading, error } = useGetOrdersQuery();
    const [deleteOrders] = useDeleteOrderMutation();
    const [triggerExport, { isLoading: exportLoading }] = useLazyExportOrdersQuery();
    const [triggerExportById] = useLazyExportOrdersByIdQuery()

    useEffect(() => {
        console.log(selectedOrder)
    }, [selectedOrder])

    useEffect(() => {
        console.log("Selected IDs:", selectedIds); // Logs selectedIds to monitor changes
    }, [selectedIds]);




    const handleClick = async () => {
        try {
            let result;
            if (isSelected && selectedIds.length > 0) {
                result = await triggerExportById({ id: selectedIds.join(',') }); // Export by selected IDs
            } else {
                result = await triggerExport(); // Export without specific IDs
            }

            if (result.error) {
                console.error("Error exporting product:", result.error);
            } else {
                console.log("Raw CSV Data:", result.data);

                const blob = new Blob([result.data], { type: 'text/csv;charset=utf-8;' });

                const link = document.createElement('a');
                const url = URL.createObjectURL(blob);
                link.href = url;
                link.setAttribute('download', 'Замовлення.csv');
                document.body.appendChild(link);
                link.click();
                document.body.removeChild(link);
            }
        } catch (err) {
            console.error("Error exporting product:", err);
        }
    };

    const handleButtonClick = () => {
        setIsSelected(!isSelected);
        if (isSelected === false) {
            setSelectedIds([])
        }
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
                await deleteOrders({ id: selectedIds.join(',') });
                console.log(selectedIds.join(','))
                setSelectedIds([]);
            }
        } catch (e) {
            console.error(e);
        }
    };


    const handleEditClick = (order) => {
        setSelectedOrder(order);
        const menuElement = document.getElementById("update_order");
        menuElement.style.display = "flex";

        setTimeout(() => {
            menuElement.style.opacity = "1";

        }, 300);
    };


    return (
        <div className="orders_page">
            <NavBar />
            <div className="table_part">
                <div className="page_title">Список замовлень</div>
                <div className="control_panel order_p">
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

                <div className="table">
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
                    {isLoading && <Loader />}
                    {orders.orders ? (
                        orders.orders.map((order) => (
                            <OrderCard
                                handleCheckboxChange={handleCheckboxChange}
                                isSelected={isSelected}
                                key={order.id}
                                order={order}
                                handleEditClick={handleEditClick}
                            />
                        ))
                    ) : (
                        <div>No orders available</div>
                    )}
                </div>
            </div>
            <UpdateOrder order={selectedOrder} />
        </div>
    );
}
