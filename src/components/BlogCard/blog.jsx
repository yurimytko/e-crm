import { NavLink } from "react-router-dom";
import "./dist/blog.css"
import { useState } from "react";

import { useUpdatePostMutation } from "../../store/blogApi";

export function BlogCard({post}){



    const [eye, setEye] = useState(post.display ? './img/Eye.svg' : './img/Invisible.svg');
    const [display, setDisplay] = useState(post.display);


    const [update,{data, isLoading, error}] = useUpdatePostMutation()


    const displayUpdate = async () => {
        try {
          const updatedPost = {
            _id: post._id, 
            display: !display,
          };
      
          await update(updatedPost);
      
          setDisplay(!display);
          setEye(!display ? './img/Eye.svg' : './img/Invisible.svg'); // Adjust based on the new state
        } catch (err) {
          console.error("Failed to update post: ", err);
        }
      };




    const date = new Date(post.publicationDate);
    const formattedDate = date.toLocaleDateString('en-GB').replace(/\//g, '.');

    return(
        <div className="blog_card"> 
            <img src={post.image[0].imageUrl} alt="" />
            <div className="text_blog">
                <div className="blog">
                    <div className="blog_title">{post.title}</div>
                    <div className="blog_text">{post.text}</div>
                </div>
                <div className="blog_control">
                    <NavLink to={`${post._id}`} className="blog_btn">Читати далі --></NavLink>
                    <span className="blog_date">{formattedDate} <img onClick={displayUpdate} src={eye} alt="" /></span>
                </div>
            </div>
        </div>
    )

}