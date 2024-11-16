import React from "react"


import "./dist/subCard.css"
import { NavLink } from "react-router-dom"
import { useDeleteSubSectionMutation } from "../../store"


export function SubCard(props){


    const [deleteCat] = useDeleteSubSectionMutation()
    

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
        <NavLink to={`${props.product?._id}`}  className="catalog_card">
            <img onClick={Delete} className="delete_img_catalog" src="/img/Delete.svg" alt="" />
            <img src={props.product.image[0]} alt="" />
            <p className="card_name">{props.product?.name}</p>
        </NavLink>
    )
}