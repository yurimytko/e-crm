import "./dist/blog.css"

export function BlogCard({post}){


    console.log(post.publicationDate)

    const date = new Date(post.publicationDate);
    const formattedDate = date.toLocaleDateString('en-GB').replace(/\//g, '.');

    return(
        <div className="blog_card"> 
            <img src="/img/semena.png" alt="" />
            <div className="text_blog">
                <div className="blog">
                    <div className="blog_title">{post.title}</div>
                    <div className="blog_text">{post.text}</div>
                </div>
                <div className="blog_control">
                    <button className="blog_btn">Читати далі --></button>
                    <span className="blog_date">{formattedDate} <img src="/img/Eye.svg" alt="" /></span>
                </div>
            </div>
        </div>
    )

}