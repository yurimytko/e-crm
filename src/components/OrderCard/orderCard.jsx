import "./dist/orderCard.css";
import { useState } from "react";
import { useDeleteOrderMutation, usePutOrderMutation } from "../../store/ordersApi";
import { useNavigate } from "react-router-dom";
export function OrderCard({ order, isSelected, handleCheckboxChange, handleEditClick }) {

    const navigator = useNavigate()

    const [isEditingName, setIsEditingName] = useState(false);
    const [isEditingPhone, setIsEditingPhone] = useState(false);
    const [isEditingCity, setIsEditingCity] = useState(false);
    const [isEditingcomment, setIsEdittingComment] = useState(false);
    const [isEditingAddress, setIsEditingAddress] = useState(false);

    const [name, setName] = useState(order.fullname);
    const [phone, setPhone] = useState(order.phone);
    const [city, setCity] = useState(order.city);
    const [comment, setComment] = useState(order.managerComment);
    const [address, setAddress] = useState(order.address)
    const [selectedDeliveryType, setSelectedDeliveryType] = useState(null);

    const [menuVisible, setMenuVisible] = useState(false);

    const handleClick = () => {
        setMenuVisible(!menuVisible);
    };


    const updateDelivery = async (deliveryType) => {

        const requestPayload = deliveryType === 'Нова пошта' ? 'NP' : 'UKRP';

        try {
            await putOrder({ id: order._id, deliveryType: requestPayload });
        } catch (e) {

        }
    }

    const handleMenuItemClick = (deliveryType) => {
        setSelectedDeliveryType(deliveryType);
        setMenuVisible(false);
        updateDelivery(deliveryType);
    };



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

    const handleDoubleClickAddress = () => {
        setIsEditingAddress(true); // Activate editing mode
    };

    const handleChangeAddress = (e) => {
        setAddress(e.target.value); // Update name on text change
    };

    const handleBlurAddress = () => {
        setIsEditingAddress(false); // Deactivate editing mode on blur
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


    const handleDoubleClickComment = () => {
        setIsEdittingComment(true); // Activate editing mode
    };

    const handleChangeComment = (e) => {
        setComment(e.target.value); // Update name on text change
    };

    const handleBlurComment = () => {
        setIsEdittingComment(false); // Deactivate editing mode on blur
    };

    const handleKeyPress = async (e) => {
        if (e.key === 'Enter') {
            setIsEditingName(false); // Deactivate editing mode on Enter
            setIsEditingPhone(false);
            setIsEditingCity(false) // Deactivate editing mode on Enter
            setIsEdittingComment(false) // Deactivate editing mode on Enter
            setIsEditingAddress(false)



            try {
                const card = {
                    id: order._id,
                    fullname: name,
                    phone: phone,
                    city: city,
                    managerComment: comment,
                    address: address,


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
                <div className="table_info_o" onDoubleClick={handleDoubleClickName}>
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
                <div className="table_info_o" onDoubleClick={handleDoubleClickPhone}>
                    {phone}
                </div>
            )}

            <div className="table_info_o" onClick={handleClick}>
                {order.deliveryType === 'NP' ? 'Нова пошта' : 'Укр пошта'}
                {menuVisible && (
                    <div className="dropdown_menu">
                        <span onClick={() => handleMenuItemClick('Нова пошта')}>Нова пошта</span>
                        <span onClick={() => handleMenuItemClick('Укр пошта')}>Укр пошта</span>
                    </div>
                )}
            </div>

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
                <div className="table_info_o" onDoubleClick={handleDoubleClickCity}>
                    {city}
                </div>
            )}
            {isEditingAddress ? (
                <input
                    type="text"
                    value={address}
                    onChange={handleChangeAddress}
                    onBlur={handleBlurAddress}
                    autoFocus
                    onKeyDown={handleKeyPress}
                />
            ) : (
                <div className="table_info_o" onDoubleClick={handleDoubleClickAddress}>
                    {address}
                </div>
            )}
            <div className="table_info_o">
                {order.payment ? 'Успішна' : 'Відсутня'}
            </div>
            <div className="table_info_o">1001</div>
            <div className="table_info_o">{order.customerComment}</div>
            {isEditingcomment ? (
                <input
                    type="text"
                    value={comment}
                    onChange={handleChangeComment}
                    onBlur={handleBlurComment}
                    autoFocus
                    onKeyDown={handleKeyPress}
                />
            ) : (
                <div className="table_info_o" onDoubleClick={handleDoubleClickComment}>
                    {order.managerComment ? order.managerComment : '—'}
                </div>
            )}


            {/* <div className="table_info_o">
                {order.managerComment ? order.managerComment : '—'}
            </div> */}
            <div className="table_info_o">{order.status}</div>
            <div className="con_con_con">
                <div className="card_control_order">
                    <img onClick={() => { handleEditClick(order) }} src="./img/Edit.svg" alt="" />
                    <div className="sep_line"></div>
                    <img src="/img/More Info.svg" alt="" onClick={() => navigator(`/order?id=${order._id}`)} />

                    <div className="sep_line"></div>
                    <img src="./img/Delete.svg" onClick={handleDeleteOrder} alt="" />
                </div>
            </div>
        </div>
    );
}
