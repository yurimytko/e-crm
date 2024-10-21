import "./upSec.css"

export function UpdateSection(){
    import './dist/addCat.css'

import { usePostSectionMutation } from '../../store';
import { useState } from 'react';
import { isAction } from '@reduxjs/toolkit';

export default function AddCategory() {

    const [name, setName] = useState('');
    const [photo, setPhoto] = useState(null);

    const [promotion, setPromotion] = useState({ isActive: false, discount: '' });

    const [createCategory, { data, isLoading, error }] = usePostSectionMutation();

    function closeAddCat() {
        const menuElement = document.getElementById("add_category");
        menuElement.style.opacity = "0";
        setTimeout(() => {
            menuElement.style.display = "none";
            setName('');
            setPhoto(null);
        }, 100);
    }



    function addPromotion(e) {
        setPromotion(prevPromotion => ({
            ...prevPromotion,
            isActive: true,
            discount: e.target.value
        }));

        if(e.target.value === ''){
            setPromotion(prevPromotion => ({
                ...prevPromotion,
                isActive: false,
                discount: e.target.value
            }));
        }

        console.log(promotion)
    }


    const addSection = async () => {
        try {
            const formData = new FormData();
            formData.append('image', photo);
            formData.append('name', name);
            formData.append('promotion', JSON.stringify(promotion)); 
    
            await createCategory(formData);
            closeAddCat();

            console.log(formData)
        } catch (e) {
            console.log(e);
        }
    };

    const handleFileChange = (event) => {
        const file = event.target.files[0];
        setPhoto(file);
    };

    return (
        <div id='add_category' className="add_category">
            <div className="add_cat_menu">
                <img
                    onClick={closeAddCat}
                    className="close_img"
                    src="./img/close_menu.svg"
                    alt="Close menu"
                />

                <div className="img_con">
                    {photo ? (
                        <div className="image_preview">
                            <img
                                src={URL.createObjectURL(photo)}
                                alt="Прев'ю фото"
                                style={{ maxWidth: '100%', maxHeight: '214px' }} // Стиль для прев'ю
                            />
                            <button onClick={() => setPhoto(null)}>Завантажити інше фото</button>
                        </div>
                    ) : (
                        <div className="drag_area">
                            <label htmlFor="file_input">
                                <span style={{ color: 'rgba(33, 150, 83, 1)', cursor: 'pointer' }}>Завантажте фото</span> або перетягніть файл
                            </label>
                            <p>Jpg, Png / Макс 8 мб / Мін 214px х 214px</p>

                            <input
                                id="file_input"
                                type="file"
                                accept=".jpg, .jpeg, .png"
                                style={{ display: 'none' }}
                                onChange={handleFileChange}
                            />
                        </div>
                    )}
                </div>

                <span>Категорія</span>

                <input type="text" placeholder='Назва' onChange={(e) => { setName(e.target.value) }} />
                <span>Знижка</span>

                <input type="text" placeholder='Назва' onChange={addPromotion} />



                <button className='cat_btn' onClick={addSection}>Створити</button>
            </div>
        </div>
    );
}

}