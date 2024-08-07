import "./dist/productPage.css";
import { NavBar } from "../../components/NavBar/nav";
import { ProductCard } from "../../components/ProductCard/card";
import { AddProductMenu } from "../../components/AddProduct/addProduct";
import Cookies from 'js-cookie';

import { useGetProductsQuery } from "../../store";
import { Loader } from "../../components/Loader/loader";
export function ProductPage() {

    const {data =[], isLoading} = useGetProductsQuery();

    console.log(data.products)

    if (isLoading) {
        return <div>Loading...</div>;
      }


      // JWT токен
    const token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NmFmMzExNmJkNTBmNjBhMGU5Nzg3ZjQiLCJ1c2VybmFtZSI6IkFkYXNkIiwiX192IjowLCJjYWxscyI6W3siY3JlYXRlZEF0IjoiMjAyNC0wOC0wN1QxMDoxODo1OS41NzBaIn0seyJjcmVhdGVkQXQiOiIyMDI0LTA4LTA3VDEwOjE5OjA3LjY0OFoifSx7ImNyZWF0ZWRBdCI6IjIwMjQtMDgtMDdUMTA6MTk6NDQuODkwWiJ9XSwiaWF0IjoxNzIzMDQxOTUwLCJleHAiOjE3MjMxMjgzNTB9.9YzwbOGrXypGGE3XXLg2cqe0uUw1i5P1NtbYOb7KBHU';

    // Зберегти токен у cookies
    Cookies.set('authToken', token, { expires: 7 }); // Токен буде зберігатися 7 днів


    const tokenj = Cookies.get('authToken');

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
                    <div onClick={openAddMenu} className="add_product">
                        <img src="./img/plus.png" alt="" />
                        <p className="btn_text">Додати товар</p>
                    </div>
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
            
            {/* {isLoading&& <Loader/>}
                    {!isLoading&&data.products.map((product, index) => (
                        <ProductCard key={index} product={product} index={index} />
                    ))} */}

                

                </div>
            </div>
            <AddProductMenu/>
        </div>
    );
}