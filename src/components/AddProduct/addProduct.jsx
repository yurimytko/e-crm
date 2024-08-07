import "./dist/addProduct.css";
import { useEffect, useState, useRef } from "react";
import { useGetSectionsQuery, useAddProductMutation } from "../../store";
import { Loader } from "../Loader/loader"

export function AddProductMenu() {
    
    const [productName, setProductName] = useState('')


    const closeAddMenu =() => {
        document.getElementById("add_menu").style.opacity = "0"
        

        setProductName('')


      
        setTimeout(() => {
        
            document.getElementById("add_menu").style.display = "none"


            
        }, 100);
    }

    


    return (
        <div id="add_menu" className="add_product_asd" >
            <div className="modal_add_product">
                <img onClick={closeAddMenu} className="close_img" src="./img/close_menu.svg" alt="" />
                <div className="left_modal">
                    <p className="settign_up">Добавити Зображення</p>
                    <div className="input_field"></div>
                    <input className="input" type="text" placeholder="Назва товару..." value={productName} onChange={(e) => {setProductName(e.target.value)}}/>
                    <input className="input" type="text" placeholder="Ціна..."/>
                    <input className="input" type="text" placeholder="Кількість на складі..."/>
                    <p className="settign_up">Категорія</p>
                    <input className="input" type="text" placeholder="Кількість на складі..."/>
                    <p className="settign_up">Під категорія</p>
                    <input className="input" type="text" placeholder="Кількість на складі..."/>
                    <p className="settign_up">Показувати товар</p>


                    <div class="radio-buttons">
                        <label class="radio-button">
                            <input type="radio" name="option" value="option1"/>
                            <div class="radio-circle"></div>
                            <span class="radio-label">Так</span>
                        </label>
                        <label class="radio-button">
                            <input type="radio" name="option" value="option2"/>
                            <div class="radio-circle"></div>
                            <span class="radio-label">Ні</span>
                        </label>
                    </div>
                </div>
                <div className="modal_sep"></div>
                <div className="right_modal">
                    <p className="settign_up">Характеристика</p>
                    <p className="settign_up">Опис</p>
                    <textarea name="" className="text_area" id="" placeholder="Опис товару..."></textarea>



                </div>
            </div>
        </div>
    );
}
