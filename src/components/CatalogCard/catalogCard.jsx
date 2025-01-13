import React from "react"


import "./dist/catalogCard.css"
import { NavLink } from "react-router-dom"
import { useDeleteSectionMutation } from "../../store"
import PutCategory from "../PutCatalog/putCatalog"

export function CatalogCard({product, onClick}) {


    const [deleteCat, { data, isloading, error }] = useDeleteSectionMutation()


    const Delete = async (e) => {
        e.stopPropagation();
        e.preventDefault();
        try {
            await deleteCat({ id: product._id })
        } catch (e) {
            console.error(e)
        }



    }

    console.log(product.image)




    return (
        <NavLink to={`${product?._id}`} className="catalog_card">
            <div className="delete_img_catalog" style={{display:"flex", gap: "0.4vw"}}>
                <img onClick={Delete} src="/img/Delete.svg" alt="" />
                <img onClick={(e) => {onClick(e, product)}} src="./img/Edit.svg" alt="Edit Product" />
            </div>
            <img src={product?.image[0].imageUrl} className="catalog_img" alt="" />
            <p className="card_name">{product?.name}</p>

        </NavLink>
    )
}