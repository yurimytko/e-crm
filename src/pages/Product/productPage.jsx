import "./dist/productPage.css";
import { NavBar } from "../../components/NavBar/nav";
import { ProductCard } from "../../components/ProductCard/card";
import { AddProductMenu } from "../../components/AddProduct/addProduct";
import { useGetProductsQuery } from "../../store";
import { Loader } from "../../components/Loader/loader";
import { useState, useEffect, useRef } from "react";
import { useDeleteProductsMutation } from "../../store";
import { useLazyExportProductQuery, useLazyExportProductByIdQuery } from "../../store/exportApi";

export function ProductPage() {
    const [page, setPage] = useState(1);
    const [selectedIds, setSelectedIds] = useState([]);
    const [isSelected, setIsSelected] = useState(false);
    const [deleteProduct] = useDeleteProductsMutation();

    const [selectedColumns, setSelectedColumns] = useState([]);
    const [filterMenus, setFilterMenus] = useState({});
    const [url, setUrl] = useState('')
    const [article, setArticle] = useState()
    const productsSectionRef = useRef()

    const [triggerExport, { data, error, isloading }] = useLazyExportProductQuery();
    const [triggerExportById] = useLazyExportProductByIdQuery()

    const { data: products = [], isLoading, isFetching } = useGetProductsQuery(`?${url}`);


    const articelFilter = (e) => {

        if (e.key === 'Enter') {
            setUrl(`article=${article}`)
        }
    }



    const handleClick = async () => {
        try {
            let result;
            if (isSelected && selectedIds.length > 0) {
                result = await triggerExportById({id:selectedIds.join(',')}); // Export by selected IDs
            } else {
                result = await triggerExport(); // Export without specific IDs
            }

            if (result.error) {
                console.error("Error exporting product:", result.error);
            } else {
                console.log("Raw CSV Data:", result.data);

                const blob = new Blob([result.data], { type: 'text/csv;charset=utf-8;' });

                const link = document.createElement('a');
                const url = URL.createObjectURL(blob);
                link.href = url;
                link.setAttribute('download', 'Продукти.csv');
                document.body.appendChild(link);
                link.click();
                document.body.removeChild(link);
            }
        } catch (err) {
            console.error("Error exporting product:", err);
        }
    };



    const handleButtonClick = () => {
        setIsSelected(!isSelected);
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
            console.error(e)
        }
    };

    const openAddMenu = () => {
        document.getElementById("add_menu").style.display = "flex";
        setTimeout(() => {
            document.getElementById("add_menu").style.opacity = "1";
        }, 100);
    };







    const handleScroll = () => {
        if (productsSectionRef.current) {
            const { scrollTop, scrollHeight, clientHeight } = productsSectionRef.current;
            if (scrollTop + clientHeight >= scrollHeight / 2) {
                console.log('Scrolled to the bottom of the block');
            }
        }
    };


    const handleColumnClick = (column) => {
        setFilterMenus((prevMenus) => ({
            ...prevMenus,
            [column]: !prevMenus[column], // Toggle the filter menu for the column
        }));

        setSelectedColumns((prevSelected) =>
            prevSelected.includes(column)
                ? prevSelected.filter((col) => col !== column)
                : [...prevSelected, column]
        );
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
                        <input className="search_i" type="text" placeholder="Введіть тег і натисніть Enter" />
                    </div>
                    <button className="select_btn" onClick={handleButtonClick}><img src="./img/Group 20574425.svg" alt="" /> Виділити товар</button>
                    <button style={{ opacity: isSelected ? 1 : 0 }} onClick={Delete} className="delete"><img src="./img/Delete (1).svg" alt="" />Видалити виділене</button>
                </div>

                <div className="table_section">
                    <div></div>
                    <div className="table_titles">НТ</div>
                    <div className={`table_titles ${selectedColumns.includes("article") ? 'selected' : ''
                        }`}
                        onClick={() => handleColumnClick("article")}>Артикул
                        {filterMenus["article"] && (
                            <div onClick={(e) => { e.stopPropagation() }} className="filter_menu">
                                <input onKeyDown={articelFilter} type="text" placeholder="Артикуль" />
                            </div>
                        )}</div>
                    <div className={"table_titles"}>Дата створення</div>
                    <div className={`table_titles `}>Назва товару</div>
                    <div className="table_titles">Розділ</div>
                    <div className="table_titles">Під розділ</div>
                    <div className={`table_titles`}>Ціна</div>
                    <div className="table_titles">Кількість</div>
                    <div className={`table_titles`}>Наявність</div>
                    <div className="export_btn" onClick={handleClick}><img src="/img/Export CSV.svg" alt="" /></div>

                </div>
                <div className="products_section" ref={productsSectionRef} onScroll={handleScroll}>
                    {isLoading&&<Loader/>}
                    {!isLoading && products?.products?.length > 0 ? (
                        products.products.map((product, index) => (
                            <ProductCard
                                isSelected={isSelected}
                                handleCheckboxChange={handleCheckboxChange}
                                key={product._id}
                                product={product}
                                index={index}
                            />
                        ))
                    ) : (
                        !isLoading && <div className="no_products">Немає доступних продуктів</div>
                    )}
                </div>

            </div >
            <AddProductMenu />
        </div >
    );
}
