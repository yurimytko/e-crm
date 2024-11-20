import { useState, useRef } from "react";
import "./dist/addBlog.css";
import { useCreatePostMutation } from "../../store/blogApi";

export function AddBlog() {

  const input = useRef()


  const [createPost, { data, isLoading, error }] = useCreatePostMutation();
  const [blogTitle, setTitle] = useState("");
  const [blogText, setText] = useState("");
  const [blogVideo, setVideo] = useState("");
  const [formData, setFormData] = useState({ display: true });
  const [imageFile, setImageFile] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);

  const [photo, setPhoto] = useState([]);
  const [dragActive, setDragActive] = useState(false);



  const create = async () => {
    try {
      const post = new FormData(); // Create a FormData object
      post.append("title", blogTitle);
      post.append("text", blogText);
      post.append("display", formData.display); // Append the display value
      if (imageFile) {
        post.append("image", imageFile); // Append the image file
      }
      post.append("video", blogVideo); // Append the video link

      await createPost(post);
      window.location.reload();
    } catch (e) {
      console.error(e);
    }
  };


  const closeAddMenu = () => {
    const menuElement = document.getElementById("add_blog_component");
    menuElement.style.opacity = "0";
    setTimeout(() => {
      menuElement.style.display = "none";
      // Reset all states when the menu is closed
      setTitle("");
      setText("");
      setImageFile(null);
      setImagePreview(null);
      setFormData({ display: true });
    }, 300);
  };




  const handleDragOver = (e) => {
    e.preventDefault();
    setDragActive(true);
  };

  const handleDragLeave = () => {
    setDragActive(false);
  };

  const handleDrop = (e) => {
    e.preventDefault();
    setDragActive(false);
    const file = e.dataTransfer.files[0];
    if (file && (file.type === 'image/png' || file.type === 'image/jpeg')) {
      setPhoto(file);
    } else {
      alert('Only PNG and JPG images are allowed');
    }
  };


  const handleInput = () => {
    input.current.click();
  };

  return (
    <div id="add_blog_component" className="add_blog_component">
      <div className="blog_modal">

        <img
          onClick={closeAddMenu}
          className="blog_close"
          src="/img/close_menu.svg"
          alt="Close"
        />

        <div className="img_con ty">
          <span className="titile_set">Добавити Зображення</span>
          {photo.length === 0 ? (
            <div
              className={`drag_and_drop ${dragActive ? 'drag_active' : ''}`}
              onDragOver={handleDragOver}
              onDragLeave={handleDragLeave}
              onDrop={handleDrop}
            >
              <span className='input_click' onClick={handleInput}>
                Завантажте фото
                <span className='normal_text' onClick={(e) => { e.stopPropagation(); }}>
                  {' '}або перетягніть файл
                </span>
              </span>
              <span className='instruction'>Jpg, Png / Макс 8 мб / Мін 214px х 214px</span>

              <input
                ref={input}
                style={{ display: "none" }}
                type="file"
                accept=".png, .jpeg, .jpg"
                onChange={(e) => {
                  const file = e.target.files[0];
                  if (file && (file.type === 'image/png' || file.type === 'image/jpeg')) {
                    setPhoto(file);
                  }
                }}
              />
            </div>
          ) : (
            <div
              onDragOver={handleDragOver}
              onDragLeave={handleDragLeave}
              onDrop={handleDrop}
              className={`uploaded_photo ${dragActive ? 'drag_active' : ''}`}
            >
              <img src={URL.createObjectURL(photo)} alt="Uploaded" className="preview_image" />
            </div>
          )}

        </div>
        {/* <span className="blog_title">Додати Зображення</span>

        <div className="img_field_blog">
          <div
            className="border_blog"
            onDragEnter={handleDragEnter}
            onDragOver={(e) => e.preventDefault()} // Required to allow dropping
            onDragLeave={handleDragLeave}
            onDrop={handleDrop}
          >
            {imagePreview ? (
              <img src={imagePreview} alt="Preview" className="image_preview" />
            ) : (
              <>
                <label htmlFor="file-upload" className="file-upload-label">
                  Перетягніть зображення сюди або виберіть файл
                </label>
                <p>Jpg, Png / Макс 8 мб / Мін 214px х 214px</p>
              </>
            )}
            <input
              id="file-upload"
              type="file"
              className="file-upload-input"
              accept="image/*"
              onChange={handleFileSelect}
              style={{ display: 'none' }} // Hide the default file input
            />
          </div>
        </div>

        <img
          onClick={closeAddMenu}
          className="blog_close"
          src="/img/close_menu.svg"
          alt="Close"
        />
        <span className="blog_title">Заголовок</span>
        <input
          value={blogTitle}
          onChange={(e) => {
            setTitle(e.target.value);
          }}
          className="input_blog"
          type="text"
          placeholder="Назва блогу..."
          name="name"
        />
        <span className="blog_title">Опис</span>
        <textarea
          value={blogText}
          onChange={(e) => {
            setText(e.target.value);
          }}
          className="text_area_b"
          placeholder="Опис блогу..."
          name="description"
        ></textarea>
        <span className="blog_title">Відео</span>

        <input
          className="input_blog"
          value={blogVideo}
          onChange={(e) => {
            setVideo(e.target.value);
          }}
          type="text"
          placeholder="Посилання на відео"
          name="name"
        />

        <span className="blog_title">Показувати пост</span>

        <div className="blog_add_control">
          <div className="radio-buttons">
            <label className="radio-button">
              <input
                type="radio"
                name="display"
                value={true}
                checked={formData.display === true}
                onChange={handleChange}
              />
              <div className="radio-circle"></div>
              <span className="radio-label">Так</span>
            </label>
            <label className="radio-button">
              <input
                type="radio"
                name="display"
                value={false}
                checked={formData.display === false}
                onChange={handleChange}
              />
              <div className="radio-circle"></div>
              <span className="radio-label">Ні</span>
            </label>
          </div>
          <button className="blog_c_btn" onClick={create}>
            Створити
          </button>
        </div> */}
      </div>
    </div>
  );
}
