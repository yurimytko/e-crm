import "./dist/addProduct.css";
import { useState } from "react";
import { useAddProductMutation, useGetSectionsQuery } from "../../store";
import { Loader } from "../Loader/loader";


const generateRandomArticle = () => {
    return Math.floor(1000 + Math.random() * 9000).toString();
};


export function AddProductMenu() {
    const [formData, setFormData] = useState({
        photo: 'abs',
        name: '',
        price: '',
        article: generateRandomArticle(),
        description: '',
        sectionId: '',
        quantity: '',
        display: true,
    });

    const [isOpen, setIsOpen] = useState(false);
    const [selectedCategory, setSelectedCategory] = useState("Категорія...");
    const toggleDropdown = () => {
        setIsOpen(!isOpen);
    };

    const [addProduct, { isLoading, isError, isSuccess }] = useAddProductMutation();
    const { data = [], isloading } = useGetSectionsQuery();


    const [dragging, setDragging] = useState(false);
    const [labelText, setLabelText] = useState('Завантажте фото або перетягніть файл');


    const handleChange = (e) => {
        const { name, value, type, checked } = e.target;
        setFormData(prevState => ({
            ...prevState,
            [name]: type === 'radio' ? checked : value
        }));
    };



    const closeAddMenu = () => {
        const menuElement = document.getElementById("add_menu");
        menuElement.style.opacity = "0";
        setTimeout(() => {
            menuElement.style.display = "none";
        }, 300);
    };


    const handleSectionSelect = (id, name) => {
        setFormData((prevFormData) => ({
            ...prevFormData,
            sectionId: id,
        }));
        setSelectedCategory(name); // Оновлюємо вибрану категорію
        setIsOpen(false); // Закриваємо випадаючий список після вибору
        console.log(id)
    };


    const handleSubmit = async (event) => {
        event.preventDefault();
        console.log("Display state on submit:", formData.display);

        try {
            await addProduct(formData).unwrap();
            closeAddMenu();
            window.location.reload()
        } catch (error) {
            console.error("Failed to add the product:", error);
        }
    };


    const handleDragEnter = (e) => {
        e.preventDefault();
        e.stopPropagation();
        setDragging(true);
        setLabelText('Відпустіть файл');
    };

    const handleDragLeave = (e) => {
        e.preventDefault();
        e.stopPropagation();
        setDragging(false);
        setLabelText('Завантажте фото або перетягніть файл');
    };

    const handleDrop = (e) => {
        e.preventDefault();
        e.stopPropagation();
        setDragging(false);
        setLabelText('Завантажте фото або перетягніть файл');

        const files = e.dataTransfer.files;
        if (files.length > 0) {
            // Handle file upload logic here
            console.log(files[0]);
        }
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
                    <div className="img_field">
                        <div
                            className="border"
                            onDragEnter={handleDragEnter}
                            onDragOver={(e) => e.preventDefault()} // Required to allow dropping
                            onDragLeave={handleDragLeave}
                            onDrop={handleDrop}
                        >
                            <label htmlFor="file-upload" className="file-upload-label">
                                {labelText}
                            </label>
                            <p>Jpg, Png / Макс 8 мб / Мін 214px х 214px</p>
                            <input
                                id="file-upload"
                                type="file"
                                className="file-upload-input"
                                accept="image/*"
                            />
                        </div>
                    </div>

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
                    <div className="drop_down" onClick={toggleDropdown}>
                        {selectedCategory}
                        <img src="./img/Group 22.svg" alt="" />
                        <div className={`drop ${isOpen ? "open" : ""}`}>
                            <span>...</span>
                            {!isLoading && data.sections && data.sections.length > 0 ? (
                                data.sections.map((sections) => (
                                    <span onClick={(e) => {
                                        e.stopPropagation(); // Щоб уникнути закриття випадаючого списку при кліку
                                        handleSectionSelect(sections._id, sections.name);
                                    }} key={sections._id}>{sections.name}</span>
                                ))
                            ) : (
                                !isLoading && <div className="no_products">Немає доступних продуктів</div>
                            )}
                        </div>
                    </div>
                    <p className="settign_up">Під категорія</p>
                    <div className="drop_down">
                        Під категорія...
                        <img src="./img/Group 22.svg" alt="" />
                    </div>
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
