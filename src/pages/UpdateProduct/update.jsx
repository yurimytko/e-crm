import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { NavBar } from '../../components/NavBar/nav';
import {
    useGetProductQuery,
    usePutProductMutation,
    useGetSectionsQuery,
    useGetSubSectionQuery
} from '../../store';
import './dist/update.css';
import AddCategory from '../../components/AddCategory/addCat';

export function Update() {
    const { id } = useParams();

    // Fetching product data
    const {
        data: productData,
        error: productError,
        isLoading: productLoading,
        refetch: refetchProduct
    } = useGetProductQuery(id);

    // Fetching sections
    const {
        data: sectionsData = [],
        isLoading: sectionsLoading
    } = useGetSectionsQuery();

    // Fetching sub-sections
    const [name, setName] = useState('');
    const [price, setPrice] = useState('');
    const [quantity, setQuantity] = useState('');
    const [description, setDescr] = useState('');
    const [video, setVideo] = useState('');
    const [activeIndex, setActiveIndex] = useState(0);

    const [putProduct, { isLoading: isUpdating }] = usePutProductMutation();

    const [selectedCategory, setSelectedCategory] = useState('');
    const [selectedSubCategory, setSelectedSubCategory] = useState('');
    const [isCategoryOpen, setIsCategoryOpen] = useState(false);
    const [isSubCategoryOpen, setIsSubCategoryOpen] = useState(false);
    const [categoryId, setCategoryId] = useState('')
    const [subCategoryId, setSubCategoryId] = useState('')
    

    useEffect(() => {
        // Refetch product data when component mounts
        refetchProduct();
    }, [refetchProduct]);

    useEffect(() => {
        if (productData?.product) {
            setName(productData.product.name);
            setPrice(productData.product.price);
            setDescr(productData.product.description);
            setQuantity(productData.product.quantity);
            setVideo(productData.product.video);
            setSelectedCategory(productData.product.section.section.name)
            setCategoryId(productData.product.section.section._id)
            setSubCategoryId(productData.product.section?.subSections)
        }
    }, [productData]);

    if (productLoading) return <div>Loading...</div>;
    if (productError) return <div>Failed to load product.</div>;

    const formattedDate = new Date(productData?.product?.createdAt).toLocaleDateString('uk-UA', {
        day: '2-digit',
        month: '2-digit',
        year: 'numeric'
    });

    const handleClick = (index) => {
        setActiveIndex(index);
    };

    const points = ['Опис', 'Характеристика', 'Застосування'];

    const handleUpdate = async () => {
        try {
            const updatedProduct = {
                id,
                name,
                price,
                description,
                section: categoryId

            };
            await putProduct(updatedProduct);
        } catch (err) {
            console.error('Failed to update product: ', err);
        }
    };

    const handleChangeQuantity = (e) => {
        setQuantity(e.target.value);
    };

    const handleKeyPressQuantity = (e) => {
        if (e.key === 'Enter') {
            try {
                const result = eval(quantity);
                setQuantity(result.toString());
            } catch (error) {
                console.error('Невірний вираз', error);
            }
        }
    };

    const toggleCategoryDropdown = () => {
        setIsCategoryOpen((prev) => !prev);
    };

    const toggleSubCategoryDropdown = () => {
        setIsSubCategoryOpen((prev) => !prev);
    };

    const handleSectionSelect = (id, name) => {
        setCategoryId(id)
        setSelectedCategory(name);
        setIsCategoryOpen(false);

        console.log(id)
    };

    const handleSubSectionSelect = (id, name) => {
        setCategoryId(id)
        setSelectedSubCategory(name);
        setIsSubCategoryOpen(false);
    };

    const rejectBtn = () => {
        if (productData?.product) {
            setName(productData.product.name);
            setPrice(productData.product.price);
            setDescr(productData.product.description);
            setQuantity(productData.product.quantity);
            setVideo(productData.product.video);
        }
    };


    const openAddMenu = () => {
        document.getElementById("add_category").style.display = "flex"


        setTimeout(() => {

            document.getElementById("add_category").style.opacity = "1"



        }, 100);
    }


    const filteredSubSections = selectedCategory && sectionsData?.sections
        ? sectionsData.sections.find(section => section.name === selectedCategory)?.subSections || []
        : [];

    return (
        <div className="update_page">
            <NavBar />
            <div className="update_field">
                <div className="left_update">
                    <div className="carusel_block">
                        <div className="carusel_view">
                            <div className="carusel_con">
                                <div className="img_block"><img src="/img/semena.png" alt="" /></div>
                                <div className="img_block"><img src="/img/semena.png" alt="" /></div>
                            </div>
                        </div>
                        <div className="car_controls">
                            <img src="/img/Group 127.svg" alt="" />
                            <div className="img_group">
                                <div><img src="/img/semena.png" alt="" /></div>
                                <div><img src="/img/semena.png" alt="" /></div>
                            </div>
                            <img src="/img/Group 67.svg" alt="" />
                        </div>

                        <p className="setting_up">Категорія</p>
                        <div className="drop_down" onClick={toggleCategoryDropdown}>
                            {selectedCategory || 'Виберіть категорію'}
                            <img src="./img/Group 22.svg" alt="" />
                            <div className={`drop ${isCategoryOpen ? 'open' : ''}`}>
                                {/* Empty item to reset selected category */}
                                <span
                                    key="none"
                                    onClick={(e) => {
                                        e.stopPropagation();
                                        setSelectedCategory(''); // Reset selected category
                                        setSelectedSubCategory(''); // Reset selected subcategory
                                        setIsSubCategoryOpen(false);
                                        setIsCategoryOpen(false); // Close subcategory dropdown
                                    }}
                                >
                                    ...
                                </span>

                                {sectionsLoading
                                    ? 'Loading...'
                                    : sectionsData?.sections?.length > 0
                                        ? sectionsData.sections.map((section) => (
                                            <span
                                                key={section._id}
                                                onClick={(e) => {
                                                    e.stopPropagation();
                                                    handleSectionSelect(section._id, section.name);
                                                }}
                                            >
                                                {section.name}
                                            </span>
                                        ))
                                        : 'Немає доступних категорій'}

                                <span className="add_category_input" onClick={openAddMenu}>
                                    Додати категорію
                                </span>
                            </div>
                        </div>

                        {selectedCategory && (
                            <>
                                <p className="setting_up">Під категорія</p>
                                <div className="drop_down" onClick={toggleSubCategoryDropdown}>
                                    {selectedSubCategory || 'Виберіть підкатегорію'}
                                    <img src="./img/Group 22.svg" alt="" />
                                    <div className={`drop ${isSubCategoryOpen ? 'open' : ''}`}>
                                        {filteredSubSections?.length > 0
                                            ? filteredSubSections.map((subsection) => (
                                                <span
                                                    key={subsection._id}
                                                    onClick={(e) => {
                                                        e.stopPropagation();
                                                        handleSubSectionSelect(subsection, subsection);
                                                    }}
                                                >
                                                    {subsection}
                                                </span>
                                            ))
                                            : 'Немає доступних підкатегорій'}
                                        <span className="add_category_input" onClick={() => { /* Open add menu logic */ }}>
                                            Додати підкатегорію
                                        </span>
                                    </div>
                                </div>
                            </>
                        )}
                    </div>
                </div>
                <div className="right_update">
                    <div className="top_part">
                        <div className="top_left">
                            <span>Артикул: {productData?.product.article}</span>
                            <span>Створено: {formattedDate}</span>
                        </div>
                        <div className="coments_btn">
                            <img src="./img/Chat Bubble.svg" alt="" />
                            <span>Коментарі</span>
                        </div>
                    </div>
                    <p className="setting_up">Назва</p>

                    <input
                        className="up_input"
                        type="text"
                        placeholder="Назва товару..."
                        name="name"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                    />
                    <p className="setting_up">Ціна</p>

                    <input
                        className="up_input"
                        type="text"
                        placeholder="Ціна"
                        name="name"
                        value={price}
                        onChange={(e) => setPrice(e.target.value)}
                    />
                    <p className="setting_up">Кількість</p>

                    <input
                        className="up_input"
                        type="text"
                        placeholder="Кількість"
                        name="name"
                        value={quantity}
                        onChange={handleChangeQuantity}
                        onKeyDown={handleKeyPressQuantity}
                    />
                    <div className="point_choose">
                        {points.map((point, index) => (
                            <span
                                key={index}
                                className={`point ${activeIndex === index ? 'active' : ''}`}
                                onClick={() => handleClick(index)}
                            >
                                {point}
                            </span>
                        ))}
                    </div>
                    {/* <textarea
                        className="text_area_up"
                        placeholder="Опис товару..."
                        name="description"
                        value={description}
                        onChange={(e) => setDescr(e.target.value)}
                    ></textarea> */}

                    {activeIndex === 0 && (
                        <div className="edit_block">
                            <textarea
                                className="text_area_up"
                                placeholder="Опис товару..."
                                name="description"
                                value={description}
                                onChange={(e) => setDescr(e.target.value)}
                            ></textarea>
                        </div>
                    )}
                    {activeIndex === 1 && (
                        <div className="edit_block">
                            <textarea
                                className="text_area_up"
                                placeholder="Характеристика товару..."
                                name="description"
                                value={description}
                                onChange={(e) => setDescr(e.target.value)}
                            ></textarea>
                        </div>
                    )}
                    {activeIndex === 2 && (
                        <div className="edit_block">
                            <input
                                className="up_input"
                                type="text"
                                placeholder="Посилання на відео..."
                                name="name"
                                value={video}
                                onChange={(e) => setVideo(e.target.value)}
                            />
                        </div>
                    )}
                    <div className="up_control_con">
                        <div className="delete_btn" onClick={rejectBtn}>Скасувати</div>
                        <div className="update_btn" onClick={handleUpdate}>{isUpdating ? 'Зберігається...' : 'Зберегти зміни'}</div>
                    </div>
                </div>


            </div>
            <AddCategory />

        </div>
    );
}
