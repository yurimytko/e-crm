import { NavLink, useParams } from 'react-router-dom';
import { NavBar } from '../../components/NavBar/nav';
import './dist/blogPage.css';
import { useGetPostsByIdQuery, useUpdatePostMutation, useDeletePostMutation } from '../../store/blogApi';
import { Loader } from '../../components/Loader/loader';
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

export function BlogPage() {
    const navigate = useNavigate()

    const { blogId } = useParams();
    const { data, isLoading, error } = useGetPostsByIdQuery(blogId);

    const [updateBlog] = useUpdatePostMutation();
    const [deletePost, { data: afterDeleting, isLoading: deleteLoading }] = useDeletePostMutation();

    const [title, setTitle] = useState('');
    const [url, setUrl] = useState('');
    const [text, setText] = useState('');
    const [isDeleted, setIsDeleted] = useState(false); // State to track deletion status

    useEffect(() => {
        if (data?.post) {
            setTitle(data.post.title || '');
            setUrl(data.post.video || ''); // Assuming you have a url field, adjust if needed
            setText(data.post.text || '');
        }
    }, [data]);

    const publicationDate = data?.post ? new Date(data.post.publicationDate) : null;

    const formattedDate = publicationDate
        ? `${String(publicationDate.getDate()).padStart(2, '0')}.${String(publicationDate.getMonth() + 1).padStart(2, '0')}.${publicationDate.getFullYear()}`
        : '';

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
            setIsDeleted(true);
            navigate(-1)
        } catch (e) {
            console.error(e);
        }
    };

    return (
        <div className='blog_page'>
            <NavBar />
            {isLoading && <Loader />}
            {deleteLoading && <Loader />}
            {error && <p className="error_message">Помилка завантаження даних блогу.</p>}
            {data?.post && (
                <div style={{
                    padding: "7vh 0 0 2vw",
                    boxSizing: "border-box"
                }}>
                    <div>
                        <div className="page_title"><span style={{ cursor: "pointer" }} onClick={() => { navigate(-1) }}> <img src="/img/Group 53.svg" alt="" /> Назад</span> | Блог</div>
                    </div>
                    <div className="blog_page_con">

                        <div className="left_blog">
                            <div className="img_blog_load"></div>
                        </div>
                        <div className="right_blog">
                            <p className='blog_created_at'>Створено {formattedDate}</p>
                            <p className='setting_up'>Заголовок статті</p>
                            <input
                                className="input_s_blog"
                                type="text"
                                value={title}
                                onChange={(e) => setTitle(e.target.value)}
                            />
                            <p className='setting_up'>Посилання на відео</p>

                            <input
                                className="input_s_blog"
                                type="text"
                                value={url}
                                onChange={(e) => setUrl(e.target.value)}
                            />
                            <p className='setting_up'>Текст статті</p>

                            <textarea
                                className="text_areablog"
                                value={text}
                                onChange={(e) => setText(e.target.value)}
                            ></textarea>

                            <div className="blog_contronl">

                                <button className='blog_c_btn cancel_blog' onClick={deletePostFun}>Видалити</button>
                                <button className='blog_c_btn create_blog save_blog' onClick={updatePost}>Зберегти зміни</button>

                            </div>
                        </div>
                    </div>
                </div>
            )
            }
        </div >
    );
}
