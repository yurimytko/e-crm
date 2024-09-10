import { AddSub } from "../../components/AddSubSection/adSub";
import { NavBar } from "../../components/NavBar/nav"
import "./dist/subSection.css"

export function SubSection(){



    const openAddMenu =() => {
        document.getElementById("add_sub").style.display = "flex"
        

        setTimeout(() => {
        
            document.getElementById("add_sub").style.opacity = "1"


            
        }, 100);
    }


    return(
        <div className="sub_section_page">
            <NavBar/>
            <div className="sub_section_con">
                <div onClick={openAddMenu} className="add_catalog">
                    <img src="/img/додати.svg" alt="" />
                </div>
            </div>

            <AddSub/>
        </div>
    )
}