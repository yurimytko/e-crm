import { useRef, useImperativeHandle, forwardRef, useState, useEffect } from "react";

import { usePostImgMutation } from "../../store";



const AddModel = forwardRef(function AddModel({ setModels }, ref) {
    const input = useRef()
    const [dragActive, setDragActive] = useState(false);


    const [addImg, { data: img, isLoading: loading, Error: error }] = usePostImgMutation()


    const [activeIndex, setActiveIndex] = useState(0);

    const [selectedFiles, setSelectedFiles] = useState([]);

    const [imgId, setImgId] = useState([])

    const [promotion, setPromotion] = useState({ isActive: false, discount: '' })


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
        setSelectedFiles([])
    };



    const points = ['Опис', 'Характеристика', 'Застосування'];

    const handleClick = (index) => {
        setActiveIndex(index);
    };


    const handleFileChange = async (e) => {
        const files = Array.from(e.target.files);
        const validFiles = files.filter(file => file.type === 'image/png' || file.type === 'image/jpeg');

        if (validFiles.length > 0) {
            setSelectedFiles(prevFiles => [...prevFiles, ...validFiles]);
        } else {
            alert('Only PNG and JPG images are allowed');
        }

        console.log(files);

        try {
            const formData = new FormData();
            files.forEach((file, index) => {
                formData.append('image', file);
            });

            const response = await addImg(formData).unwrap();
            console.log(response);

            if (response) {
                setImgId(response.images);
            }
        } catch (error) {
            console.error('Error uploading images:', error);
        }
    };


    useEffect(() => {
        console.log(imgId)
    }, [imgId])


    const handleSave = (e) => {
        e.preventDefault();
        e.stopPropagation();

        const newModel = {
            modelName,
            price: Number(price),
            quantity: Number(quantity),
            description,
            image: imgId,
            promotion: promotion
        };

        setModels((prevModels) => {
            const updatedModels = [...prevModels, newModel];

            return updatedModels;
        });


        setModelName('');
        setPrice('');
        setQuantity('');
        setDescr('');
        setSelectedFiles([])
        closeModal()
    };

    const handelPromotion = (e) => {
        const value = e.target.value;


        if (value === '') {
            setPromotion(prevValues => ({
                ...prevValues,
                isActive: false,
                discount: ''
            }));
        } else {
            setPromotion(prevValues => ({
                ...prevValues,
                isActive: true,
                discount: value
            }));
        }


        console.log(promotion);
    };


    useEffect(() => {
        console.log(promotion)

    }, [promotion])


    const handleDragOver = (e) => {
        e.preventDefault();
        setDragActive(true);
    };

    const handleDragLeave = () => {
        setDragActive(false);
    };

    const handleDrop = async(e) => {
        e.preventDefault();
        setDragActive(false);

        const files = Array.from(e.dataTransfer.files).filter(file =>
            file.type === 'image/png' || file.type === 'image/jpeg'
        );

        if (files.length > 0) {
            setSelectedFiles(prevFiles => [...prevFiles, ...files]);
        } else {
            alert('Only PNG and JPG images are allowed');
        }

        try {
            const formData = new FormData();
            files.forEach((file, index) => {
                formData.append('image', file);
            });

            const response = await addImg(formData).unwrap();
            console.log(response);

            if (response) {
                setImgId(response.images);
            }
        } catch (error) {
            console.error('Error uploading images:', error);
        }
    };

    const handleInput = () => {
        input.current.click();
    };


    const handleImageClick = (indexToRemove) => {
        setSelectedFiles(prevFiles => prevFiles.filter((_, index) => index !== indexToRemove));
    };


    return (
        <dialog ref={dialog}>
            <form>
                <div className="modal_left_part">
                    <div className="img_con y">
                        <span className="setting_up y">Добавити Зображення</span>

                        {selectedFiles.length === 0 ? (
                            <div
                                className={`upload_img_con ${dragActive ? 'drag_active' : ''}`}
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
                                    multiple
                                    onChange={handleFileChange}
                                />
                            </div>
                        ) : (
                            <div
                                onDragOver={handleDragOver}
                                onDragLeave={handleDragLeave}
                                onDrop={handleDrop}
                                className={`uploaded_photo_p ${dragActive ? 'drag_active' : ''}`}
                            >
                                {selectedFiles.map((file, index) => (
                                    <div className="img_wrapper" key={index}>
                                        <img
                                            src={URL.createObjectURL(file)}
                                            alt={`Uploaded ${index}`}
                                            className="preview_image_p"
                                            onClick={() => handleImageClick(index)}
                                        />
                                    </div>
                                ))}
                            </div>
                        )}
                    </div>

                    <div className="product_price_con">
                        <span className="setting_up">Назва товару</span>
                        <input value={modelName} onChange={(e) => { setModelName(e.target.value) }} name="name" type="text" placeholder="Назва..." className="input" />
                    </div>
                    <div className="product_price_con">
                        <span className="setting_up">Ціна</span>
                        <input name="price" value={price} onChange={(e) => { setPrice(e.target.value) }} type="number" placeholder="Ціна..." className="input" />
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
                                <textarea name="description" id="" placeholder="Опис..." value={description} onChange={(e) => { setDescr(e.target.value) }} />
                            </div>
                        )}
                        {activeIndex === 1 && (
                            <div className="product_price_con">
                                <span className="setting_up">Опис</span>
                                <input type="number" placeholder="xx шт" className="input" />
                            </div>
                        )}
                        {activeIndex === 2 && (
                            <div className="product_price_con">
                                <span className="setting_up">Посилання на відео</span>
                                <input type="text" placeholder="Посилання..." className="input" name="video" />
                            </div>
                        )}


                    </div>
                    <div className="product_price_con">
                        <span className="setting_up">Кількість на складі</span>
                        <input name="quantity" value={quantity} onChange={(e) => { setQuantity(e.target.value) }} type="number" placeholder="xx шт" className="input" />
                    </div>
                    <div className="product_price_con">
                        <span className="setting_up">Додати знижку</span>
                        <input value={promotion.discount} onChange={handelPromotion} type="text" placeholder="xx %" className="input" />
                    </div>

                    <div className="add_btn_con">
                        <button type="button" className="cancel_add" onClick={closeModal}>Скасувати</button>

                        <button onClick={handleSave} type="button" className="add_product_btn">Додати</button>
                    </div>

                </div>
            </form>
        </dialog>
    )
});

export default AddModel;
