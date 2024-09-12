import { useParams } from "react-router-dom";
import { AddSub } from "../../components/AddSubSection/adSub";
import { NavBar } from "../../components/NavBar/nav"
import "./dist/subSection.css"

import { useGetSubSectionQuery } from "../../store";

import { CatalogCard } from "../../components/CatalogCard/catalogCard";


export function SubSection() {

    const { catalogId } = useParams()

    const { data, isLoading, error } = useGetSubSectionQuery()


    console.log(data)


    const openAddMenu = () => {
        document.getElementById("add_sub").style.display = "flex"


        setTimeout(() => {

            document.getElementById("add_sub").style.opacity = "1"



        }, 100);
    }


    return (
        <div className="sub_section_page">
            <NavBar />
            <div className="sub_section_con">
                <div onClick={openAddMenu} className="add_catalog">
                    <img src="/img/додати.svg" alt="" />
                </div>
            </div>

            {!isLoading && data.subSection && data.subSection.length > 0 ? (
                data.subSection.map((sections) => (
                    <CatalogCard key={sections._id} product={sections} index={data.subSection.indexOf(sections)} />
                ))
            ) : (
                !isLoading && <div className="no_products">Немає доступних продуктів</div>
            )}

            <AddSub />
        </div>
    )
}