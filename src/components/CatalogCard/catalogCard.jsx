import React from "react"


import "./dist/catalogCard.css"
import { NavLink } from "react-router-dom"
import { useDeleteSectionMutation } from "../../store"

export function CatalogCard(props){


    const [deleteCat,{data,isloading,error}] = useDeleteSectionMutation()
    

    const Delete = async(e) => {
        e.stopPropagation(); 
        e.preventDefault();
        try{
            await deleteCat({id: props.product._id})
        } catch(e){
            console.error(e)
        }

        

    }


    return(
        <NavLink  className="catalog_card">
            <img onClick={Delete} className="delete_img_catalog" src="/img/Delete.svg" alt="" />
            <img src="./img/catalog.svg" alt="" />
            <p className="card_name">{props.product?.name}</p>
        </NavLink>
    )
}