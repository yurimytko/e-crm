import "./dist/addPacks.css"

import { useState, useEffect } from "react";
import { useGetSectionsQuery } from "../../store";

import { useGetProductsQuery } from "../../store";

import { usePostPacksMutation } from "../../store/packsApi";


const generateRandomArticle = () => {
    return Math.floor(1000 + Math.random() * 9000).toString();
};


export function AddPacks() {

    const [formData, setFormData] = useState({
        photo: 'abs',
        packName: '',
        quantity: '',
        price: '',
        article: generateRandomArticle(),
        products: [],
    });


    const [activeIndex, setActiveIndex] = useState(0);

    const [url, setUrl] = useState('?name=')
    const [productName, setProductName] = useState('');
    const [showDropdown, setShowDropdown] = useState(false);
    const [selectedProducts, setSelectedProducts] = useState([]);



    const { data: product = []} = useGetProductsQuery(url)

    const [postPacks] = usePostPacksMutation()


    const [selectedCategory, setSelectedCategory] = useState(null);


    const { data = [], isloading } = useGetSectionsQuery();





    const points = [
        'Опис',
        'Характеристика',
        'Застосування',
    ];


    const handleClick = (index) => {
        setActiveIndex(index);
    };



    const closeAddMenu = () => {
        const menuElement = document.getElementById("packs_modal");
        menuElement.style.opacity = "0";
        setTimeout(() => {
            menuElement.style.display = "none";
        }, 300);
    };

    const handleChange = (e) => {
        const { name, value, type, checked } = e.target;
        setFormData(prevState => ({
            ...prevState,
            [name]: type === 'radio' ? JSON.parse(value) : value
        }));
    };


    const handleKeyPress = (e) => {
        if (productName === "") {
            setShowDropdown(false);
        }
        if (e.key === 'Enter') {
            setUrl(`?name=${productName}`)
            setShowDropdown(true);
        }
    };

    const handleProductClick = (product) => {
        const productId = product._id;

        // Оновлюємо formData.products
        setFormData((prevState) => {
            const { products } = prevState;

            if (products.some(p => p.product === productId)) {
                return {
                    ...prevState,
                    products: products.filter(p => p.product !== productId), // Видаляємо продукт при повторному кліку
                };
            } else {
                return {
                    ...prevState,
                    products: [...products, { product: productId, quantity: 1 }], // Додаємо новий продукт з кількістю 1
                };
            }
        });

        // Оновлюємо selectedProducts для відображення в контейнері
        setSelectedProducts((prevProducts) => {
            if (prevProducts.some(p => p._id === productId)) {
                return prevProducts.filter(p => p._id !== productId); // Видаляємо продукт при повторному кліку
            } else {
                return [...prevProducts, product];
            }
        });

        // Закриваємо dropdown після вибору продукту
        setShowDropdown(false);
        setProductName('')
    };

    useEffect(() => {
        console.log(formData)
    }, [formData])

    const isSelected = (productId) => formData.products.some(item => item.product === productId);

    const handleQuantityChange = (productId, change) => {
        setFormData((prevState) => {
            const updatedProducts = prevState.products.map(item => {
                if (item.product === productId) {
                    return {
                        ...item,
                        quantity: Math.max(1, item.quantity + change), // Забезпечити, що кількість не менше 1
                    };
                }
                return item;
            });

            return {
                ...prevState,
                products: updatedProducts,
            };
        });
    };

    const postPacksFunc = async () => {

        try {

            await postPacks(formData).unwrap();

        } catch (e) {
            console.error(e)
        }
    }

    const filteredSubSections = selectedCategory
        ? data.sections.find(section => section.name === selectedCategory)?.subSections || []
        : [];

    return (
        <div id="packs_modal" className="add_packs">
            <div className="packs_modal">
                <img
                    onClick={closeAddMenu}
                    className="close_img"
                    src="./img/close_menu.svg"
                    alt="Close menu"
                />
                <div className="left_modal_packs">
                    <p className="setting_up">Додати зображення</p>
                    <div className="img_drag_con">

                    </div>

                    <input
                        className="input"
                        type="text"
                        placeholder="Назва товару..."
                        name="packName"
                        value={formData.packName}
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
                        placeholder="Кількість..."
                        name="quantity"
                        value={formData.quantity}
                        onChange={handleChange}
                    />
                    <div className="search_container">
                        <input
                            className="input"
                            type="text"
                            placeholder="Пошук товару"
                            value={productName}
                            onChange={(e) => setProductName(e.target.value)}
                            onKeyDown={handleKeyPress}
                            style={{ width: '100%' }}
                        />

                        {/* Dropdown з результатами пошуку */}
                        {showDropdown && (
                            <div className="dropdown">
                                {product.products.length ? (
                                    product.products.map((product) => (
                                        <div
                                            key={product._id}
                                            className="dropdown_item"
                                            onClick={() => handleProductClick(product)}
                                        >
                                            {product.name}
                                        </div>
                                    ))
                                ) : (
                                    <div className="dropdown-item">Товарів не знайдено</div>
                                )}
                            </div>
                        )}
                    </div>

                    <p className="setting_up set">Список Товарів</p>

                    {/* Вибрані продукти */}
                    <div className="product_pack_con">
                        {selectedProducts.length > 0 ? (
                            selectedProducts.map((item, index) => {
                                const productInFormData = formData.products.find(p => p.product === item._id);
                                const quantity = productInFormData ? productInFormData.quantity : 1;

                                return (
                                    <span
                                        key={index}
                                        className={`product_point ${isSelected(item._id) ? 'selected' : ''}`}
                                    >
                                        <div className={`counter ${isSelected(item._id) ? 'selected' : ''}`}>
                                            <button onClick={() => handleQuantityChange(item._id, -1)}>-</button>
                                            {quantity}X
                                            <button onClick={() => handleQuantityChange(item._id, 1)}>+</button>
                                        </div>
                                        {item.name}
                                        <div onClick={() => handleProductClick(item)} className={`remove_img ${isSelected(item._id) ? 'selected' : ''}`}>
                                            <img src="/img/Group 20574463.svg" alt="" />
                                        </div>
                                    </span>
                                );
                            })
                        ) : (
                            <span>Немає обраних продуктів</span>
                        )}
                    </div>

                </div>
                <div className="packs_add_sep"></div>
                <div className="right_modal_packs">
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

                    {activeIndex === 0 && (
                        <div className="edit_block">
                            <p className="setting_up">Опис</p>
                            <textarea
                                className="text_area"
                                placeholder="Опис товару..."
                                name="description"

                            ></textarea>
                        </div>
                    )}

                    {activeIndex === 1 && (
                        <div className="edit_block">
                            {/* Content for another block when activeIndex is 1 */}
                            <p className="setting_up">Характеристики</p>
                            <div className="char_block">
                                <div className="char_con">
                                    <div className="char_name"><input type="text" placeholder="Пункт" /></div>
                                    <div className="char_descr"><input type="text" placeholder="Опис" /><img src="/img/Delete.svg" alt="" /></div>
                                </div>
                                <div className="char_con">
                                    <div className="char_name"><input type="text" placeholder="Пункт" /></div>
                                    <div className="char_descr"><input type="text" placeholder="Опис" /><img src="/img/Delete.svg" alt="" /></div>
                                </div>
                                <div className="char_con">
                                    <div className="char_name"><input type="text" placeholder="Пункт" /></div>
                                    <div className="char_descr"><input type="text" placeholder="Опис" /><img src="/img/Delete.svg" alt="" /></div>
                                </div>
                            </div>
                        </div>
                    )}
                    {activeIndex === 2 && (
                        <div className="edit_block">
                            <p className="setting_up">Застосування</p>
                            <input
                                className="input"
                                type="text"
                                placeholder="Посилання на відео..."
                                name="name"

                            />
                        </div>
                    )}
                
                    <button className="add_pack" onClick={postPacksFunc}>Добавити</button>
                </div>
            </div>
        </div>
    )
}