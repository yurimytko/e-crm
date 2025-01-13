
import { usePostSectionMutation } from '../../store';
import { useState, useRef } from 'react';

import { useAddPromotionMutation } from '../../store';

export default function PutCategory({catalog}) {

    const input = useRef()

    const [dragActive, setDragActive] = useState(false);

    const [name, setName] = useState(catalog?.name);

    const [photo, setPhoto] = useState([]);
   
    const [discount, setDiscount] = useState()

    const [addPromotion] = useAddPromotionMutation()


    function closeAddCat() {
        const menuElement = document.getElementById("put_category");
        menuElement.style.opacity = "0";
        setTimeout(() => {
            menuElement.style.display = "none";
            setName('');
            setPhoto([]);
        }, 100);
    }




    const handleInput = () => {
        input.current.click();
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
        const file = e.dataTransfer.files[0];
        if (file && (file.type === 'image/png' || file.type === 'image/jpeg')) {
            setPhoto(file);
        } else {
            alert('Only PNG and JPG images are allowed');
        }
    };


    const handleAddPromotion = async(e) => {
        e.stopPropagation();
        e.preventDefault();

        const upadetedSection = {
            id: catalog._id,
            discount: discount,
            isActive: discount ? true : false
        }

        try{
            await addPromotion(upadetedSection)
        }catch(e){
            console.log(e)
        }
    }

    return (
        <div id='put_category' className="add_category">
            <form className="add_cat_menu" >

                <div className="img_con ty">
                    <span className="titile_set">Добавити Зображення</span>
                    {photo.length === 0 ? (
                        <div
                            className={`drag_and_drop ${dragActive ? 'drag_active' : ''}`}
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
                                onChange={(e) => {
                                    const file = e.target.files[0];
                                    if (file && (file.type === 'image/png' || file.type === 'image/jpeg')) {
                                        setPhoto(file);
                                    }
                                }}
                            />
                        </div>
                    ) : (
                        <div
                            onDragOver={handleDragOver}
                            onDragLeave={handleDragLeave}
                            onDrop={handleDrop}
                            className={`uploaded_photo ${dragActive ? 'drag_active' : ''}`}
                        >
                            <img src={URL.createObjectURL(photo)} alt="Uploaded" className="preview_image" />
                        </div>
                    )}

                </div>

                <div className="set_con">
                    <span className="titile_set">Категорія</span>
                    <input value={catalog?.name} onChange={(e) => {setName(e.target.value)}} className="input_add" type="text" />
                </div>
                <div className="set_con">
                    <span className="titile_set">Знижка</span>
                    <input value={discount} onChange={(e) => {setDiscount(e.target.value)}} className="input_add" type="text" />
                </div>

                <div className="btn_group">
                    <button onClick={closeAddCat} type='button' className='button_cat cancel'>Скасувати</button>
                    <button type='button' onClick={handleAddPromotion} className='button_cat add'>Оновити</button>

                </div>

            </form>
        </div>
    );
}
