import "./dist/productPage.css";
import { NavBar } from "../../components/NavBar/nav";
import { ProductCard } from "../../components/ProductCard/card";
import { AddProductMenu } from "../../components/AddProduct/addProduct";
import { useGetProductsQuery } from "../../store";
import { Loader } from "../../components/Loader/loader";
import { useState, useRef, useEffect  } from "react";
import { useDeleteProductsMutation } from "../../store";




export function ProductPage() {

    const { data = [], isLoading } = useGetProductsQuery();
    const [selectedIds, setSelectedIds] = useState([])
    const [isSelected, setIsSelected] = useState(false);

    const [deleteProduct, { isloading }] = useDeleteProductsMutation();



    const productCardRef = useRef(null);

    const [activeFilter, setActiveFilter] = useState(null); // Активна колонка з відкритим блоком фільтрів
    const [selectedFilter, setSelectedFilter] = useState({
        article: 'Артикул',
        creationDate: 'Дата Створення',
        availability: 'Наявність',
    });
    const [activeColumns, setActiveColumns] = useState({
        article: false,
        creationDate: false,
        availability: false,
    }); // Стан для відстеження активних колонок

    const toggleFilter = (column) => {
        // Якщо колонка вже активна, скидаємо фільтр
        if (activeColumns[column]) {
            setSelectedFilter({
                ...selectedFilter,
                [column]: column === 'article' ? 'Артикул' :
                    column === 'creationDate' ? 'Дата Створення' :
                        column === 'availability' ? 'Наявність' : '',
            });
            setActiveColumns({
                ...activeColumns,
                [column]: false, // Вимикаємо активність колонки
            });
        } else {
            setActiveFilter(activeFilter === column ? null : column);
        }
    };

    
    useEffect(() => {
        const logActiveFilters = () => {
            const activeFilters = Object.keys(activeColumns).filter(column => activeColumns[column]);
            const filters = activeFilters.reduce((acc, column) => {
                acc[column] = selectedFilter[column];
                return acc;
            }, {});
            console.log('Active Filters:', filters);
        };

        logActiveFilters();
    }, [activeColumns, selectedFilter]);

    const handleFilterClick = (column, filterValue) => {
        setSelectedFilter({
            ...selectedFilter,
            [column]: filterValue,  // Оновлюємо фільтр для конкретної колонки
        });
        setActiveColumns({
            ...activeColumns,
            [column]: true,  // Робимо колонку активною
        });
        setActiveFilter(null);  // Закриваємо блок після вибору фільтра
    };


    if (isLoading) {
        return <Loader />;
    }






    const handleButtonClick = () => {
        setIsSelected(!isSelected);
    };


    const openAddMenu = () => {
        document.getElementById("add_menu").style.display = "flex"


        setTimeout(() => {

            document.getElementById("add_menu").style.opacity = "1"



        }, 100);
    }







    const handleCheckboxChange = (event, id) => {
        const isChecked = event.target.checked;

        if (isChecked) {
            setSelectedIds((prevIds) => [...prevIds, id]);
            console.log(selectedIds)


        } else {
            setSelectedIds((prevIds) => prevIds.filter((ide) => ide !== id));
            console.log(selectedIds)

        }
    };


    const Delete = async () => {
        try {
            await deleteProduct(selectedIds.join(','))
        } catch (e) {

        }
    }


    const handleFilterBlockClick = (event) => {
        event.stopPropagation(); // зупиняє поширення кліку
    };




    return (
        <div className="product_page">
            <NavBar />
            <div className="table_part">
                <div className="page_title">Список товарів</div>
                <div className="control_panel">
                    <button onClick={openAddMenu} className="add_product">
                        <img src="./img/plus.png" alt="" />
                        <p className="btn_text">Додати товар</p>
                    </button>
                    <div className="search_con">
                        <input className="search_i" type="text" />
                        <img className="search_img" src="./img/search.png" alt="" />
                    </div>
                    <button className="select_btn" onClick={handleButtonClick}><img src="./img/Group 20574425.svg" alt="" /> Виділити товар</button>

                    <button style={{ opacity: isSelected ? 1 : 0 }} onClick={Delete} className="delete"><img src="./img/Delete (1).svg" alt="" />Видалити виділене</button>
                </div>

                <div className="table_section">
                    <div></div>
                    <div className="table_titles">НТ</div>

                    <div
                        className={`table_titles ${activeFilter === 'article' || activeColumns.article ? 'active' : ''}`}
                        onClick={() => toggleFilter('article')}
                    >
                        {selectedFilter.article}
                        {activeFilter === 'article' && (
                            <div className="filter_block">
                                <p className="filter" onClick={() => handleFilterClick('article', 'Від меншого')}>Від меншого</p>
                                <p className="filter" onClick={() => handleFilterClick('article', 'Від більшого')}>Від більшого</p>
                            </div>
                        )}
                    </div>

                    <div
                        className={`table_titles ${activeFilter === 'creationDate' || activeColumns.creationDate ? 'active' : ''}`}
                        onClick={() => toggleFilter('creationDate')}
                    >
                        {selectedFilter.creationDate}
                        {activeFilter === 'creationDate' && (
                            <div className="filter_block">
                                <p className="filter" onClick={() => handleFilterClick('creationDate', 'Від меншого')}>Від меншого</p>
                                <p className="filter" onClick={() => handleFilterClick('creationDate', 'Від більшого')}>Від більшого</p>
                            </div>
                        )}
                    </div>

                    <div className="table_titles">Назва товару</div>

                    <div className="table_titles">Розділ</div>

                    <div className="table_titles">Під розділ</div>

                    <div className="table_titles">Ціна</div>

                    <div className="table_titles">Кількість</div>

                    <div
                        className={`table_titles ${activeFilter === 'availability' || activeColumns.availability ? 'active' : ''}`}
                        onClick={() => toggleFilter('availability')}
                    >
                        {selectedFilter.availability}
                        {activeFilter === 'availability' && (
                            <div className="filter_block">
                                <p className="filter" onClick={() => handleFilterClick('availability', 'На складі')}>На складі</p>
                                <p className="filter" onClick={() => handleFilterClick('availability', 'Відсутнє')}>Відсутнє</p>
                            </div>
                        )}
                    </div>
                </div>
                <div className="products_section">
                    {!isLoading && data.products && data.products.length > 0 ? (
                        data.products.map((product) => (
                            <ProductCard isSelected={isSelected} handleCheckboxChange={handleCheckboxChange} key={product._id} product={product} index={data.products.indexOf(product)} />
                        ))
                    ) : (
                        !isLoading && <div className="no_products">Немає доступних продуктів</div>
                    )}
                </div>
            </div>
            <AddProductMenu />
        </div>
    );
}