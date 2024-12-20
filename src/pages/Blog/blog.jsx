import { AddBlog } from "../../components/AddBlog/addBlog"
import { BlogCard } from "../../components/BlogCard/blog"
import { Loader } from "../../components/Loader/loader"
import { NavBar } from "../../components/NavBar/nav"
import { useGetPostsQuery } from "../../store/blogApi"
import "./dist/blog.css"

export function Blog() {

    const { data, isLoading, error } = useGetPostsQuery()

    const openAddMenu = () => {
        document.getElementById("add_blog_component").style.display = "flex"

        setTimeout(() => {
            document.getElementById("add_blog_component").style.opacity = "1"
        }, 100);
    }

    return (
        <div className="blog_page_p">
            <NavBar />
            {isLoading && <Loader/>}
            <div className="blog_con">
                <div className="page_title">Сторінки блогу</div>


                <div className="blog_section">
                    <div className="add_blog" onClick={openAddMenu}>
                        <img src="./img/додати.svg" alt="" />
                    </div>
                    {data?.posts?.map(post => <BlogCard key={post.id} post={post} />)}
                </div>
            </div>
            <AddBlog />
        </div>
    )
}
