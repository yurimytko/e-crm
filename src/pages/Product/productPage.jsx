import "./dist/productPage.css";
import { NavBar } from "../../components/NavBar/nav";
import { ProductCard } from "../../components/ProductCard/card";
import { AddProductMenu } from "../../components/AddProduct/addProduct";
import { useGetProductsQuery } from "../../store";
import { Loader } from "../../components/Loader/loader";
import { useState, useEffect } from "react";
import { useDeleteProductsMutation } from "../../store";

export function ProductPage() {
    const [selectedIds, setSelectedIds] = useState([]);
    const [isSelected, setIsSelected] = useState(false);
    const [deleteProduct] = useDeleteProductsMutation();
    const [tags, setTags] = useState([]);
    const [inputValue, setInputValue] = useState('');
    const [showSearchButton, setShowSearchButton] = useState(false);
    const [activeFilter, setActiveFilter] = useState(null);
    const [selectedFilter, setSelectedFilter] = useState({
        article: null,
        creationDate: null,
        name: null,
        quantity: null,
        availability: null,
    });
    const [activeColumns, setActiveColumns] = useState({
        article: false,
        creationDate: false,
        name: false,
        quantity: false,
        availability: false,
    });

    const generateQueryString = () => {
        const sortBy = Object.keys(selectedFilter)
            .filter(key => selectedFilter[key] !== null)
            .join(',');
        const orderBy = Object.values(selectedFilter)
            .filter(value => value !== null)
            .join(',');
        return `?sortBy=${sortBy}&orderBy=${orderBy}`;
    };

    const { data = [], isLoading } = useGetProductsQuery(generateQueryString());

    const toggleFilter = (column) => {
        if (activeColumns[column]) {
            setSelectedFilter(prev => ({
                ...prev,
                [column]: null,
            }));
            setActiveColumns(prev => ({
                ...prev,
                [column]: false,
            }));
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
        const value = filterValue === 'Від меншого' ? 1 :      // Ascending
                      filterValue === 'Від більшого' ? -1 :    // Descending
                      filterValue === 'Від А до Я' ? 1 :       // Name: A to Z
                      filterValue === 'Від Я до А' ? -1 :      // Name: Z to A
                      filterValue === 'На складі' ? 1 :        // Availability: In stock
                      filterValue === 'Відсутнє' ? -1 :        // Availability: Out of stock
                      null;  // Default case for unrecognized filter
    
        setSelectedFilter({
            ...selectedFilter,
            [column]: value,
        });
        setActiveColumns({
            ...activeColumns,
            [column]: true,
        });
        setActiveFilter(null);
    };

    if (isLoading) {
        return <Loader />;
    }

    const handleButtonClick = () => {
        setIsSelected(!isSelected);
    };

    const openAddMenu = () => {
        document.getElementById("add_menu").style.display = "flex";
        setTimeout(() => {
            document.getElementById("add_menu").style.opacity = "1";
        }, 100);
    };

    const handleCheckboxChange = (event, id) => {
        const isChecked = event.target.checked;
        if (isChecked) {
            setSelectedIds(prevIds => [...prevIds, id]);
        } else {
            setSelectedIds(prevIds => prevIds.filter(ide => ide !== id));
        }
    };

    const Delete = async () => {
        try {
            await deleteProduct(selectedIds.join(','));
        } catch (e) {
            // Handle error
        }
    };

    const handleInputChange = (e) => {
        setInputValue(e.target.value);
    };

    const handleKeyDown = (e) => {
        if (e.key === 'Enter' && inputValue.trim()) {
            e.preventDefault();
            const newTags = [...tags, inputValue.trim()];
            setTags(newTags);
            setInputValue('');
            if (newTags.length > 0) {
                setShowSearchButton(true);
            }
        }
    };

    const handleTagClick = (index) => {
        const updatedTags = tags.filter((_, i) => i !== index);
        setTags(updatedTags);
        if (updatedTags.length === 0) {
            setShowSearchButton(false);
        }
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
                        <div className="tags_container">
                            {tags.map((tag, index) => (
                                <span
                                    key={index}
                                    className="tag"
                                    onClick={() => handleTagClick(index)}
                                >
                                    {tag}
                                    <span className="tag_remove">×</span>
                                </span>
                            ))}
                        </div>
                        <input
                            className="search_i"
                            type="text"
                            value={inputValue}
                            onChange={handleInputChange}
                            onKeyDown={handleKeyDown}
                            placeholder="Введіть тег і натисніть Enter"
                        />
                        {showSearchButton && (
                            <button className="search_button">Пошук</button>
                        )}
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
                        Артикул
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
                        Дата створення
                        {activeFilter === 'creationDate' && (
                            <div className="filter_block">
                                <p className="filter" onClick={() => handleFilterClick('creationDate', 'Від меншого')}>Від меншого</p>
                                <p className="filter" onClick={() => handleFilterClick('creationDate', 'Від більшого')}>Від більшого</p>
                            </div>
                        )}
                    </div>

                    <div
                        className={`table_titles ${activeFilter === 'name' || activeColumns.name ? 'active' : ''}`}
                        onClick={() => toggleFilter('name')}
                    >
                        Назва товару
                        {activeFilter === 'name' && (
                            <div className="filter_block">
                                <p className="filter" onClick={() => handleFilterClick('name', 'Від А до Я')}>Від А до Я</p>
                                <p className="filter" onClick={() => handleFilterClick('name', 'Від Я до А')}>Від Я до А</p>
                            </div>
                        )}
                    </div>

                    <div className="table_titles">Розділ</div>
                    <div className="table_titles">Під розділ</div>
                    <div
                        className={`table_titles ${activeFilter === 'price' || activeColumns.price ? 'active' : ''}`}
                        onClick={() => toggleFilter('price')}
                    >
                        Ціна
                        {activeFilter === 'price' && (
                            <div className="filter_block">
                                <p className="filter" onClick={() => handleFilterClick('price', 'Від меншого')}>Від меншого</p>
                                <p className="filter" onClick={() => handleFilterClick('price', 'Від більшого')}>Від більшого</p>
                            </div>
                        )}
                    </div>
                    <div className="table_titles">
                        Кількість
                    </div>
                    <div
                        className={`table_titles ${activeFilter === 'availability' || activeColumns.availability ? 'active' : ''}`}
                        onClick={() => toggleFilter('availability')}
                    >
                        Наявність
                        {activeFilter === 'availability' && (
                            <div className="filter_block">
                                <p className="filter" onClick={() => handleFilterClick('availability', 'На складі')}>На складі</p>
                                <p className="filter" onClick={() => handleFilterClick('availability', 'Відсутнє')}>Відсутнє</p>
                            </div>
                        )}
                    </div>
                </div>

                {/* Render your products here */}
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
