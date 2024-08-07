import React from "react";

import "./dist/catalog.css"
import { NavBar } from "../../components/NavBar/nav";
import { CatalogCard } from "../../components/CatalogCard/catalogCard";


import { useGetSectionsQuery } from "../../store";

export function Catalog(){
    const {data =[], isLoading} = useGetSectionsQuery()

    console.log(data)



    return(
        <div className="catalog_page">
            <NavBar/>
            <div className="catalog_right">
                <div className="page_title">Каталог</div>
                <div className="control_panel">
                    +
                </div>
                <div className="catalog_table">
                    <CatalogCard data = {data}/>
                    <CatalogCard data = {data}/>
                    <CatalogCard data = {data}/>
                    <CatalogCard data = {data}/>


                    <div className="add_catalog">
                        +
                    </div>




                </div>
            </div>
        </div>
    )
}