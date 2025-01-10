import "./dist/addProduct.css";
import { createPortal } from "react-dom";
import { useRef, useImperativeHandle, forwardRef, useState, useEffect } from "react";

import { useGetSectionsQuery } from "../../store";

import { useAddProductMutation, useAddModelsMutation } from "../../store";
import AddModel from "../AddModel/addModel";
import AddCategory from "../AddCategory/addCat";
import { AddSub } from "../AddSubSection/adSub";
import { combineSlices } from "@reduxjs/toolkit";
import { usePostImgMutation } from "../../store";

const generateRandomArticle = () => {
    return Math.floor(1000 + Math.random() * 9000).toString();
};

const AddProductMenu = forwardRef(function AddProductMenu(props, ref) {

    const input = useRef()
    const [dragActive, setDragActive] = useState(false);

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

    const [imagesId, setImgId] = useState([])

    const [display, setDisplay] = useState(1)


    const [characteristics, setCharacteristics] = useState([]);


    const [addImg, { data: img, isLoading: loading, Error: Errorimage }] = usePostImgMutation()



    const handleOptionChange = (event) => {
        setIsSingle(event.target.id === 'option1' ? 1 : 0);
    };


    const handleAddCharacteristic = () => {
        setCharacteristics([...characteristics, { title: "", value: "" }]);
    };

    const handleInputChange = (index, field, value) => {
        const updatedCharacteristics = characteristics.map((char, i) =>
            i === index ? { ...char, [field]: value } : char
        );
        setCharacteristics(updatedCharacteristics);
    };

    const handleRemoveCharacteristic = (index) => {
        const updatedCharacteristics = characteristics.filter((_, i) => i !== index);
        setCharacteristics(updatedCharacteristics);
    };

    const generateHTML = () => `
    <ul>
      ${characteristics
            .filter((item) => item.title && item.value) // Ensure non-empty values
            .map(
                (item) => `
        <li>
          <strong>${item.title}:</strong> ${item.value}
        </li>
      `
            )
            .join("")}
    </ul>
    `;




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
        console.log(models)
    }, [models]);



    const closeModal = () => {
        dialog.current.close();
        dialog.current.style.display = "none";

        setCategory("Категорія");
        setIsCategorySelected(false);
        setSubCategory("Під категорія");
        setSubsections([]);
        setModels([])
        setIsSingle(1)
        setName("")
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


    const handleFileChange = async (e) => {
        const files = Array.from(e.target.files);
        const validFiles = files.filter(file => file.type === 'image/png' || file.type === 'image/jpeg');

        if (validFiles.length > 0) {
            setSelectedFiles(prevFiles => [...prevFiles, ...validFiles]);
        } else {
            alert('Only PNG and JPG images are allowed');
        }

        console.log(files);

        // try {
        //     const formData = new FormData();
        //     files.forEach((file, index) => {
        //         formData.append('image', file);
        //     });

        //     const response = await addImg(formData).unwrap();
        //     console.log(response);

        //     if (response) {
        //         setImgId(response.images);
        //     }
        // } catch (error) {
        //     console.error('Error uploading images:', error);
        // }
    };

    const openModelsMenu = (e) => {
        e.preventDefault()
        e.stopPropagation()
        dialog2.current.open()
    };


    useEffect(() => {
        console.log("WRQWR WQ R  WRQ", imagesId)
    }, [imagesId])





    async function onSubmit(e) {
        e.preventDefault();

        const validation = categoryq.sections.filter((item) => item._id === categoryId);
        if (validation.length > 0 && subCategoryId === undefined) {
            alert("Alert");
            return; // Stop execution if validation fails
        }

        try {
            const fd = new FormData(e.target);

            // Append missing fields if necessary
            if (!fd.has("description") && description) {
                fd.append("description", description);
            }

            // Handle multiple selected files
            if (selectedFiles && selectedFiles.length > 0) {
                Array.from(selectedFiles).forEach((file) => {
                    fd.append("image", file); // Appends multiple files with the same key
                });
            }

            // Append other fields
            const randomArticle = generateRandomArticle();
            fd.append("article", randomArticle);

            if (categoryId) {
                fd.append("sectionId", categoryId);
            } else if (subCategoryId) {
                fd.append("subSectionId", subCategoryId);
            }

            if (isSingle !== undefined) {
                fd.append("isSingle", isSingle);
            }

            if (display !== undefined) {
                fd.append("display", display);
            }

            // Generate and append HTML markup
            if (characteristics) {
                const htmlMarkup = generateHTML();
                fd.append("characteristic", htmlMarkup);
            }

            // Debug FormData (optional, logs keys and values)
            for (let pair of fd.entries()) {
                console.log(pair[0], pair[1]);
            }

            // Send data using the addProduct function
            await addProduct(fd).unwrap();
            closeModal();

            console.log("Submitted");
        } catch (e) {
            console.error("Submission error:", e);
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

            if (display) {
                fd.append("display", display);
            }

            fd.append("isSingle", isSingle);
            console.log([...fd]);

            const productResponse = await addProduct(fd).unwrap();
            console.log("Product added successfully", productResponse);

            const productId = productResponse?.product._id;

            if (productId) {
                const formData = new FormData();
                formData.append('id', productId);

                const model = {
                    id: productId,
                    models: models
                }

                await addModel(model).unwrap();
                closeModal()


            }
        } catch (e) {
            console.error(e);
        }
    }

    const handleForm = async (e) => {
        e.preventDefault();

        if (isSingle === 1) {
            await onSubmit(e);
        }
        else {
            await onSubmitModels(e)

        }
    };


    const openAddCategory = () => {
        const menuElement = document.getElementById("add_category");
        menuElement.style.display = "flex";
        setTimeout(() => {
            menuElement.style.opacity = "1";


        }, 100);
    }

    function openAddCat() {
        const menuElement = document.getElementById("add_sub");
        menuElement.style.display = "flex";
        setTimeout(() => {
            menuElement.style.opacity = "1";
        }, 100);
    }



    const handleRadioChange = (e) => {
        setDisplay(e.target.id === 'option3' ? 1 : 0);
    };



    const handleDragOver = (e) => {
        e.preventDefault();
        setDragActive(true);
    };

    const handleDragLeave = () => {
        setDragActive(false);
    };

    const handleDrop = (e) => {
        e.preventDefault();
        setDragActive(false);

        const files = Array.from(e.dataTransfer.files).filter(file =>
            file.type === 'image/png' || file.type === 'image/jpeg'
        );

        if (files.length > 0) {
            setSelectedFiles(prevFiles => [...prevFiles, ...files]);
        } else {
            alert('Only PNG and JPG images are allowed');
        }
    };

    const handleInput = () => {
        input.current.click();
    };


    const handleImageClick = (indexToRemove) => {
        setSelectedFiles(prevFiles => prevFiles.filter((_, index) => index !== indexToRemove));
    };


    return createPortal(
        <dialog ref={dialog}>
            <form onSubmit={handleForm}>
                <div className="modal_left_part">
                    <div id="product_options" className="product_price_con">
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
                                </label>
                                <span className="radio-label">Без фасування</span>

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
                                </label>
                                <span className="radio-label">Додати фасування</span>

                            </div>
                        </div>

                    </div>
                    {isSingle === 1 && (
                        <div className="img_con">
                            <span className="setting_up y">Добавити Зображення</span>

                            {selectedFiles.length === 0 ? (
                                <div
                                    className={`upload_img_con ${dragActive ? 'drag_active' : ''}`}
                                    onDragOver={handleDragOver}
                                    onDragLeave={handleDragLeave}
                                    onDrop={handleDrop}
                                >
                                    <span className='input_click' onClick={handleInput}>
                                        Завантажте фото
                                        <span className='normal_text' onClick={(e) => { e.stopPropagation(); }}>
                                            {' '}або перетягніть файл
                                        </span>
                                    </span>
                                    <span className='instruction'>Jpg, Png / Макс 8 мб / Мін 214px х 214px</span>

                                    <input
                                        ref={input}
                                        style={{ display: "none" }}
                                        type="file"
                                        accept=".png, .jpeg, .jpg"
                                        multiple
                                        onChange={handleFileChange}
                                    />
                                </div>
                            ) : (
                                <div
                                    onDragOver={handleDragOver}
                                    onDragLeave={handleDragLeave}
                                    onDrop={handleDrop}
                                    className={`uploaded_photo_p ${dragActive ? 'drag_active' : ''}`}
                                >
                                    {selectedFiles.map((file, index) => (
                                        <div className="img_wrapper" key={index}>
                                            <img
                                                src={URL.createObjectURL(file)}
                                                alt={`Uploaded ${index}`}
                                                className="preview_image_p"
                                                onClick={() => handleImageClick(index)}
                                            />
                                        </div>
                                    ))}
                                </div>
                            )}
                        </div>
                    )}
                    <div className="product_price_con">
                        <span className="setting_up">Назва товару</span>
                        <input name="name" value={name} onChange={(e) => { setName(e.target.value) }} type="text" placeholder="Назва..." className="input" />
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
                                <span className="add_cat_in_add" onClick={openAddCat}>Додати категорію</span>
                            </div>
                        </div>



                    </div>
                    {isSingle === 1 && (
                        <div className="product_price_con">
                            <span className="setting_up">Ціна</span>
                            <input name="price" type="number" placeholder="Ціна..." className="input" />
                        </div>
                    )}

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
                    {isSingle === 1 && (
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
                                    <span className="setting_up">Характеристики</span>
                                    <div className="char_block">
                                        {characteristics.map((char, index) => (
                                            <div className="char" key={index}>
                                                <input
                                                    type="text"
                                                    placeholder="Пункт"
                                                    className="point_of_char"
                                                    value={char.title}
                                                    onChange={(e) =>
                                                        handleInputChange(index, "title", e.target.value)
                                                    }
                                                />
                                                <input
                                                    type="text"
                                                    placeholder="Опис"
                                                    className="input"
                                                    value={char.value}
                                                    onChange={(e) =>
                                                        handleInputChange(index, "value", e.target.value)
                                                    }
                                                />
                                                <button
                                                    type="button"
                                                    onClick={() => handleRemoveCharacteristic(index)}
                                                >
                                                    Видалити
                                                </button>
                                            </div>
                                        ))}
                                    </div>
                                    <button onClick={handleAddCharacteristic}>Додати характеристику</button>
                                </div>
                            )}
                            {activeIndex === 2 && (
                                <div className="product_price_con">
                                    <span className="setting_up">Посилання на відео</span>
                                    <input type="text" placeholder="Посилання..." className="input" name="video" />
                                </div>
                            )}


                        </div>
                    )}


                    {isSingle === 1 && (
                        <div className="product_price_con">
                            <span className="setting_up">Кількість на складі</span>
                            <input name="quantity" type="text" placeholder="xx шт" className="input" />
                        </div>
                    )}

                    {isSingle === 0 && (
                        <div style={{ marginTop: isSingle === 0 ? "0vh" : "2vh" }} className="product_price_con">
                            <span className="setting_up">Застосування</span>
                            <input type="text" placeholder="Посилання..." className="input" name="video" />
                        </div>
                    )}

                    <div className="product_price_con">
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
            <AddModel setModels={setModels} ref={dialog2} />
            <AddCategory />
            <AddSub id={categoryId} />
        </dialog>,
        document.getElementById("add_product")
    );
});

export default AddProductMenu;
