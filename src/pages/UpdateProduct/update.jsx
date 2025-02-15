import React, { useEffect, useState, useRef } from 'react';
import { useParams, useNavigate } from 'react-router-dom'; // Import useNavigate
import { NavBar } from '../../components/NavBar/nav';
import {
    useGetProductQuery,
    usePutProductMutation,
    usePutProductModelsMutation,
    useGetSectionsQuery,
} from '../../store';
import './dist/update.css';
import AddCategory from '../../components/AddCategory/addCat';
import { Loader } from '../../components/Loader/loader';
import { AddSub } from '../../components/AddSubSection/adSub';
import { usePostImgMutation } from '../../store';
import PutModel from '../../components/PutModelModal/putModel';
import { useDeleteModelMutation } from '../../store';

export function Update() {

    const input = useRef()

    const dialog2 = useRef()

    const carouselRef = useRef(null);


    const navigate = useNavigate()
    const [activeModel, setActiveModel] = useState(0)
    const [activeImg, setActiveImg] = useState(0)
    const [name, setName] = useState(null)
    const [quantity, setQuantity] = useState(null)
    const [price, setPrice] = useState(null)
    const [activeIndex, setActiveIndex] = useState(0);
    const points = ['Опис', 'Характеристика', 'Застосування'];
    const [description, setDescr] = useState(null)
    const [video, setVideo] = useState(null)
    const [images, setImages] = useState(null)
    const [modelId, setModelId] = useState(null)
    const [imgId, setImgId] = useState([])


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

    const [putProduct, { data, isLoading: p, Error }] = usePutProductMutation()
    const [putProductModels, { data: d, isLoading: putLOading, Error: e }] = usePutProductModelsMutation()

    const [deleteModel] = useDeleteModelMutation()

    const [addImg, { data: img, isLoading: loading, Error: irror }] = usePostImgMutation()

    useEffect(() => {
        refetchProduct();
    }, [refetchProduct]);

    useEffect(() => {
        setName(product?.name);
        setQuantity(product?.models?.[activeModel]?.quantity || 0);
        setPrice(product?.models?.[activeModel]?.price || 0);
        setDescr(product?.models?.[activeModel]?.description)
        setVideo(product?.video)
        setImages(product?.models?.[activeModel]?.image)
        setModelId(product?.models[activeModel]._id)
        if (product?.models?.[activeModel]?.image) {
            const imageIds = product.models[activeModel].image.map(image => image.imageId);
            setImgId(imageIds); // Set the image IDs to state
        }

        console.log("Hello IMAGES", images)



        if (
            product?.section?.section && // Ensure product.section.section exists
            sections?.some(section => section._id === product.section.section._id)
        ) {
            const matchedSection = sections.find(section => section._id === product.section.section._id);

            setCategoryId(matchedSection._id);
            setCategory(matchedSection.name);
            setIsCategorySelected(true);

            if (matchedSection.subSections) {
                setSubsections(matchedSection.subSections);
            } else {
                setSubsections([]);
            }
            if (
                product?.section?.subSection && // Ensure product.section.subSection exists
                matchedSection?.subSections?.some(subSection => subSection._id === product.section.subSection._id)
            ) {
                const matchedSubSection = matchedSection.subSections.find(
                    subSection => subSection._id === product.section.subSection._id
                );
                setSubCategory(matchedSubSection.name);
                setSubCategoryId(matchedSubSection._id)
            }
        }
    }, [product, sections, activeModel]);

    useEffect(() => {
        if (carouselRef.current && images?.length > 0) {
            const activeImage = carouselRef.current.children[activeImg];

            if (!activeImage) return;

            const containerWidth = carouselRef.current.offsetWidth;
            const imageWidth = activeImage.offsetWidth;

            carouselRef.current.scrollLeft = activeImage.offsetLeft - (containerWidth - imageWidth) / 2;
        }
    }, [activeImg, images?.length]);


    function goBack() {
        navigate(-1)
    }

    function handleModelChange(model, index) {
        setActiveModel(index);
        setQuantity(product?.models[index].quantity)
        setPrice(product?.models[index].price)
        setModelId(model)
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
    function openAddCat() {
        const menuElement = document.getElementById("add_sub");
        menuElement.style.display = "flex";
        setTimeout(() => {
            menuElement.style.opacity = "1";
        }, 100);
    }

    const handleRadioChange = (e) => {
        setDisplay(e.target.id === 'option3' ? 1 : 0); // If "option3" (Так) is selected, set display to 1, otherwise set to 0
    };


    const dateStr = product?.createdAt;
    const date = new Date(dateStr);

    const formattedDate = date.toLocaleDateString();





    const handlePhotoForward = () => {
        if (activeImg >= images.length - 1) {
            setActiveImg(0);
        } else {
            setActiveImg(activeImg + 1);
        }
    };

    const handlePhotoBackward = () => {
        if (activeImg <= 0) {
            setActiveImg(images.length - 1);
        } else {
            setActiveImg(activeImg - 1);
        }
    };

    const handleClick = (index) => {
        setActiveIndex(index);
    };
    const handleInput = () => {
        input.current.click();
    };

    // const handleFileChange = async (e) => {
    //     const files = Array.from(e.target.files);
    //     const validFiles = files.filter(file => file.type === 'image/png' || file.type === 'image/jpeg');

    //     if (validFiles.length > 0) {
    //         setImages(prevFiles => [...prevFiles, ...validFiles]);
    //     }

    //     console.log(files);

    // };

    const handleFileChange = async (e) => {
        const files = Array.from(e.target.files);
        const validFiles = files.filter(file => file.type === 'image/png' || file.type === 'image/jpeg');

        if (validFiles.length > 0) {
            // Update images state
            setImages(prevFiles => [...prevFiles, ...validFiles]);
        }

        console.log("Selected Files:", files);
        console.log("Images in State:", images);

        try {
            const formData = new FormData();
            validFiles.forEach((file) => {
                formData.append('image', file);
            });

            const response = await addImg(formData).unwrap();
            console.log("Response from addImg:", response);

            if (response?.images?.length > 0) {
                setImgId(prevImgId => [...prevImgId, ...response.images]);
            }

            console.log("Updated imgId State:", imgId);

            if (response) {
                try {
                    const product = {
                        id: id,             // ID of the product
                        model: modelId,     // Model ID
                        image: [...imgId, ...response.images] // Use updated state for images
                    };

                    await putProductModels(product);
                    console.log("Product model updated successfully.");
                } catch (e) {
                    console.error("Error updating product model:", e);
                }
            }
        } catch (error) {
            console.error('Error uploading images:', error);
        }
    };


    const productUpdate = async () => {
        try {
            const product = {
                id: id,
                name: name,
                video: video,
                section: subCategoryId ? subCategoryId : categoryId,

            };
            const models = {
                id: id,
                model: modelId,
                price: price,
                quantity: quantity,
                description: description
            };


            await putProduct(product)
            await putProductModels(models)
        } catch (e) {
            console.error(e)
        }
    }


    const openModelsMenu = (e) => {
        e.preventDefault()
        e.stopPropagation()
        dialog2.current.open()
    };


    const handleDeleteMOdel = async (modelId) => {

        const body = {
            id: id,
            modelId: modelId
        }

        try {
            await deleteModel(body)
        } catch (e) {

        }

    }

    const handleRemovePhoto = async(imageId) => {


        const updatedImgId = imgId.filter((img) => img !== imageId.imageId);


        try {
            const product = {
                id: id,             
                model: modelId,     
                image: updatedImgId
            };

            await putProductModels(product);
            console.log("Product model updated successfully.");
        } catch (e) {
            console.error("Error updating product model:", e);
        }

    };

    return (
        <div className="update_page">
            <NavBar />
            {productLoading && <Loader />}
            <div className="update_field">
                <div className="left_up_model">
                    <div className="img_preview">
                        <span className="setting_up">Редагувати Зображення</span>

                        <div className="img_wrapper">
                            {images?.[activeImg] && (
                                <img
                                    className="preview_img"
                                    src={
                                        typeof images[activeImg].imageUrl === "string"
                                            ? images[activeImg].imageUrl
                                            : URL.createObjectURL(images[activeImg])
                                    }
                                    alt="Preview"
                                />
                            )}
                        </div>

                        <div className="carusel_block">
                            <img onClick={handlePhotoBackward} style={{ transform: "rotate(180deg)", cursor: "pointer" }} src="/img/Group 67 (1).svg" alt="" />

                            <div className="img_carousel" ref={carouselRef}>
                                {images?.map((img, index) => {
                                    return (
                                        <div
                                            key={index}
                                            onClick={() => {
                                                setActiveImg(index);
                                            }}
                                            className={activeImg === index ? "img_c_active" : "img_c_container"}
                                        >
                                            <div className="delete_image" onClick={() => handleRemovePhoto(img)}>X</div>


                                            <img
                                                className="img_c"
                                                src={
                                                    typeof img.imageUrl === "string"
                                                        ? img.imageUrl
                                                        : URL.createObjectURL(img)
                                                }
                                                alt={`Image ${index}`}
                                            />

                                        </div>
                                    );
                                })}
                                <div className="img_c_container">
                                    <img className="img_c" onClick={handleInput} src="/img/додати.svg" alt="Add" />
                                </div>
                            </div>
                            <img onClick={handlePhotoForward} style={{ cursor: "pointer" }} src="/img/Group 67 (1).svg" alt="" />

                        </div>
                    </div>

                    <div className="section_set">
                        <span className="setting_up">Назва товару</span>
                        <input name="price" type="text" value={name} onChange={(e) => { setName(e.target.value) }} placeholder="Назва..." className="input" />
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
                                <span className="add_cat_in_add" onClick={openAddCat}>Додати категорію</span>
                            </div>
                        </div>



                    </div>

                </div>
                <div className="left_up_model">


                    <div className="weight pt">
                        <span className="setting_up">Фасування</span>
                        <button className="add_model" onClick={openModelsMenu}>Додати</button>
                        <div className="models_con">
                            {product?.models.map((model, index) => (
                                <span
                                    onClick={() => handleModelChange(model._id, index)}
                                    className={activeModel === index ? "active_model" : "model_name"}
                                    key={model._id}
                                >
                                    {model.modelName} г | <span onClick={() => handleDeleteMOdel(model._id)}>X</span>
                                </span>
                            ))}
                        </div>
                    </div>
                    <div className="section_set">
                        <span className="setting_up">Кількість</span>
                        <input name="price" type="text" value={quantity} onChange={(e) => { setQuantity(e.target.value) }} placeholder="Кількість..." className="input" />

                    </div>


                    <div className="section_set">
                        <span className="setting_up">Ціна</span>
                        <input name="price" type="text" value={price} onChange={(e) => { setPrice(e.target.value) }} placeholder="Назва..." className="input" />

                    </div>


                    <div className="section_set">
                        <span className="setting_up">Додати знижку</span>
                        <input name="price" type="text" placeholder="%" className="input" />


                    </div>


                    <div className="section_set_b">
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
                                <textarea value={description} onChange={(e) => { setDescr(e.target.value) }} name="description" id="" placeholder="Опис..." />
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
                                <input type="text" placeholder="Посилання..." value={video} onChange={(e) => { setVideo(e.target.value) }} className="input" name="video" />
                            </div>
                        )}


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

                            <button type="submit" onClick={productUpdate} className="add_product_btn">{p === false ? "Зберегти" : "Збереження"}</button>
                        </div>

                    </div>

                </div>


            </div>
            <input
                ref={input}
                style={{ display: "none" }}
                type="file"
                accept=".png, .jpeg, .jpg"
                multiple
                onChange={handleFileChange}
            />

            <AddCategory />
            <AddSub />
            <PutModel ref={dialog2} id={id} />


        </div>
    );
}
