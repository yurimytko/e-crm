import { useParams } from "react-router-dom";
import { AddSub } from "../../components/AddSubSection/adSub";
import { NavBar } from "../../components/NavBar/nav"
import "./dist/subSection.css"
import { useNavigate } from "react-router-dom";
import { useGetSectionQuery } from "../../store";
import { useState } from "react";

import { SubCard } from "../../components/SubSectionCard/subCard";

import PutCategory from "../../components/PutCatalog/putCatalog";

export function SubSection() {
    const navigator = useNavigate()

    const { catalogId } = useParams()

    const { data, isLoading, error } = useGetSectionQuery({ id: catalogId })

    const [catalog, setCatalog] = useState()


    console.log(data?.section.subSections)


    const openAddMenu = () => {
        document.getElementById("add_sub").style.display = "flex"


        setTimeout(() => {

            document.getElementById("add_sub").style.opacity = "1"



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
        <div className="sub_section_page">
            <NavBar />
            <div className="sub_con">
                <div>
                    <div className="page_title"><span style={{ cursor: "pointer" }} onClick={() => { navigator(-1) }}> <img src="/img/Group 53.svg" alt="" /> Назад</span> |Підкатегорія</div>
                </div>

                <div className="sub_section_con">
                    <div onClick={openAddMenu} className="add_catalog">
                        <img src="/img/додати.svg" alt="" />
                    </div>
                    {!isLoading && data?.section.subSections && data.section.subSections.length > 0 ? (
                        data.section.subSections.map((sections) => (
                            <SubCard onClick = {openPutMenu} key={sections._id} product={sections} index={data.section.subSections.indexOf(sections)} />
                        ))
                    ) : (
                        !isLoading && <div className="no_products">Немає доступних продуктів</div>
                    )}
                </div>
            </div>


            <PutCategory catalog = {catalog}/>  
            <AddSub id={catalogId} />
        </div>
    )
}