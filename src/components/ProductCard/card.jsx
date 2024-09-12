import { useEffect, useState } from "react";
import "./dist/card.css";
import { useDeleteProductMutation, usePutProductMutation } from "../../store";
import { NavLink } from "react-router-dom";

export const ProductCard = ({ product, index, handleCheckboxChange, isSelected }) => {
    const [availability, setAvailability] = useState(product.quantity === 0 ? "Відсутнє" : "На складі");
    const [eye, setEye] = useState(product.display ? './img/Eye.svg' : './img/Invisible.svg');
    const [display, setDisplay] = useState(product.display);

    const [deleteProduct, { isLoading }] = useDeleteProductMutation();
    const [putProduct, { isLoading: isUpdating, isSuccess }] = usePutProductMutation();

    // Окремі стани редагування для артикулу і назви
    const [isEditingArticle, setIsEditingArticle] = useState(false);
    const [isEditingName, setIsEditingName] = useState(false);
    const [isEditingPrice, setIsEditingPrice] = useState(false);
    const [isEditingQuantity, setIsEditingQuantity] = useState(false);


    const [article, setArticle] = useState(product.article);
    const [name, setProductName] = useState(product.name);
    const [price, setPrice] = useState(product.price);
    const [quantity, setQuantity] = useState(product.quantity);


    const [drop, setDrop] = useState(false)


    const id = product._id;

    const ntStyle = {
        backgroundColor: index % 2 === 0 ? 'rgba(133, 212, 169, 0.5)' : 'rgba(182, 217, 198, 1)'
    };
    const tiStyle = {
        backgroundColor: index % 2 === 0 ? 'rgba(187, 237, 210, 0.5)' : 'rgba(206, 229, 216, 1)'
    };

    const closeDeleteMenu = () => {
        const deleteElement = document.getElementById("delete");
        deleteElement.style.opacity = "0";
        setTimeout(() => {
            deleteElement.style.display = "none";
        }, 400);
    };

    const handleDelete = async () => {
        try {
            await deleteProduct(product._id);
            closeDeleteMenu();
        } catch (error) {
            console.error('Failed to delete the product: ', error);
        } finally {
            window.location.reload();
        }
    };

    const formattedDate = new Date(product.createdAt).toLocaleDateString('uk-UA');

    const displayUpdate = async () => {
        try {
            const updatedProduct = {
                id,
                display: !display
            };
            setDisplay(!display);
            setEye(!display ? './img/Eye.svg' : './img/Invisible.svg');
            await putProduct(updatedProduct);
        } catch (err) {
            console.error("Failed to update product: ", err);
        }
    };

    const handleDoubleClickArticle = () => {
        setIsEditingArticle(true); // Активує режим редагування для артикулу
    };

    const handleDoubleClickName = () => {
        setIsEditingName(true); // Активує режим редагування для назви продукту
    };
    const handleDoubleClickPrice = () => {
        setIsEditingPrice(true); // Активує режим редагування для назви продукту
    };
    const handleDoubleClickQuantity = () => {
        setIsEditingQuantity(true); // Активує режим редагування для назви продукту
    };

    const handleChangeArticle = (e) => {
        setArticle(e.target.value); // Оновлює артикул при зміні тексту
    };

    const handleChangeName = (e) => {
        setProductName(e.target.value); // Оновлює назву продукту при зміні тексту
    };
    const handleChangePrice = (e) => {
        setPrice(e.target.value); // Оновлює назву продукту при зміні тексту
    };
    const handleChangeQuantity = (e) => {
        setQuantity(e.target.value); // Directly store the input value as a string
    };
    const handleKeyPressQuantity = async (e) => {
        if (e.key === 'Enter') {
            try {
                // Use eval to compute the expression entered by the user
                const result = eval(quantity);

                // Set the computed result as the new quantity value
                setQuantity(result.toString()); // Convert the result to a string and update state
                setIsEditingQuantity(false)
                try {
                    const card = {
                        id: product._id,
                        article: article,
                        name: name,
                        price: price,
                        quantity: result

                    }
                    await putProduct(card)
                } catch (e) {
                    console.error(e)

                }

            } catch (error) {
                console.error('Невірний вираз', error); // Handle errors for invalid expressions
            }

        }
    };

    const handleBlurArticle = () => {
        setIsEditingArticle(false); // Вимикає режим редагування артикулу при втраті фокусу
    };

    const handleBlurName = () => {
        setIsEditingName(false); // Вимикає режим редагування назви при втраті фокусу
    };

    const handleBlurPrice = () => {
        setIsEditingPrice(false); // Вимикає режим редагування назви при втраті фокусу
    };
    const handleBlurQuantity = () => {
        setIsEditingQuantity(false); // Вимикає режим редагування назви при втраті фокусу
    };


    const handleKeyPress = async (e) => {
        if (e.key === 'Enter') {
            setIsEditingArticle(false);
            setIsEditingName(false);
            setIsEditingPrice(false);

            try {
                const card = {
                    id: product._id,
                    article: article,
                    name: name,
                    price: price

                }
                await putProduct(card)
            } catch (e) {
                console.error(e)

            }

        }
    };


    const openDrop = () => {
        if (drop === false) {
            document.getElementById('drop_av').style.height = '10vh'
            setDrop(true)
        }
        else {
            document.getElementById('drop_av').style.height = '0vh'
            setDrop(false)


        }
    }

    const handleSpanClick = (value) => {
        setAvailability(value);
    };

    return (
        <div className="p_card">
            <div style={{ opacity: isSelected ? 1 : 0 }} className="delete_check">
                <input onChange={(event) => handleCheckboxChange(event, product._id)} type="checkbox" />
            </div>

            <div className="table_info" style={ntStyle}>001</div>

            {isEditingArticle ? (
                <input
                    type="text"
                    value={article}
                    onChange={handleChangeArticle}
                    onBlur={handleBlurArticle}
                    autoFocus
                    onKeyDown={handleKeyPress}
                />
            ) : (
                <div className="table_info" style={tiStyle} onDoubleClick={handleDoubleClickArticle}>
                    {article}
                </div>
            )}

            <div className="table_info" style={tiStyle}>{formattedDate}</div>

            {isEditingName ? (
                <input
                    type="text"
                    value={name}
                    onChange={handleChangeName}
                    onBlur={handleBlurName}
                    autoFocus
                    onKeyDown={handleKeyPress}
                />
            ) : (
                <div className="table_info" style={tiStyle} onDoubleClick={handleDoubleClickName}>
                    {name}
                </div>
            )}

            <div className="table_info" style={tiStyle}>{product.section?.section?.name}</div>
            <div className="table_info" style={tiStyle}>
                {product.section?.subSection?.name || '—'}
            </div>
            {isEditingPrice ? (
                <input
                    type="text"
                    value={price}
                    onChange={handleChangePrice}
                    onBlur={handleBlurPrice}
                    autoFocus
                    onKeyDown={handleKeyPress}
                />
            ) : (
                <div className="table_info" style={tiStyle} onDoubleClick={handleDoubleClickPrice}>
                    {price} грн
                </div>
            )}
            {isEditingQuantity ? (
                <input
                    type="text"
                    value={quantity}
                    onChange={handleChangeQuantity}
                    onBlur={handleBlurQuantity}
                    autoFocus
                    onKeyDown={handleKeyPressQuantity}
                />
            ) : (
                <div className="table_info" style={tiStyle} onDoubleClick={handleDoubleClickQuantity}>
                    {quantity}
                </div>
            )}
            <div onClick={openDrop} className="table_info" style={tiStyle}>
                {availability}
                <div id="drop_av" className="drop_availability">
                    <span onClick={() => handleSpanClick('На складі')}>На складі</span>
                    <span onClick={() => handleSpanClick('Не в наявності')}>Не в наявності</span>

                </div>
            </div>

            <div className="card_control">
                <img onClick={displayUpdate} src={eye} alt="Toggle Display" />
                <div className="sep_line"></div>
                <NavLink to={`/${product._id}`}><img src="./img/Edit.svg" alt="Edit Product" /></NavLink>
                <div className="sep_line"></div>
                <img src="./img/Delete.svg" alt="Delete Product" onClick={handleDelete} />
            </div>

            <div id="delete" className="delete_modal">
                <div className="modal_con">
                    <div className="delete_text">Ви дійсно бажаєте видалити?</div>
                    <div className="delete_btn_group">
                        <p onClick={handleDelete}>ТАК</p>
                        <div className="del_line"></div>
                        <p className="cancel" onClick={closeDeleteMenu}>НІ</p>
                    </div>
                </div>
            </div>
        </div>
    );
};