import './dist/addCat.css'

import { usePostSectionMutation } from '../../store';
import { useState } from 'react';



export default function AddCategory(){

    const [name, setName] = useState('')
    const [photo,setPhoto] = useState('eqweb')

    const [createCategory, {data, isLoading, error}] = usePostSectionMutation()



    function closeAddCat(){
        const menuElement = document.getElementById("add_category");
        menuElement.style.opacity = "0";
        setTimeout(() => {
            menuElement.style.display = "none";
            setName('')
        }, 100);
    }


    const addSection = async() => {
        try{
            const category ={
                photo,
                name
            }

            await createCategory(category)
            // window.location.reload()
            closeAddCat()
        }catch(e){
            console.log(e)
        }
    }

    return(
        <div id='add_category' className="add_category">
            <div className="add_cat_menu">
                <img 
                    onClick={closeAddCat}
                    className="close_img" 
                    src="./img/close_menu.svg" 
                    alt="Close menu" 
                />

                <span>Введіть назву категорії</span>

                <input type="text" placeholder='Назва' onChange={(e) => {setName(e.target.value)}}/>
                <div className="img_con">

                </div>
                <button className='cat_btn' onClick={addSection}>Створити</button>
            </div>
        </div>
    )
}