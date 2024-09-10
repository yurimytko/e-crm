import { NavLink, useParams } from 'react-router-dom';
import { NavBar } from '../../components/NavBar/nav';
import './dist/blogPage.css';
import { useGetPostsByIdQuery, useUpdatePostMutation, useDeletePostMutation } from '../../store/blogApi';
import { Loader } from '../../components/Loader/loader';
import { useState, useEffect } from 'react';

export function BlogPage() {
    const { blogId } = useParams();
    const { data, isLoading, error } = useGetPostsByIdQuery(blogId);

    const [updateBlog] = useUpdatePostMutation();
    const [deletePost] = useDeletePostMutation();

    const [title, setTitle] = useState('');
    const [url, setUrl] = useState('');
    const [text, setText] = useState('');
    const [isDeleted, setIsDeleted] = useState(false); // State to track deletion status

    useEffect(() => {
        if (data && data.post) {
            setTitle(data.post.title || '');
            setUrl(data.post.url || ''); // Assuming you have a url field, adjust if needed
            setText(data.post.text || '');
        }
    }, [data]);

    if (isLoading) {
        return <Loader />;
    }

    if (error) {
        return <p>Error loading blog post.</p>;
    }

    if (!data || !data.post || !data.post.publicationDate) {
        return <p>No post data available.</p>;
    }

    const publicationDate = new Date(data.post.publicationDate);

    const day = String(publicationDate.getDate()).padStart(2, '0');
    const month = String(publicationDate.getMonth() + 1).padStart(2, '0');
    const year = publicationDate.getFullYear();

    const formattedDate = `${day}.${month}.${year}`;

    const updatePost = async () => {
        try {
            const post = {
                _id: data.post._id,
                title: title,
                text: text
            };
            await updateBlog(post);
        } catch (e) {
            console.error(e);
        }
    };

    const deletePostFun = async () => {
        try {
            await deletePost(data.post._id);
            setIsDeleted(true); // Update the state to reflect deletion
        } catch (e) {
            console.error(e);
        }
    };

    return (
        <div className='blog_page'>
            <NavBar />
            <div className="blog_page_con">
                <div className="left_blog">
                    <div className="img_blog_load"></div>
                </div>
                <div className="right_blog">
                    <p className='blog_created_at'>Створено {formattedDate}</p>

                    <input
                        className='blog_input'
                        type="text"
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                    />
                    <input
                        className='blog_input'
                        type="text"
                        value={url}
                        onChange={(e) => setUrl(e.target.value)}
                    />
                    <textarea
                        className='blog_area'
                        value={text}
                        onChange={(e) => setText(e.target.value)}
                    ></textarea>

                    <div className="blog_contronl">
                        {isDeleted ? (
                            <NavLink to="/blog" className='delete_blog'>Успішно видалено</NavLink>
                        ) : (
                            <>
                                <button className='delete_blog' onClick={deletePostFun}>Видалити</button>
                                <button className='save_blog' onClick={updatePost}>Зберегти зміни</button>
                            </>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
}
