import "./dist/addProduct.css";
import { createPortal } from "react-dom";
import { useRef, useImperativeHandle, forwardRef, useState } from "react";

import { useGetSectionsQuery } from "../../store";

import { useAddProductMutation } from "../../store";
import { wait } from "@testing-library/user-event/dist/utils";

const generateRandomArticle = () => {
    return Math.floor(1000 + Math.random() * 9000).toString();
};

const AddProductMenu = forwardRef(function AddProductMenu(props, ref) {


    const [addProduct, {data, isLoading: isloading, Error: Error}] = useAddProductMutation()

    const [activeIndex, setActiveIndex] = useState(0);

    const [category, setCategory] = useState("Категорія")
    const [isCategoryOpen, setIsCatOpen] = useState(false)
    const [isSubOpen, setIsSubOpen] = useState(false)

    const [isCategorySelected, setIsCategorySelected] = useState(false)



    const [subCategory, setSubCategory] = useState("Під категорія")
    const [subsetcions, setSubsections] = useState([])


    const [description, setDescr] = useState()

    const [categoryId, setCategoryId] = useState()
    const [subCategoryId, setSubCategoryId] = useState()

    const [promotion, setPromotion] = useState({isActive: false, discount: ''})

    const [selectedFiles, setSelectedFiles] = useState([]);


    const { data: categoryq = [], isLoading, error } = useGetSectionsQuery()



    const dialog = useRef();

    useImperativeHandle(ref, () => {
        return {
            open() {
                dialog.current.showModal();
                dialog.current.style.display = "flex";
            }
        };
    });


    const closeModal = () => {
        dialog.current.close();
        dialog.current.style.display = "none";

        setCategory("Категорія");
        setIsCategorySelected(false);
        setSubCategory("Під категорія");
        setSubsections([]);
    };


    function openDrop() {
        setIsCatOpen(!isCategoryOpen)
        setIsSubOpen(false)
    }
    function openDropSub() {
        setIsCatOpen(false)

        setIsSubOpen(!isSubOpen)
    }

    const chooseCat = (title) => {
        setCategory(title.name)
        setCategoryId(title._id)
        setIsCategorySelected(true)
        setSubsections(title.subSections)
        setSubCategory("Під категорія")

        console.log(title)

    }
    const resetCat = () => {
        setCategory("Категорія")
        setIsCategorySelected(false)
    }

    const resetSub = () => {
        setSubCategory("Під категорія")
    }


    const handelPromotion = (e) => {
        const value = e.target.value
        if(value !== ''){
            setPromotion(prevValues => ({
                ...prevValues,
                isActive: true,
                discount: value
            }))
        }
        console.log(promotion.isActive)
    }


    const chooseSub = (title) => {
        setSubCategory(title.name)
        setSubCategoryId(title._id)
        setCategoryId(null)

        console.log(title)

    }

    const points = ['Опис', 'Характеристика', 'Застосування'];

    const handleClick = (index) => {
        setActiveIndex(index);
    };


    const handleFileChange = (e) => {
        const files = Array.from(e.target.files);
        setSelectedFiles(files);
    };

    async function onSubmit(e) {
        try {
            e.preventDefault();
            console.log("Submitted");
        
            const fd = new FormData(e.target);
        
            const randomArticle = generateRandomArticle();
            fd.append("article", randomArticle);
        
            if (description) {
                fd.append("description", description);
            }
        
            if (categoryId) {
                fd.append("sectionId", categoryId);
            } else if (subCategoryId) {
                fd.append("subSectionId", subCategoryId);
            }
        
            console.log([...fd]); // Check if all form data including the description is appended
        
            await addProduct(fd).unwrap();
        
            console.log("Product added successfully");
        } catch (e) {
            console.error(e);
        }
    }

    return createPortal(
        <dialog ref={dialog}>
            <form onSubmit={onSubmit}>
                <div className="modal_left_part">
                    <div className="img_con">
                        <span className="setting_up">Добавити Зображення</span>
                        <div className="upload_img_con">
                            <label htmlFor="file_input">
                                <span style={{ color: 'rgba(33, 150, 83, 1)', cursor: 'pointer' }}>Завантажте фото</span> або перетягніть файл
                            </label>
                            <p>Jpg, Png / Макс 8 мб / Мін 214px х 214px</p>

                            <input
                                name ="image"
                                id="file_input"
                                type="file"
                                accept=".jpg, .jpeg, .png"
                                style={{ display: 'none' }}
                                onChange={handleFileChange}
                                multiple 
                            />
                        </div>
                    </div>
                    <div className="product_price_con">
                        <span className="setting_up">Назва товару</span>
                        <input name="name" type="text" placeholder="Назва..." className="input" />
                    </div>
                    <div className="product_price_con">
                        <span className="setting_up">Категорія</span>
                        <div onClick={openDrop} className="drop_down_cat">
                            <div className="catigory">{category}</div>
                            <img src="/img/Group 22.svg" alt="" />
                            <div className="dropdown_cat" style={{ height: isCategoryOpen ? "auto" : "0" }}>
                                <span onClick={resetCat}>...</span>
                                {categoryq?.sections && categoryq.sections.length > 0 ? (
                                    categoryq.sections.map(section => (
                                        <span onClick={() => chooseCat(section)} className="category_on_add" key={section._id}>{section.name}</span>
                                    ))
                                ) : (
                                    <span>немає категорій</span>
                                )}
                                <span className="add_cat_in_add">Додати категорію</span>
                            </div>
                        </div>
                        <div onClick={openDropSub} className="drop_down_cat" style={{ display: isCategorySelected ? "flex" : "none" }}>
                            <div className="catigory">{subCategory}</div>
                            <img src="/img/Group 22.svg" alt="" />
                            <div className="dropdown_cat" style={{ height: isSubOpen ? "auto" : "0" }}>
                                <span onClick={resetSub}>...</span>
                                {subsetcions && subsetcions.length > 0 ? (
                                    subsetcions.map(section => (
                                        <span onClick={() => chooseSub(section)} className="category_on_add" key={section._id}>{section.name}</span>
                                    ))
                                ) : (
                                    <span>немає категорій</span>
                                )}
                                <span className="add_cat_in_add">Додати категорію</span>
                            </div>
                        </div>



                    </div>
                    <div className="product_price_con">
                        <span className="setting_up">Додати знижку</span>
                        <input value={promotion.discount} onChange={handelPromotion}  type="number" placeholder="xx %" className="input" />
                    </div>
                </div>

                <div className="sep_add_line"></div>

                <div className="modal_left_part">
                    <div className="options_con">
                        <div className="point_choose_add_menu">
                            {points.map((point, index) => (
                                <span
                                    key={index}
                                    className={`point_add ${activeIndex === index ? 'active_add' : ''}`}
                                    onClick={() => handleClick(index)}
                                >
                                    {point}
                                </span>
                            ))}
                        </div>
                        {activeIndex === 0 && (
                            <div className="product_price_con">
                                <span className="setting_up">Опис</span>
                                <textarea  name="description" id="" placeholder="Опис..." value={description} onChange={(e) => {setDescr(e.target.value)}}/>
                            </div>
                        )}
                        {activeIndex === 1 && (
                            <div className="product_price_con">
                                <span className="setting_up">Опис</span>
                                <input  type="number" placeholder="xx шт" className="input" />
                            </div>
                        )}
                        {activeIndex === 2 && (
                            <div className="product_price_con">
                                <span className="setting_up">Посилання на відео</span>
                                <input type="text" placeholder="Посилання..." className="input" name="video"/>
                            </div>
                        )}


                    </div>
                    <div className="product_price_con">
                        <span className="setting_up">Кількість на складі</span>
                        <input name="quantity" type="number" placeholder="xx шт" className="input" />
                    </div>
                    <div className="product_price_con">
                        <span className="setting_up">Ціна</span>
                        <input name="price" type="number" placeholder="Ціна..." className="input" />
                    </div>
                    <div className="product_price_con">
                        <span className="setting_up">Показувати товар</span>
                        <input type="number" placeholder="xx шт" className="input" />
                    </div>

                    <div className="add_btn_con">
                        <button type="button" className="cancel_add" onClick={closeModal}>Скасувати</button>

                        <button type="submit" className="add_product_btn">Додати</button>
                    </div>

                </div>
            </form>
        </dialog>,
        document.getElementById("add_product")
    );
});

export default AddProductMenu;
