import { useState, useEffect } from 'react';
import './dist/upOrder.css';


import { usePutOrderMutation } from "../../store/ordersApi";


export function UpdateOrder({ order }) {
    const [name, setName] = useState('');
    const [phone, setPhone] = useState('');
    const [city, setCity] = useState('');
    const [deliveryType, setDeliveryType] = useState('')
    const [address, setAddress] = useState('')
    const [manager, setManager] = useState('')


    const [putOrder] = usePutOrderMutation();



    useEffect(() => {
        if (order) {
            setName(order.fullname);
            setPhone(order.phone);
            setCity(order.city)
            setAddress(order.address)
            setManager(order.managerComment)

        }
    }, [order]);

    const closeAddMenu = () => {
        const menuElement = document.getElementById("update_order");
        menuElement.style.opacity = "0";
        setTimeout(() => {
            menuElement.style.display = "none";
            setManager("")

        }, 300);
    };


    const handleDeliveryChange = (e) => {
        setDeliveryType(e.target.value); // Update delivery type when radio input changes
    };


    const handleKeyPress = async (e) => {

        try {
            const card = {
                id: order?._id,
                fullname: name,
                phone: phone,
                city: city,
                deliveryType: deliveryType,
                address: address,
                managerComment: manager


            };
            await putOrder(card);
            closeAddMenu()
        } catch (e) {
            console.error(e);
        }
    };

    return (
        <div id='update_order' className='update_order'>
            <div className="update_modal">
                <img onClick={closeAddMenu} className='close_up_order' src="/img/close_menu.svg" alt="" />
                <div className="left_part_up_order">
                    <p className="setting_up">Редагування замовлення</p>
                    <input
                        className="up_input"
                        type="text"
                        placeholder="ПІБ"
                        name="name"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                    />
                    <input
                        className="up_input"
                        type="text"
                        placeholder="Телефон"
                        name="phone"
                        value={phone}
                        onChange={(e) => setPhone(e.target.value)}

                    />
                    <input
                        className="up_input"
                        type="text"
                        placeholder="Місто"
                        name="city"
                        value={city}
                        onChange={(e) => setCity(e.target.value)}

                    />

                    <p className="setting_up">Доставка</p>
                    <div className="radio-buttons">
                        <label className="radio-button">
                            <input
                                type="radio"
                                name="delivery"
                                value="NP"
                                checked={deliveryType === 'NP'}
                                onChange={handleDeliveryChange}
                            />
                            <div className="radio-circle"></div>
                            <span className="radio-label">Нова пошта</span>
                        </label>
                        <label className="radio-button">
                            <input
                                type="radio"
                                name="delivery"
                                value="UKRP"
                                checked={deliveryType === 'UKRP'}
                                onChange={handleDeliveryChange}
                            />
                            <div className="radio-circle"></div>
                            <span className="radio-label">Укр пошта</span>
                        </label>
                    </div>
                    <input
                        className="up_input"
                        type="text"
                        placeholder="Місто"
                        name="city"
                        value={address}
                        onChange={(e) => setAddress(e.target.value)}

                    />

                    <p className="setting_up">Тип оплати</p>
                    <div className="radio-buttons">
                        <label className="radio-button">
                            <input
                                type="radio"
                                name="paymentType"
                                value="cash"
                            />
                            <div className="radio-circle"></div>
                            <span className="radio-label">Переказ</span>
                        </label>
                        <label className="radio-button">
                            <input
                                type="radio"
                                name="paymentType"
                                value="card"
                            />
                            <div className="radio-circle"></div>
                            <span className="radio-label">Екваєрінг</span>
                        </label>
                    </div>

                    <p className="setting_up">Статус оплати</p>
                    <div className="radio-buttons">
                        <label className="radio-button">
                            <input
                                type="radio"
                                name="paymentStatus"
                                value="paid"
                            />
                            <div className="radio-circle"></div>
                            <span className="radio-label">Завершено</span>
                        </label>
                        <label className="radio-button">
                            <input
                                type="radio"
                                name="paymentStatus"
                                value="unpaid"
                            />
                            <div className="radio-circle"></div>
                            <span className="radio-label">Скасовано</span>
                        </label>
                    </div>


                </div>
                <div className="right_part_up_order">
                    <p className="setting_up">Коментар менеджера</p>
                    <textarea
                        className="text_area_order"
                        placeholder="Коментар..."
                        name="description"
                        value={manager}
                        onChange={(e) => { setManager(e.target.value) }}
                    ></textarea>
                    <div className="btn_update_con">
                        <button onClick={handleKeyPress} className='update_btn_order'>Оновити</button>
                    </div>
                </div>
            </div>
        </div>
    );
}
