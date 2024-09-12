import React from "react";

import { NavLink } from "react-router-dom";

import "./dist/nav.css"

export function NavBar(){
    return(
        <div className="nav_bar">
            <img className="logo" src="/img/a_logo.svg" alt="" />
            <NavLink className="links" activeClassName ="active" to="/">Список замовлень</NavLink>
            <NavLink className="links" activeClassName ="active" to="/products">Список товарів</NavLink>
            <NavLink to={'/blog'} activeClassName ="active" className="links">Сторінка блогу</NavLink>

            <NavLink className="links" activeClassName ="active" to='/catalog'>Каталог</NavLink>
            <NavLink className="links" activeClassName ="active" to ='/clients'>Список клієнтів</NavLink>
            <NavLink className="links" activeClassName ="active" to ='/sign-in'>Увійти</NavLink>

        </div>
    )
}