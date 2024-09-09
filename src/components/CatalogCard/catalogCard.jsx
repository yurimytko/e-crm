import React from "react"


import "./dist/catalogCard.css"


export function CatalogCard(props){


    return(
        <div className="catalog_card">
            <img src="./img/catalog.svg" alt="" />
            <p className="card_name">{props.product?.name}</p>
        </div>
    )
}