import "./dist/addProduct.css";
import { useState } from "react";
import { useAddProductMutation } from "../../store";
import { Loader } from "../Loader/loader";

export function AddProductMenu() {
    const [formData, setFormData] = useState({
        name: '',
        photo: 'abs',
        article: '1234',
        price: '',
        quantity: '',
        category: '',
        subCategory: '',
        description: '',
        display: true,
        sectionId: '66b11a068951d1ffd3345012'
    });

    const [addProduct, { isLoading, isError, isSuccess }] = useAddProductMutation();

    const handleChange = (e) => {
        const { name, value, type, checked } = e.target;
        setFormData(prevState => ({
            ...prevState,
            [name]: type === 'radio' ? checked : value
        }));
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        console.log("Display state on submit:", formData.display);

        try {
            await addProduct(formData).unwrap();
            closeAddMenu();
            window.location.reload();
        } catch (error) {
            console.error("Failed to add the product:", error);
        }
    };

    const closeAddMenu = () => {
        const menuElement = document.getElementById("add_menu");
        menuElement.style.opacity = "0";
        setTimeout(() => {
            menuElement.style.display = "none";
        }, 100);
    };

    return (
        <div id="add_menu" className="add_product_asd">
            <div className="modal_add_product">
                <img 
                    onClick={closeAddMenu} 
                    className="close_img" 
                    src="./img/close_menu.svg" 
                    alt="Close menu" 
                />
                <div className="left_modal">
                    <p className="settign_up">Добавити Зображення</p>
                    <input 
                        className="input" 
                        type="text" 
                        placeholder="Назва товару..." 
                        name="name"
                        value={formData.name} 
                        onChange={handleChange} 
                    />
                    <input 
                        className="input" 
                        type="text" 
                        placeholder="Ціна..." 
                        name="price"
                        value={formData.price} 
                        onChange={handleChange} 
                    />
                    <input 
                        className="input" 
                        type="text" 
                        placeholder="Кількість на складі..." 
                        name="quantity"
                        value={formData.quantity} 
                        onChange={handleChange} 
                    />
                    <p className="settign_up">Категорія</p>
                    <input 
                        className="input" 
                        type="text" 
                        placeholder="Категорія..." 
                        name="category"
                        value={formData.category} 
                        onChange={handleChange} 
                    />
                    <p className="settign_up">Під категорія</p>
                    <input 
                        className="input" 
                        type="text" 
                        placeholder="Під категорія..." 
                        name="subCategory"
                        value={formData.subCategory} 
                        onChange={handleChange} 
                    />
                    <p className="settign_up">Показувати товар</p>
                    <div className="radio-buttons">
                        <label className="radio-button">
                            <input 
                                type="radio" 
                                name="display" 
                                value={true} 
                                checked={formData.display === true} 
                                onChange={handleChange} 
                            />
                            <div className="radio-circle"></div>
                            <span className="radio-label">Так</span>
                        </label>
                        <label className="radio-button">
                            <input 
                                type="radio" 
                                name="display" 
                                value={false} 
                                checked={formData.display === false} 
                                onChange={handleChange} 
                            />
                            <div className="radio-circle"></div>
                            <span className="radio-label">Ні</span>
                        </label>
                    </div>
                </div>
                <div className="modal_sep"></div>
                <div className="right_modal">
                    <p className="settign_up">Опис</p>
                    <textarea
                        className="text_area"
                        placeholder="Опис товару..."
                        name="description"
                        value={formData.description}
                        onChange={handleChange}
                    ></textarea>
                    <div className="submit_button" onClick={handleSubmit}>
                        {isLoading ? <Loader /> : "Додати"}
                    </div>
                </div>
            </div>
        </div>
    );
}
