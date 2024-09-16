import "./dist/addSub.css"

import { useState } from "react";
import { usePostSubSectionMutation } from "../../store";
import { useParams } from "react-router-dom";

export function AddSub({id}) {

    const {catalogId} = useParams({})

    const [name, setName] = useState('')
    const [photo,setPhoto] = useState('eqweb')

    const [subr] = usePostSubSectionMutation()


    function closeAddCat(){
        const menuElement = document.getElementById("add_sub");
        menuElement.style.opacity = "0";
        setTimeout(() => {
            menuElement.style.display = "none";
        }, 100);
    }


    const addSub = async() => {
        try{
            const sub ={
                _id: id,
                name: name
            }
            closeAddCat()
            await subr(sub)
        }catch(e){
            console.error(e)
        }
    }

    return (
        <div id='add_sub' className="add_category">
            <div className="add_cat_menu">
                <img
                    onClick={closeAddCat}
                    className="close_img"
                    src="/img/close_menu.svg"
                    alt="Close menu"
                />

                <span>Введіть назву підкатегорії</span>

                <input type="text" placeholder='Назва' onChange={(e) => { setName(e.target.value) }} />
                <div className="img_con">

                </div>
                <button className='cat_btn' onClick={addSub}>Створити</button>
            </div>
        </div>
    )
}