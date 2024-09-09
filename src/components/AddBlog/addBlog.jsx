import { useState } from "react"
import "./dist/addBlog.css"
import { useCreatePostMutation } from "../../store/blogApi"

export function AddBlog(){

    const [createPost,{data, isLoading, error}] = useCreatePostMutation()


    const [blogTitle, setTitle] = useState()
    const [blogText, setTetx] = useState()


    const create = async() => {
        try{
            const post ={
                title: blogTitle,
                text: blogText 
            }

            await createPost(post)
        } catch(e){
            console.error(e)
        }
    }


    const closeAddMenu = () => {
        const menuElement = document.getElementById("add_blog_component");
        menuElement.style.opacity = "0";
        setTimeout(() => {
            menuElement.style.display = "none";
        }, 300);
    };


    return(
        <div id = "add_blog_component" className="add_blog_component">
            <div className="blog_modal">
                <img onClick={closeAddMenu} className="blog_close" src="/img/close_menu.svg" alt="" />
                <span className="blog_title">Заголовок</span>
                <input 
                    onChange={(e)=> {setTitle(e.target.value)}}
                    className="input_blog" 
                    type="text" 
                    placeholder="Назва блогу..." 
                    name="name"
                    
                />
                <span className="blog_title">Опис</span>
                <textarea
                    onChange={(e)=> {setTetx(e.target.value)}}
                    className="text_area_b"
                    placeholder="Опис блогу..."
                    name="description"
                ></textarea>
                <button className="blog_c_btn" onClick={create}>Створити</button>
            </div>
        </div>
    )
}