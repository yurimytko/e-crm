import "./dist/packsCard.css"
import { useState } from "react";
import { NavLink } from "react-router-dom";

import { usePutPacksMutation, useDeletePacksMutation } from "../../store/packsApi";

export function PackCard({ pack, getPackId, isSelected, handleCheckboxChange }) {

    const [eye, setEye] = useState(pack.display ? './img/Eye.svg' : './img/Invisible.svg');

    const [display, setDisplay] = useState(pack.display)

    const [isEditingArticle, setIsEditingArticle] = useState(false);
    const [isEditingName, setIsEditingName] = useState(false);
    const [isEditingPrice, setIsEditingPrice] = useState(false);
    const [isEditingQuantity, setIsEditingQuantity] = useState(false);


    const [article, setArticle] = useState(pack.article);
    const [name, setProductName] = useState(pack.packName);
    const [price, setPrice] = useState(pack.price);
    const [quantity, setQuantity] = useState(pack.quantity);




    const [putPack] = usePutPacksMutation()
    const [deletePack] = useDeletePacksMutation()




    const openUpMenu = () => {
        const menuElement = document.getElementById("up_pack");
        menuElement.style.display = "flex";

        setTimeout(() => {
            menuElement.style.opacity = "1";

        }, 300);
    };



    const putPackFunc = async () => {
        setDisplay(!display)
        console.log("hello")
        try {
            const packs = {
                id: pack._id,
                display: display
            }
            await putPack(packs)
        } catch (e) {
            console.log(e)
        }
    }

    const deletePackFunction = async () => {
        try {
            await deletePack({ id: pack._id })
        } catch (e) {
            console.error(e)
        }
    }


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
                        id: pack._id,
                        article: article,
                        packName: name,
                        price: price,
                        quantity: result

                    }
                    await putPack(card)
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
                    id: pack._id,
                    article: article,
                    packName: name,
                    price: price

                }
                await putPack(card)
            } catch (e) {
                console.error(e)

            }

        }
    };


    const formData = new Date(pack.createdAt).toLocaleDateString()

    return (
        <div className="pack_card">
            <div style={{ opacity: isSelected ? 1 : 0 }} className="div1 delete_check">
                <input onChange={(event) => handleCheckboxChange(event, pack._id)} type="checkbox" />
            </div>
            <div class="div2 packs_column_title_card" onClick={putPackFunc} id='id'>НТ</div>
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
                <div className="div3 packs_column_title_card" onDoubleClick={handleDoubleClickArticle}>
                    {article}
                </div>
            )}
            <div class="div4 packs_column_title_card">{formData} </div>
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
                <div className="div5 packs_column_title_card" onDoubleClick={handleDoubleClickName}>
                    {name}
                </div>
            )}
            <div class="div6 packs_column_title_card packs_product">
                {
                    pack?.products.map((item, index) => (
                        <span>{item.quantity}x {item?.product.name}</span>
                    ))
                }
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
                <div className="div9 packs_column_title_card" onDoubleClick={handleDoubleClickPrice}>
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
                <div className="div10 packs_column_title_card"  onDoubleClick={handleDoubleClickQuantity}>
                    {quantity}
                </div>
            )}
            <div class="div11 packs_column_title_card">Наявніть</div>
            <div className="card_control packs_control">
                <img onClick={putPackFunc} src={eye} alt="Toggle Display" />
                <div className="sep_line"></div>
                <div>
                    <img
                        onClick={() => {
                            getPackId(pack._id); // Виклик getPackId
                            openUpMenu(); // Виклик openUpMenu
                        }}
                        src="./img/Edit.svg"
                        alt="Edit Product"
                    />
                </div>
                <div className="sep_line"></div>
                <img src="./img/Delete.svg" alt="Delete Product" onClick={deletePackFunction} />
            </div>
        </div>
    )
}