import "./dist/addSub.css";
import { useState } from "react";
import { usePostSubSectionMutation } from "../../store";
import { useParams } from "react-router-dom";

export function AddSub({ id }) {
    const { catalogId } = useParams(); // Example of getting id from route if needed

    const [name, setName] = useState("");
    const [photo, setPhoto] = useState(null); // Default is null

    const [subr] = usePostSubSectionMutation();

    function closeAddCat() {
        const menuElement = document.getElementById("add_sub");
        menuElement.style.opacity = "0";
        setTimeout(() => {
            menuElement.style.display = "none";
        }, 100);
    }

    const addSub = async () => {
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

    return (
        <div id="add_sub" className="add_category">
            <div className="add_cat_menu">
                <img
                    onClick={closeAddCat}
                    className="close_img"
                    src="/img/close_menu.svg"
                    alt="Close menu"
                />

                <span>Введіть назву підкатегорії</span>

                <input
                    type="text"
                    placeholder="Назва"
                    onChange={(e) => setName(e.target.value)}
                />
                <div className="img_con">
                    {photo ? (
                        <div className="image_preview">
                            {photo instanceof File && (
                                <img
                                    src={URL.createObjectURL(photo)} // Only create object URL if photo is valid
                                    alt="Прев'ю фото"
                                    style={{ maxWidth: "100%", maxHeight: "214px" }}
                                />
                            )}
                            <button onClick={() => setPhoto(null)}>
                                Завантажити інше фото
                            </button>
                        </div>
                    ) : (
                        <div className="drag_area">
                            <label htmlFor="file_input">
                                <span
                                    style={{ color: "rgba(33, 150, 83, 1)", cursor: "pointer" }}
                                >
                                    Завантажте фото
                                </span>{" "}
                                або перетягніть файл
                            </label>
                            <p>Jpg, Png / Макс 8 мб / Мін 214px х 214px</p>

                            <input
                                id="file_input"
                                type="file"
                                accept=".jpg, .jpeg, .png"
                                style={{ display: "none" }}
                                onChange={handleFileChange}
                            />
                        </div>
                    )}
                </div>
                <button className="cat_btn" onClick={addSub}>
                    Створити
                </button>
            </div>
        </div>
    );
}
