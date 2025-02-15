import React, { useState } from "react";

import "./dist/catalog.css"
import { NavBar } from "../../components/NavBar/nav";
import { CatalogCard } from "../../components/CatalogCard/catalogCard";


import { useGetSectionsQuery } from "../../store";
import AddCategory from "../../components/AddCategory/addCat";
import { Loader } from "../../components/Loader/loader";

import PutCategory from "../../components/PutCatalog/putCatalog";

export function Catalog() {
    const { data = [], isLoading } = useGetSectionsQuery()

    const [catalog, setCatalog] = useState()

    console.log(data.sections)



    const openAddMenu = () => {
        document.getElementById("add_category").style.display = "flex"


        setTimeout(() => {

            document.getElementById("add_category").style.opacity = "1"



        }, 100);
    }

        const openPutMenu = (e, product) => {
            e.stopPropagation();
            e.preventDefault();
            setCatalog(product)
            document.getElementById("put_category").style.display = "flex"
    
            console.log("OUR PRODUCT", product)
    
            setTimeout(() => {
    
                document.getElementById("put_category").style.opacity = "1"
    
    
    
            }, 100);
        }
    

    return (
        <div className="catalog_page">
            <NavBar />
            <div className="catalog_right">
                <div className="page_title">Каталог</div>
                <div className="catalog_table">
                    <div onClick={openAddMenu} className="add_catalog">
                        <img src="./img/додати.svg" alt="" />
                    </div>
                    {isLoading && <Loader/>}
                    {!isLoading && data.sections && data.sections.length > 0 ? (
                        data.sections.map((sections) => (
                            <CatalogCard onClick = {openPutMenu} key={sections._id} product={sections} index={data.sections.indexOf(sections)} />
                        ))
                    ) : (
                        !isLoading && <div className="no_products">Немає доступних продуктів</div>
                    )}







                </div>
            </div>
            <PutCategory catalog = {catalog}/>
            
            <AddCategory />
        </div>
    )
}