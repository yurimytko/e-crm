import "./dist/addSub.css";
import { useState, useRef } from "react";
import { usePostSubSectionMutation } from "../../store";
import { useParams } from "react-router-dom";

export function AddSub({ id }) {
    const { catalogId } = useParams(); // Example of getting id from route if needed
    const input = useRef()

    const [name, setName] = useState("");
    const [photo, setPhoto] = useState(null); // Default is null

    const [subr] = usePostSubSectionMutation();

    const [dragActive, setDragActive] = useState(false);

    function closeAddCat() {
        const menuElement = document.getElementById("add_sub");
        menuElement.style.opacity = "0";
        setTimeout(() => {
            menuElement.style.display = "none";
        }, 100);
    }

    const addSub = async (e) => {
        e.preventDefault()
        try {
            const formData = new FormData();

            formData.append("name", name);
            if (photo) {
                formData.append("image", photo);
            }

            closeAddCat();
            await subr({ id, formData });

            console.log([...formData.entries()]);
        } catch (e) {
            console.error(e);
        }
    };

    const handleFileChange = (event) => {
        const file = event.target.files[0];
        setPhoto(file);
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

    const handleInput = () => {
        input.current.click();
    };

    return (
        <div id="add_sub" className="add_category">
            <form className="add_cat_menu" onSubmit={addSub}>

                <div className="img_con ty">
                    <span className="titile_set">Добавити Зображення</span>
                    {!photo ? (
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
                    <span className="titile_set">Під категорія</span>
                    <input onChange={(e) => { setName(e.target.value) }} className="input_add" type="text" />
                </div>

                <div className="btn_group">
                    <button onClick={closeAddCat} type='button' className='button_cat cancel'>Скасувати</button>
                    <button className='button_cat add'>Добавити</button>

                </div>

            </form>
        </div>
    );
}
