import { useEffect, useState } from "react";
import "./dist/card.css";
import { useDeleteProductMutation, usePutProductMutation } from "../../store";
import { NavLink } from "react-router-dom";

export const ProductCard = ({ product, index, handleCheckboxChange, isSelected }) => {
    const [availability, setAvailability] = useState(product.quantity === 0 ? "Відсутнє" : "На складі");
    const [eye, setEye] = useState(product.display ? './img/Eye.svg' : './img/Invisible.svg');
    const [display, setDisplay] = useState(product.display);

    const [deleteProduct, { isLoading }] = useDeleteProductMutation();
    const [putProduct, { isLoading: isUpdating, isSuccess }] = usePutProductMutation();
    
    const id = product._id;

    const ntStyle = {
        backgroundColor: index % 2 === 0 ? 'rgba(133, 212, 169, 0.5)' : 'rgba(182, 217, 198, 1)'
    };
    const tiStyle = {
        backgroundColor: index % 2 === 0 ? 'rgba(187, 237, 210, 0.5)' : 'rgba(206, 229, 216, 1)'
    };

    const closeDeleteMenu = () => {
        const deleteElement = document.getElementById("delete");
        deleteElement.style.opacity = "0";
        setTimeout(() => {
            deleteElement.style.display = "none";
        }, 400);
    };

    const handleDelete = async () => {
        try {
            await deleteProduct(product._id);
            closeDeleteMenu();
            
        } catch (error) {
            console.error('Failed to delete the product: ', error);
        } finally {
            window.location.reload(); 
        }
    };

    const formattedDate = new Date(product.createdAt).toLocaleDateString('uk-UA');

    const displayUpdate = async () => {
        try {
            const updatedProduct = {
                id,
                display: !display
            };
            setDisplay(!display);
            setEye(!display ? './img/Eye.svg' : './img/Invisible.svg');
            await putProduct(updatedProduct);
        } catch (err) {
            console.error("Failed to update product: ", err);
        }
    };

    return (
        <div className="p_card">
            <div style={{ opacity: isSelected ? 1 : 0 }} className="delete_check">
                <input onChange={(event) => handleCheckboxChange(event, product._id)} type="checkbox" />
            </div>

            <div className="table_info" style={ntStyle}>001</div>
            <div className="table_info" style={tiStyle}>{product.article}</div>
            <div className="table_info" style={tiStyle}>{formattedDate}</div>
            <div className="table_info" style={tiStyle}>{product.name}</div>
            <div className="table_info" style={tiStyle}>{product.category.section?.name}</div>
            <div className="table_info" style={tiStyle}>{product.category.subSection}</div>
            <div className="table_info" style={tiStyle}>{product.price} грн.</div>
            <div className="table_info" style={tiStyle}>{product.quantity}</div>
            <div className="table_info" style={tiStyle}>{availability}</div>
            
            <div className="card_control">
                <img onClick={displayUpdate} src={eye} alt="Toggle Display" />
                <div className="sep_line"></div>
                <NavLink to={`/${product._id}`}><img src="./img/Edit.svg" alt="Edit Product" /></NavLink>
                <div className="sep_line"></div>
                <img src="./img/Delete.svg" alt="Delete Product" onClick={handleDelete} />
            </div>

            <div id="delete" className="delete_modal">
                <div className="modal_con">
                    <div className="delete_text">Ви дійсно бажаєте видалити?</div>
                    <div className="delete_btn_group">
                        <p onClick={handleDelete}>ТАК</p>
                        <div className="del_line"></div>
                        <p className="cancel" onClick={closeDeleteMenu}>НІ</p>
                    </div>
                </div>
            </div>
        </div>
    );
};
