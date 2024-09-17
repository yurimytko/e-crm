import "./dist/client.css"
import { useState } from "react";

import { NavLink } from "react-router-dom";

import { useDeleteUserMutation } from "../../store/adminApi";

export function ClientCard({ user }) {


    const [deleteUser] = useDeleteUserMutation()

    const [isEditingName, setIsEditingName] = useState(false);
    const [isEditingPhone, setIsEditingPhone] = useState(false);
    const [isEditingEmail, setIsEditingEmail] = useState(false);
    const [isEditingCity, setIsEditingCity] = useState(false);


    const [name, setName] = useState(user.fullname);
    const [phone, setPhone] = useState(user.phone);
    const [email, setEmail] = useState(user.email);
    const [city, setCity] = useState('');


    const handleDoubleClickName = () => {
        setIsEditingName(true);
    };

    const handleDoubleClickPhone = () => {
        setIsEditingPhone(true);
    };
    const handleDoubleClickEmail = () => {
        setIsEditingEmail(true);
    };
    const handleDoubleClickCity = () => {
        setIsEditingCity(true);
    };


    const handleChangeName = (e) => {
        setName(e.target.value); // Оновлює артикул при зміні тексту
    };

    const handleChangePhone = (e) => {
        setPhone(e.target.value); // Оновлює назву продукту при зміні тексту
    };
    const handleChangeEmail = (e) => {
        setEmail(e.target.value); // Оновлює назву продукту при зміні тексту
    };
    const handleChangeCity = (e) => {
        setCity(e.target.value); // Directly store the input value as a string
    };


    const handleBlurName = () => {
        setIsEditingName(false); // Вимикає режим редагування артикулу при втраті фокусу
    };

    const handleBlurPhone = () => {
        setIsEditingPhone(false); // Вимикає режим редагування назви при втраті фокусу
    };

    const handleBlurEmail = () => {
        setIsEditingEmail(false); // Вимикає режим редагування назви при втраті фокусу
    };
    const handleBlurCity = () => {
        setIsEditingCity(false); // Вимикає режим редагування назви при втраті фокусу
    };


    const handleKeyPress = (e) => {
        if (e.key === 'Enter') {
            setIsEditingName(false);
            setIsEditingPhone(false);
            setIsEditingEmail(false);
            setIsEditingCity(false);



        }
    };



    const deleteUsers = async()=> {
        try{
            await deleteUser({id: user._id})
        }catch(e){
            console.log(e)
        }
    }

    return (
        <div className="card">
            <div className="table_info_c">001</div>
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
                <div className="table_info_c"  onDoubleClick={handleDoubleClickName}>
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
                <div className="table_info_c"  onDoubleClick={handleDoubleClickPhone}>
                    {phone}
                </div>
            )}
            {isEditingEmail ? (
                <input
                    type="text"
                    value={email}
                    onChange={handleChangeEmail}
                    onBlur={handleBlurEmail}
                    autoFocus
                    onKeyDown={handleKeyPress}
                />
            ) : (
                <div className="table_info_c"  onDoubleClick={handleDoubleClickEmail}>
                    {email}
                </div>
            )}
            <div className="table_info_c">{user.city}</div>
            <div className="table_info_c">001</div>
            <div className="user_control">
                <NavLink to={`${user._id}`}><img src="/img/More Info.svg" alt="" /></NavLink>
                <div className="sep_line"></div>
                <img src="/img/Delete.svg" onClick={deleteUsers} alt="" />
            </div>



        </div>
    )
}