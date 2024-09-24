import './dist/upPack.css';
import { useState, useEffect } from 'react';
import { useGetPackByIdQuery, usePutPacksMutation } from '../../store/packsApi';
import { useGetProductsQuery } from "../../store";


export function UpPack({ packId }) {
    const { data, isLoading, error } = useGetPackByIdQuery({ id: packId });

    const [url, setUrl] = useState('?name=')
    const [productName, setProductName] = useState('');
    const [showDropdown, setShowDropdown] = useState(false);


    const { data: product = [] } = useGetProductsQuery(url)
    const [activeIndex, setActiveIndex] = useState(0);




    const [name, setName] = useState('');
    const [price, setPrice] = useState('');
    const [selectedProducts, setSelectedProducts] = useState([]);
    const [allProducts, setAllProducts] = useState([]);

    const [quantity, setQuantity] = useState()


    const [putPack] = usePutPacksMutation()


    const points = [
        'Опис',
        'Характеристика',
        'Застосування',
    ];


    const handleClick = (index) => {
        setActiveIndex(index);
    };

    useEffect(() => {
        if (data && data.pack) {
            setName(data.pack.packName);
            setPrice(data.pack.price);
            setQuantity(data.pack.quantity)
            const products = data.pack.products || [];
            setSelectedProducts(products);
            setAllProducts(products); // Initialize all products with the fetched data
        }
    }, [data]);

    console.log(selectedProducts)

    const closeAddMenu = () => {
        const menuElement = document.getElementById("up_pack");
        menuElement.style.opacity = "0";
        setTimeout(() => {
            menuElement.style.display = "none";
            setName("");
            setPrice("");
            setQuantity("")
            const products = [];
            setSelectedProducts(products);
            setAllProducts(products); // Initialize all products with the fetched data
        }, 300);
    };

    // Function to handle increasing the quantity
    const increaseQuantity = (index) => {
        const updatedProducts = selectedProducts.map((item, i) =>
            i === index ? { ...item, quantity: item.quantity + 1 } : item
        );
        setSelectedProducts(updatedProducts);
    };

    // Function to handle decreasing the quantity
    const decreaseQuantity = (index) => {
        const updatedProducts = selectedProducts.map((item, i) =>
            i === index && item.quantity > 1 ? { ...item, quantity: item.quantity - 1 } : item
        );
        setSelectedProducts(updatedProducts);
    };

    // Function to remove product from selectedProducts
    const toggleProduct = (productId) => {
        const productIndex = selectedProducts.findIndex(item => item.product._id === productId);

        if (productIndex > -1) {
            // If the product is already selected, remove it
            const updatedProducts = selectedProducts.filter(item => item.product._id !== productId);
            setSelectedProducts(updatedProducts);
        } else {
            // If the product is not selected, add it back with a quantity of 1
            const productToAdd = allProducts.find(item => item.product._id === productId);
            if (productToAdd) {
                setSelectedProducts([...selectedProducts, { product: productToAdd.product, quantity: 1 }]);
            }
        }
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

        // Update selectedProducts for display
        setSelectedProducts((prevProducts) => {
            const productIndex = prevProducts.findIndex(p => p.product._id === productId);

            if (productIndex > -1) {
                // If the product is already selected, remove it
                const updatedProducts = prevProducts.filter(p => p.product._id !== productId);
                return updatedProducts;
            } else {
                // If the product is not selected, add it with a quantity of 1
                const newProductEntry = { product: product, quantity: 1 };

                // Also add it to allProducts if it's not already there
                setAllProducts((prevAllProducts) => {
                    if (!prevAllProducts.some(p => p.product._id === productId)) {
                        return [...prevAllProducts, newProductEntry]; // Add new entry
                    }
                    return prevAllProducts; // Return unchanged if already exists
                });

                return [...prevProducts, newProductEntry]; // Add to selectedProducts
            }
        });

        // Clear the input field and close the dropdown
        setShowDropdown(false);
        setProductName('');
    };

    const putPackFunc = async () => {
        try {
            const productsToSend = selectedProducts.map(item => ({
                product: item.product._id,
                quantity: item.quantity // Assuming item.quantity is already a number
            }));

            const pack = {
                id: packId,
                packName: name,
                price: price,
                quantity: Number(quantity), // Convert the string state to a number
                products: productsToSend
            };

            await putPack(pack);

            closeAddMenu()

        } catch (e) {
            console.error(e);
        }
    };
    return (
        <div id='up_pack' className='up_pack'>
            <div className="modal_update_pack">
                <img
                    onClick={closeAddMenu}
                    className="close_img"
                    src="./img/close_menu.svg"
                    alt="Close menu"
                />
                <div className="left_modal_packs">
                    <p className="setting_up">Додати зображення</p>
                    <div className="img_drag_con"></div>

                    <input
                        className="input"
                        type="text"
                        placeholder="Назва товару..."
                        name="packName"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                    />
                    <input
                        className="input"
                        type="text"
                        placeholder="Ціна..."
                        name="price"
                        value={price}
                        onChange={(e) => setPrice(e.target.value)}
                    />
                    <input
                        className="input"
                        type="text"
                        placeholder="Кількість..."
                        name="quantity"
                        value={quantity}
                        onChange={(e) => setQuantity(e.target.value)}
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
                                            onClick={() => handleProductClick(product)} // Updated function
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

                    <div className="product_pack_con">
                        {allProducts.map((item, index) => (
                            <span
                                key={item.product._id}
                                className={`product_point ${selectedProducts.some(prod => prod.product._id === item.product._id) ? 'selected' : ''}`}
                            >
                                <div className={`counter`}>
                                    <button onClick={() => decreaseQuantity(index)}>-</button>
                                    {selectedProducts.find(prod => prod.product._id === item.product._id)?.quantity || 0}X
                                    <button onClick={() => increaseQuantity(index)}>+</button>
                                </div>
                                {item.product.name}
                                <div
                                    className={`remove_img ${selectedProducts.some(prod => prod.product._id === item.product._id) ? 'selected' : ''}`}
                                    onClick={() => toggleProduct(item.product._id)} // Change this line
                                >
                                    <img src="/img/Group 20574463.svg" alt="" />
                                </div>
                            </span>
                        ))}
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

                    <button className="add_pack" onClick={putPackFunc}>Оновити</button>
                </div>
            </div>
        </div>
    );
}
