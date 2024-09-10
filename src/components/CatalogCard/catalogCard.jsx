import React from "react"


import "./dist/catalogCard.css"
import { NavLink } from "react-router-dom"


export function CatalogCard(props){

    


    return(
        <NavLink to={`${props.product._id}`} className="catalog_card">
            <img className="delete_img_catalog" src="/img/Delete.svg" alt="" />
            <img src="./img/catalog.svg" alt="" />
            <p className="card_name">{props.product?.name}</p>
        </NavLink>
    )
}