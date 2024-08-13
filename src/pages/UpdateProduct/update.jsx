import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { NavBar } from '../../components/NavBar/nav';
import { useGetProductQuery, usePutProductMutation } from '../../store';
import './dist/update.css';

export function Update() {
    const { id } = useParams();
    const { data, error, isLoading, refetch } = useGetProductQuery(id, { skip: false });

    const [name, setName] = useState('');
    const [price, setPrice] = useState('')
    const [description, setDescr] = useState('')

    const [activeIndex, setActiveIndex] = useState(0);


    const [putProduct, { isLoading: isUpdating, isSuccess }] = usePutProductMutation();

    useEffect(() => {
        // Перепитуємо дані при кожному рендері
        refetch();
    }, [refetch]);

    useEffect(() => {
        // Оновлюємо локальний стан при отриманні нових даних
        if (data?.product) {
            setName(data.product.name);
            setPrice(data.product.price);
            setDescr(data.product.description);

        }
    }, [data]);

    if (isLoading) return <div>Loading...</div>;
    if (error) return <div>Error: {error.message}</div>;

    const date = new Date(data?.product.createdAt);
    const formattedDate = date.toLocaleDateString('uk-UA', {
        day: '2-digit',
        month: '2-digit',
        year: 'numeric'
    });

    const handleClick = (index) => {
        setActiveIndex(index);
    };

    const points = [
        'Опис',
        'Характеристика',
        'Застосування',
        'Відгуки/запитання'
    ];



    const handleUpdate = async () => {
        try {
            const updatedProduct = {
                id,          // Ідентифікатор продукту
                name,        // Назва продукту
                price,       // Ціна продукту
                description // Опис продукту
            };
            await putProduct(updatedProduct);
            // Можна додати повідомлення про успіх або інші дії після успішного оновлення
        } catch (err) {
            console.error("Failed to update product: ", err);
        }
    };

    return (
        <div className='update_page'>
            <NavBar />
            <div className="update_field">
                <div className="left_update">
                    <div className="carusel_block">
                        <div className="carusel_view">
                            {/* Вміст каруселі */}
                        </div>
                        <div className="car_controls">controls</div>
                    </div>
                </div>
                <div className="right_update">
                    <div className="top_part">
                        <div className="top_left">
                            <span>Артикул: {data?.product.article}</span>
                            <span>Створено: {formattedDate}</span>
                        </div>
                        <div className="coments_btn">
                            <img src="./img/Chat Bubble.svg" alt="" />
                            <span>Коментарі</span>
                        </div>
                    </div>
                    <input 
                        className="up_input"
                        type="text"
                        placeholder="Назва товару..."
                        name="name"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                    />
                                        <input 
                        className="up_input"
                        type="text"
                        placeholder="Ціна"
                        name="name"
                        value={price}
                        onChange={(e) => setPrice(e.target.value)}
                    />
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
                    <textarea
                        className="text_area_up"
                        placeholder="Опис товару..."
                        name="description"
                        value={description}
                        onChange={(e) => setDescr(e.target.value)}
                    ></textarea>


                    <div className="up_control_con">
                        <div className="delete_btn">Видалити</div>
                        <div className="update_btn" onClick={handleUpdate}>{isUpdating ? 'Зберігається...' : 'Зберегти зміни'}</div>
                    </div>
                </div>

                
            </div>
        </div>
    );
}
