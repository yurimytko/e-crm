import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom'; // Import useNavigate
import { NavBar } from '../../components/NavBar/nav';
import {
    useGetProductQuery,
    usePutProductMutation,
    useGetSectionsQuery,
} from '../../store';
import './dist/update.css';
import AddCategory from '../../components/AddCategory/addCat';
import { Loader } from '../../components/Loader/loader';

export function Update() {
    const navigate = useNavigate()
    const [activeModel, setActiveModel] = useState(0)
    const [name, setName] = useState(null)
    const [quantity, setQuantity] = useState(null)
    const [price, setPrice] = useState(null)



    const [category, setCategory] = useState("Категорія")
    const [subCategory, setSubCategory] = useState("Під категорія")

    const [isCategoryOpen, setIsCatOpen] = useState(false)
    const [isSubOpen, setIsSubOpen] = useState(false)
    const [isCategorySelected, setIsCategorySelected] = useState(false)
    const [categoryId, setCategoryId] = useState()
    const [subsetcions, setSubsections] = useState([])
    const [subCategoryId, setSubCategoryId] = useState()

    const [display, setDisplay] = useState(1)


    const { id } = useParams();
    const {
        data: { product } = {},
        error: error,
        isLoading: productLoading,
        refetch: refetchProduct
    } = useGetProductQuery(id);

    const {
        data: { sections } = {},
        isLoading: sectionsLoading
    } = useGetSectionsQuery();

    useEffect(() => {
        refetchProduct();
    }, [refetchProduct]);

    useEffect(() => {
        console.log(sections);
        setName(product?.name)
        setQuantity(product?.models[activeModel].quantity)
        setPrice(product?.models[activeModel].price)

    }, [product, sections]);


    function goBack() {
        navigate(-1)
    }

    function handleModelChange(index) {
        setActiveModel(index);
        setQuantity(product?.models[index].quantity)
        setPrice(product?.models[index].price)
    }

    function handleNavigate() {
        navigate("reviews")
    }

    function openDrop() {
        setIsCatOpen(!isCategoryOpen)
        setIsSubOpen(false)
    }

    function openDropSub() {
        setIsCatOpen(false)

        setIsSubOpen(!isSubOpen)
    }

    const resetCat = () => {
        setCategory("Категорія")
        setIsCategorySelected(false)
    }

    const resetSub = () => {
        setSubCategory("Під категорія")
    }


    const chooseCat = (title) => {
        setCategory(title.name)
        setCategoryId(title._id)
        setIsCategorySelected(true)
        setSubsections(title.subSections)
        setSubCategory("Під категорія")

        console.log(title)

    }

    const chooseSub = (title) => {
        setSubCategory(title.name)
        setSubCategoryId(title._id)
        setCategoryId(null)

        console.log(title)

    }

    const openAddCategory = () => {
        const menuElement = document.getElementById("add_category");
        menuElement.style.display = "flex";
        setTimeout(() => {
            menuElement.style.opacity = "1";


        }, 100);
    }

    const handleRadioChange = (e) => {
        setDisplay(e.target.id === 'option3' ? 1 : 0); // If "option3" (Так) is selected, set display to 1, otherwise set to 0
    };


    const dateStr = product.createdAt;
    const date = new Date(dateStr);

    const formattedDate = date.toLocaleDateString();


    return (
        <div className="update_page">
            <NavBar />
            {productLoading && <Loader />}
            <div className="update_field">
                <div className="left_up_model">
                    <div className="img_preview">
                        <span className="setting_up">Редагувати Зображення</span>

                        <div className="img_wrapper">
                            <img className='preview_img' src={product?.models[activeModel].image} alt="" />

                        </div>
                    </div>


                    <div className="product_price_con sec">
                        <span className="setting_up">Категорія</span>
                        <div onClick={openDrop} className="drop_down_cat">
                            <div className="catigory">{category}</div>
                            <img src="/img/Group 22.svg" alt="" />
                            <div className="dropdown_cat" style={{ height: isCategoryOpen ? "auto" : "0" }}>
                                <span onClick={resetCat}>...</span>
                                {sections && sections.length > 0 ? (
                                    sections.map(section => (
                                        <span onClick={() => chooseCat(section)} className="category_on_add" key={section._id}>{section.name}</span>
                                    ))
                                ) : (
                                    <span>немає категорій</span>
                                )}
                                <span className="add_cat_in_add" onClick={openAddCategory}>Додати категорію</span>
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
                                <span className="add_cat_in_add" >Додати категорію</span>
                            </div>
                        </div>



                    </div>

                    <div className="section_set">
                        <span className="setting_up">Кількість</span>
                        <input name="price" type="text" value={quantity} onChange={(e) => { setQuantity(e.target.value) }} placeholder="Назва..." className="input" />

                    </div>



                    <div className="product_price_con sec">
                        <span className="setting_up">Показувати товар</span>
                        <div className="radio-container">
                            <div className="radio-wrapper">
                                <label className="radio-button">
                                    <input
                                        id="option3"
                                        name="radio-group_1"
                                        type="radio"
                                        onChange={handleRadioChange}
                                        checked={display === 1}
                                    />
                                    <span className="radio-checkmark"></span>
                                </label>
                                <span className="radio-label">Так</span>
                            </div>

                            <div className="radio-wrapper">
                                <label className="radio-button">
                                    <input
                                        id="option4"
                                        name="radio-group_1"
                                        type="radio"
                                        onChange={handleRadioChange}
                                        checked={display === 0}
                                    />
                                    <span className="radio-checkmark"></span>
                                </label>
                                <span className="radio-label">Ні</span>
                            </div>
                        </div>
                    </div>





                </div>
                <div className="left_up_model">
                    <div className="section_set">
                        <span className="setting_up">Назва товару</span>
                        <input name="price" type="text" value={name} onChange={(e) => { setName(e.target.value) }} placeholder="Назва..." className="input" />
                    </div>

                    <div className="weight">
                        <span className="setting_up">Фасування</span>
                        <button className="add_model">Додати</button>
                        <div className="models_con">
                            {product?.models.map((model, index) => (
                                <span
                                    onClick={() => handleModelChange(index)}
                                    className={activeModel === index ? "active_model" : "model_name"}
                                    key={model._id}
                                >
                                    {product.name} {model.modelName}
                                </span>
                            ))}
                        </div>
                    </div>


                    <div className="section_set">
                        <span className="setting_up">Ціна</span>
                        <input name="price" type="text" value={price} onChange={(e) => { setPrice(e.target.value) }} placeholder="Назва..." className="input" />

                    </div>

                    <div className="section_set">
                        <span className="setting_up">Категорія</span>
                    </div>

                    <div className="section_set">
                        <span className="setting_up">Додати знижку</span>

                    </div>
                    <div className="date_review">
                        <div className="left_block">
                            <button className='reviews_btn' onClick={handleNavigate}>
                                <img src="./img/Chat Bubble.svg" alt="" />
                                <span>Коментарі</span>
                            </button>
                            <div className="article_and_date">
                                <span>Артикул: {product?.article}</span>
                                <span>Артикул: {formattedDate}</span>

                            </div>
                        </div>
                        <div className="right_bloc">
                            <button type="button" onClick={goBack} className="cancel_add">Скасувати</button>

                            <button type="submit" className="add_product_btn">Додати</button>
                        </div>

                    </div>

                </div>


            </div>

            <AddCategory />

        </div>
    );
}
