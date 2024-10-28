import { useRef, useImperativeHandle, forwardRef, useState } from "react";

import { useGetSectionsQuery } from "../../store";

import { useAddProductMutation } from "../../store";

const generateRandomArticle = () => {
    return Math.floor(1000 + Math.random() * 9000).toString();
};

const AddModel = forwardRef(function AddModel(props, ref) {


    const [activeIndex, setActiveIndex] = useState(0);

    const [selectedFiles, setSelectedFiles] = useState([]);



    const [description, setDescr] = useState()
    const [modelName, setModelName] = useState('')
    const [price, setPrice] = useState('')
    const [quantity, setQuantity] = useState('')


    const dialog = useRef();

    useImperativeHandle(ref, () => {
        return {
            open() {
                dialog.current.showModal();
                dialog.current.style.display = "flex";
            }
        };
    });


    const closeModal = () => {
        dialog.current.close();
        dialog.current.style.display = "none";
    };



    const points = ['Опис', 'Характеристика', 'Застосування'];

    const handleClick = (index) => {
        setActiveIndex(index);
    };


    const handleFileChange = (e) => {
        const files = Array.from(e.target.files);
        setSelectedFiles(files);
    };


    const handleSave = (e) => {
        e.preventDefault()

        const newModel = {
          modelName,
          price: Number(price),
          quantity: Number(quantity),
          description,
        };

        const existingModels = JSON.parse(localStorage.getItem('models')) || [];
    

        existingModels.push(newModel);

        localStorage.setItem('models', JSON.stringify(existingModels));
    

        setModelName('');
        setPrice('');
        setQuantity('');
        setDescr('');
      };


    return(
        <dialog ref={dialog}>
            <form>
                <div className="modal_left_part">
                    <div className="img_con">
                        <span className="setting_up">Добавити Зображення</span>
                        <div className="upload_img_con">
                            <label htmlFor="file_input">
                                <span style={{ color: 'rgba(33, 150, 83, 1)', cursor: 'pointer' }}>Завантажте фото</span> або перетягніть файл
                            </label>
                            <p>Jpg, Png / Макс 8 мб / Мін 214px х 214px</p>

                            <input
                                name ="image"
                                id="file_input"
                                type="file"
                                accept=".jpg, .jpeg, .png"
                                style={{ display: 'none' }}
                                onChange={handleFileChange}
                                multiple 
                            />
                        </div>
                    </div>
                    <div className="product_price_con">
                        <span className="setting_up">Назва товару</span>
                        <input value={modelName} onChange={(e) => {setModelName(e.target.value)}} name="name" type="text" placeholder="Назва..." className="input" />
                    </div>
                    <div className="product_price_con">
                        <span className="setting_up">Ціна</span>
                        <input name="price" value={price} onChange={(e) => {setPrice(e.target.value)}} type="number" placeholder="Ціна..." className="input" />
                    </div>
                </div>

                <div className="sep_add_line"></div>

                <div className="modal_left_part">
                    <div className="options_con">
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
                                <textarea  name="description" id="" placeholder="Опис..." value={description} onChange={(e) => {setDescr(e.target.value)}}/>
                            </div>
                        )}
                        {activeIndex === 1 && (
                            <div className="product_price_con">
                                <span className="setting_up">Опис</span>
                                <input  type="number" placeholder="xx шт" className="input" />
                            </div>
                        )}
                        {activeIndex === 2 && (
                            <div className="product_price_con">
                                <span className="setting_up">Посилання на відео</span>
                                <input type="text" placeholder="Посилання..." className="input" name="video"/>
                            </div>
                        )}


                    </div>
                    <div className="product_price_con">
                        <span className="setting_up">Кількість на складі</span>
                        <input name="quantity" value={quantity} onChange={(e) => {setQuantity(e.target.value)}} type="number" placeholder="xx шт" className="input" />
                    </div>

                    <div className="add_btn_con">
                        <button type="button" className="cancel_add" onClick={closeModal}>Скасувати</button>

                        <button onClick={handleSave} className="add_product_btn">Додати</button>
                    </div>

                </div>
            </form>
        </dialog>
)});

export default AddModel;
