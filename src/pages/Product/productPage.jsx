import "./dist/productPage.css";
import { NavBar } from "../../components/NavBar/nav";
import { ProductCard } from "../../components/ProductCard/card";
import { AddProductMenu } from "../../components/AddProduct/addProduct";
import { useGetProductsQuery } from "../../store";
import { Loader } from "../../components/Loader/loader";
export function ProductPage() {

    const {data =[], isLoading} = useGetProductsQuery();

    console.log(data)

    if (isLoading) {
        return <Loader/>;
      }



  

   

    const openAddMenu =() => {
        document.getElementById("add_menu").style.display = "flex"
        

        setTimeout(() => {
        
            document.getElementById("add_menu").style.opacity = "1"


            
        }, 100);
    }



    

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
                </div>

                <div className="table_section">
                    <div className="table_titles">HT</div>
                    <div className="table_titles">Артикул</div>
                    <div className="table_titles">Дата Створення</div>
                    <div className="table_titles">Назва товару</div>
                    <div className="table_titles">Ціна</div>
                    <div className="table_titles">Кількість</div>
                    <div className="table_titles">Наявність</div>
                </div>
                <div className="products_section">
                    {!isLoading && data.products && data.products.length > 0 ? (
                        data.products.map((product) => (
                            <ProductCard key={product._id} product={product} index={data.products.indexOf(product)} />
                        ))
                    ) : (
                        !isLoading && <div className="no_products">Немає доступних продуктів</div>
                    )}
                </div>
            </div>
            <AddProductMenu/>
        </div>
    );
}