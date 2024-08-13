import { useEffect, useState } from "react";
import "./dist/card.css";

import { useDeleteProductMutation } from "../../store";
import { NavLink } from "react-router-dom";

export function ProductCard({ product, index }) {


    const [availability, setAvailability] = useState("На складі")
    const [eye, setEye] = useState('./img/Eye.svg')
    const [deleteProduct, { isLoading }] = useDeleteProductMutation();

    



//Переробити з js на styl

    const ntStyle = {
        backgroundColor: index % 2 === 0 ? 'rgba(133, 212, 169, 0.5)' : 'rgba(182, 217, 198, 1)'
    };
    const tiStyle = {
        backgroundColor: index % 2 === 0 ? 'rgba(187, 237, 210, 0.5)' : 'rgba(206, 229, 216, 1)'
    };




    const closeDeleteMenu = () => {
        document.getElementById("delete").style.opacity = "0"
        

        setTimeout(() => {
        
        document.getElementById("delete").style.display = "none"

            
        }, 400);
    
    }


    const handleDelete = async () => {
        try {
            await deleteProduct(product._id);
            closeDeleteMenu();

        } catch (error) {
            console.error('Failed to delete the product: ', error);
        } finally{
            window.location.reload()
        }

    };


    const date = new Date(product.createdAt);

    const day = String(date.getUTCDate()).padStart(2, '0');
    const month = String(date.getUTCMonth() + 1).padStart(2, '0'); // Months are zero-based
    const year = date.getUTCFullYear();

    const formattedDate = `${day}.${month}.${year}`;
 

    useEffect(() => {
        if(product.quantity===0){
            setAvailability("Відсутнє")
        }
    },[product])


    useEffect(()=>{
        if(product.display === true){
            setEye('./img/Eye.svg')
        }
        else{
            setEye('./img/Invisible.svg')
        }
    },[])

    return (
        <div className="p_card">
            <div className="table_info" style={ntStyle}>001</div>
            <div className="table_info" style={tiStyle}>{product.article}</div>
            <div className="table_info" style={tiStyle}>{formattedDate}</div>
            <div className="table_info" style={tiStyle}>{product.name}</div>
            <div className="table_info" style={tiStyle}>{product.price} грн.</div>
            <div className="table_info" style={tiStyle}>{product.quantity}</div>
            <div className="table_info" style={tiStyle}>{availability}</div>
            <div className="card_control">
                <img src={eye} alt="" />
                <div className="sep_line"></div>
                <NavLink to={`/${product._id}`}><img src="./img/Edit.svg" alt="" /></NavLink>
                <div className="sep_line"></div>
                <img src="./img/Delete.svg" alt="" onClick={handleDelete}/>

            </div>

            <div id="delete" className="delete_modal">
            <div className="modal_con">
                <div className="delete_text">Ви дійсно бажаєте видалити ?</div>
                <div className="delte_btn_group">
                    <p onClick={handleDelete}>ТАК</p>
                    <div className="del_line"></div>
                    <p className="cancel" onClick={closeDeleteMenu}>НІ</p>
                </div>
            </div>
        </div>
        </div>
    );
}