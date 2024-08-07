import React from "react";

import { NavLink } from "react-router-dom";

import "./dist/nav.css"

export function NavBar(){
    return(
        <div className="nav_bar">
            <img className="logo" src="./img/a_logo.svg" alt="" />
            <NavLink className="links" activeClassName ="active" to="/">Список замовлень</NavLink>
            <NavLink className="links" activeClassName ="active" to="/products">Список товарів</NavLink>
            <NavLink className="links" activeClassName ="active" to='/catalog'>Каталог</NavLink>
            <div className="links">Список клієнтів</div>
            <div className="links">Сторінка блогу</div>
        </div>
    )
}