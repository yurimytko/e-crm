import "./dist/orderCard.css";
import { useState } from "react";
import { useDeleteOrderMutation, usePutOrderMutation } from "../../store/ordersApi";

export function OrderCard({ order, isSelected, handleCheckboxChange }) {

    const [isEditingName, setIsEditingName] = useState(false);
    const [isEditingPhone, setIsEditingPhone] = useState(false);
    const [isEditingCity, setIsEditingCity] = useState(false);



    const [name, setName] = useState(order.fullname);
    const [phone, setPhone] = useState(order.phone);
    const [city, setCity] = useState(order.city);




    const [deleteOrder] = useDeleteOrderMutation();
    const [putOrder] = usePutOrderMutation();
    const formattedDate = new Date(order.createdAt).toLocaleDateString('uk-UA');

    const handleDeleteOrder = async () => {
        try {
            await deleteOrder({ id: order._id });
        } catch (e) {
            console.error(e);
        }
    };

    const handleDoubleClickName = () => {
        setIsEditingName(true); // Activate editing mode
    };

    const handleChangeName = (e) => {
        setName(e.target.value); // Update name on text change
    };

    const handleBlurName = () => {
        setIsEditingName(false); // Deactivate editing mode on blur
    };

    const handleDoubleClickPhone = () => {
        setIsEditingPhone(true); // Activate editing mode
    };

    const handleChangePhone = (e) => {
        setPhone(e.target.value); // Update name on text change
    };

    const handleBlurPhone = () => {
        setIsEditingPhone(false); // Deactivate editing mode on blur
    };

    const handleDoubleClickCity = () => {
        setIsEditingCity(true); // Activate editing mode
    };

    const handleChangeCity = (e) => {
        setCity(e.target.value); // Update name on text change
    };

    const handleBlurCity = () => {
        setIsEditingCity(false); // Deactivate editing mode on blur
    };

    const handleKeyPress = async (e) => {
        if (e.key === 'Enter') {
            setIsEditingName(false); // Deactivate editing mode on Enter
            setIsEditingPhone(false);
            setIsEditingCity(false) // Deactivate editing mode on Enter


            try {
                const card = {
                    id: order._id,
                    fullname: name,
                    phone: phone,
                    city: city,


                };
                await putOrder(card);
            } catch (e) {
                console.error(e);
            }
        }
    };

    return (
        <div className="order_card">
            <div style={{ opacity: isSelected ? 1 : 0 }} className="delete_check">
                <input onChange={(event) => handleCheckboxChange(event, order._id)} type="checkbox" />
            </div>
            <div className="table_info_o" id="id">1001</div>
            <div className="table_info_o">{formattedDate}</div>
            {isEditingName ? (
                <input
                    type="text"
                    value={name}
                    onChange={handleChangeName}
                    onBlur={handleBlurName}
                    autoFocus
                    onKeyDown={handleKeyPress}
                />
            ) : (
                <div className="table_info" onDoubleClick={handleDoubleClickName}>
                    {name}
                </div>
            )}
            {isEditingPhone ? (
                <input
                    type="text"
                    value={phone}
                    onChange={handleChangePhone}
                    onBlur={handleBlurPhone}
                    autoFocus
                    onKeyDown={handleKeyPress}
                />
            ) : (
                <div className="table_info" onDoubleClick={handleDoubleClickPhone}>
                    {phone}
                </div>
            )}
            <div className="table_info_o">{order.deliveryType}</div>
            {isEditingCity ? (
                <input
                    type="text"
                    value={city}
                    onChange={handleChangeCity}
                    onBlur={handleBlurCity}
                    autoFocus
                    onKeyDown={handleKeyPress}
                />
            ) : (
                <div className="table_info" onDoubleClick={handleDoubleClickCity}>
                    {city}
                </div>
            )}
            <div className="table_info_o">{order.address}</div>
            <div className="table_info_o">{order.payment}</div>
            <div className="table_info_o">1001</div>
            <div className="table_info_o">{order.customerComment}</div>
            <div className="table_info_o">1001</div>
            <div className="table_info_o">{order.status}</div>
            <div className="card_control_order">
                <img src="./img/Edit.svg" alt="" />
                <div className="sep_line"></div>
                <img src="./img/Delete.svg" onClick={handleDeleteOrder} alt="" />
            </div>
        </div>
    );
}
