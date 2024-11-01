import "./dist/addProduct.css";
import { createPortal } from "react-dom";
import { useRef, useImperativeHandle, forwardRef, useState, useEffect } from "react";

import { useGetSectionsQuery } from "../../store";

import { useAddProductMutation, useAddModelsMutation } from "../../store";
import AddModel from "../AddModel/addModel";

const generateRandomArticle = () => {
    return Math.floor(1000 + Math.random() * 9000).toString();
};

const AddProductMenu = forwardRef(function AddProductMenu(props, ref) {


    const [addProduct, { data, isLoading: isloading, Error: Error }] = useAddProductMutation()

    const [addModel, { data: model, isLoading: isloadin, Error: er }] = useAddModelsMutation()

    const [activeIndex, setActiveIndex] = useState(0);

    const [category, setCategory] = useState("Категорія")
    const [isCategoryOpen, setIsCatOpen] = useState(false)
    const [isSubOpen, setIsSubOpen] = useState(false)

    const [isSingle, setIsSingle] = useState(1)

    const [isCategorySelected, setIsCategorySelected] = useState(false)



    const [subCategory, setSubCategory] = useState("Під категорія")
    const [subsetcions, setSubsections] = useState([])


    const [description, setDescr] = useState()

    const [categoryId, setCategoryId] = useState()
    const [subCategoryId, setSubCategoryId] = useState()

    const [promotion, setPromotion] = useState({ isActive: false, discount: '' })

    const [selectedFiles, setSelectedFiles] = useState([]);
    const [name, setName] = useState('')

    const { data: categoryq = [], isLoading, error } = useGetSectionsQuery()

    const [models, setModels] = useState([]);

    const [selectedOption, setSelectedOption] = useState('');

    const handleOptionChange = (event) => {
        setIsSingle(event.target.id === 'option1' ? 1 : 0);
    };

    const dialog2 = useRef()


    const dialog = useRef();

    useImperativeHandle(ref, () => {
        return {
            open() {
                dialog.current.showModal();
                dialog.current.style.display = "flex";
            }
        };
    });



    useEffect(() => {
        const storedModels = JSON.parse(localStorage.getItem('models')) || [];
        setModels(storedModels);
    }, []);



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
        if (value !== '') {
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

    const openModelsMenu = () => {
        dialog2.current.open()
    };



    async function onSubmit(e) {
        try {
            e.preventDefault();
            console.log("Submitted");

            const fd = new FormData(e.target);
            if (description) {
                fd.append("description", description);
            }
            const randomArticle = generateRandomArticle();
            fd.append("article", randomArticle);

            if (categoryId) {
                fd.append("sectionId", categoryId);
            } else if (subCategoryId) {
                fd.append("subSectionId", subCategoryId);
            }

            fd.append("isSingle", isSingle);
            console.log([...fd]);
            await addProduct(fd).unwrap();
            console.log("Product added successfully");
        } catch (e) {
            console.error(e);
        }
    }


    async function onSubmitModels(e) {
        try {
            e.preventDefault();
            console.log("Submitted models");

            const fd = new FormData(e.target);

            const randomArticle = generateRandomArticle();
            fd.append("article", randomArticle);

            if (categoryId) {
                fd.append("sectionId", categoryId);
            } else if (subCategoryId) {
                fd.append("subSectionId", subCategoryId);
            }

            fd.append("isSingle", isSingle);
            console.log([...fd]);

            const productResponse = await addProduct(fd).unwrap();
            console.log("Product added successfully", productResponse);

            const productId = productResponse?.product._id; 

            if (productId) {
                await addModel({ id: productId, models: models }).unwrap();
                
            }
        } catch (e) {
            console.error(e);
        }
    }

    const handleForm = async (e) => {
        if (isSingle === 1) {
            await onSubmit(e);
        }
        else {
            await onSubmitModels(e)
        }
    };


    return createPortal(
        <dialog ref={dialog}>
            <form onSubmit={handleForm}>
                <div className="modal_left_part">
                    <div className="img_con">
                        <span className="setting_up">Добавити Зображення</span>
                        <div className="upload_img_con">
                            <label htmlFor="file_input">
                                <span style={{ color: 'rgba(33, 150, 83, 1)', cursor: 'pointer' }}>Завантажте фото</span> або перетягніть файл
                            </label>
                            <p>Jpg, Png / Макс 8 мб / Мін 214px х 214px</p>

                            <input
                                name="image"
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
                        <input name="name" value={name} onChange={(e) => { setName(e.target.value) }} type="text" placeholder="Назва..." className="input" />
                    </div>
                    <div className="product_price_con">
                        <span className="setting_up">Ціна</span>
                        <input name="price" type="number" placeholder="Ціна..." className="input" />
                    </div>
                    <div className="product_price_con">
                        <span className="setting_up">Фасування</span>
                        <div className="radio-container">
                            <div className="radio-wrapper">
                                <label className="radio-button">
                                    <input
                                        id="option1"
                                        name="radio-group"
                                        type="radio"
                                        checked={isSingle === 1}
                                        onChange={handleOptionChange}
                                    />
                                    <span className="radio-checkmark"></span>
                                    <span className="radio-label">Без фасування</span>
                                </label>
                            </div>

                            <div className="radio-wrapper">
                                <label className="radio-button">
                                    <input
                                        id="option2"
                                        name="radio-group"
                                        type="radio"
                                        checked={isSingle === 0}
                                        onChange={handleOptionChange}
                                    />
                                    <span className="radio-checkmark"></span>
                                    <span className="radio-label">Додати фасування</span>
                                </label>
                            </div>
                        </div>

                        {/* Conditionally render the additional block when "Додати фасування" is selected */}

                    </div>
                    {isSingle === 0 && (
                        <div className="product_price_con">
                            <span className="setting_up">Фасування</span>

                            <button className="add_model" onClick={openModelsMenu}>Додати</button>
                            <div className="models_names">
                                {models.map((model, index) => (
                                    <div className="model">{name} {model.modelName}</div>
                                ))}
                            </div>


                        </div>
                    )}

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
                                <textarea name="description" id="" placeholder="Опис..." value={description} onChange={(e) => { setDescr(e.target.value) }} />
                            </div>
                        )}
                        {activeIndex === 1 && (
                            <div className="product_price_con">
                                <span className="setting_up">Опис</span>
                                <input type="number" placeholder="xx шт" className="input" />
                            </div>
                        )}
                        {activeIndex === 2 && (
                            <div className="product_price_con">
                                <span className="setting_up">Посилання на відео</span>
                                <input type="text" placeholder="Посилання..." className="input" name="video" />
                            </div>
                        )}


                    </div>
                    <div className="product_price_con">
                        <span className="setting_up">Кількість на складі</span>
                        <input name="quantity" type="number" placeholder="xx шт" className="input" />
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
                        <input value={promotion.discount} onChange={handelPromotion} type="number" placeholder="xx %" className="input" />
                    </div>

                    <div className="add_btn_con">
                        <button type="button" className="cancel_add" onClick={closeModal}>Скасувати</button>

                        <button type="submit" className="add_product_btn">Додати</button>
                    </div>

                </div>
            </form>
            <AddModel ref={dialog2} />
        </dialog>,
        document.getElementById("add_product")
    );
});

export default AddProductMenu;
