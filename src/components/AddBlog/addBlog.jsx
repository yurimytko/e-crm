import { useState, useRef } from "react";
import "./dist/addBlog.css";
import { useCreatePostMutation } from "../../store/blogApi";
import AddCategory from "../AddCategory/addCat";
import { AddSub } from "../AddSubSection/adSub";

import { Loader } from "../Loader/loader";

import { useGetSectionsQuery } from "../../store";

export function AddBlog() {

  const input = useRef()


  const [createPost, { data, isLoading, error }] = useCreatePostMutation();
  const [blogTitle, setTitle] = useState("");
  const [blogText, setText] = useState("");
  const [blogVideo, setVideo] = useState("");
  const [formData, setFormData] = useState({ display: true });
  const [imageFile, setImageFile] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);
  const [display, setDisplay] = useState(1)

  const [photo, setPhoto] = useState([]);
  const [dragActive, setDragActive] = useState(false);

  const [category, setCategory] = useState("Категорія")
  const [isCategoryOpen, setIsCatOpen] = useState(false)
  const [isSubOpen, setIsSubOpen] = useState(false)
  const [isCategorySelected, setIsCategorySelected] = useState(false)
  const [subCategory, setSubCategory] = useState("Під категорія")
  const [subsetcions, setSubsections] = useState([])
  const [categoryId, setCategoryId] = useState()
  const [subCategoryId, setSubCategoryId] = useState()



  const { data: categoryq = [], isLoading: blogLoading, error: blogError } = useGetSectionsQuery()

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
  const create = async (e) => {
    e.preventDefault();
    e.stopPropagation();

    try {
      const post = new FormData();
      post.append("title", blogTitle);
      post.append("text", blogText);
      if (formData.display) {
        post.append("display", formData.display);
      }
      if (categoryId) {
        post.append("sectionId", categoryId);
      } else if (subCategoryId) {
        post.append("subSectionId", subCategoryId);
      }
      if (imageFile) {
        console.log("Adding image file:", imageFile);
        post.append("image", imageFile);
      }
      post.append("video", blogVideo);

      // Log the FormData contents
      for (let pair of post.entries()) {
        console.log(`${pair[0]}:`, pair[1]);
      }

      await createPost(post);
      closeAddMenu()

    } catch (e) {
      console.error(e);
    }
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

  const handleRadioChange = (e) => {
    setDisplay(e.target.id === 'option3' ? 1 : 0);
  };




  function openDrop() {
    setIsCatOpen(!isCategoryOpen)
    setIsSubOpen(false)
  }
  function openDropSub() {
    setIsCatOpen(false)

    setIsSubOpen(!isSubOpen)
  }

  const resetCat = () => {
    setCategory("Категорія")
    setIsCategorySelected(false)
  }

  const resetSub = () => {
    setSubCategory("Під категорія")
  }


  const chooseCat = (title) => {
    setCategory(title.name)
    setCategoryId(title._id)
    setIsCategorySelected(true)
    setSubsections(title.subSections)
    setSubCategory("Під категорія")

    console.log(title)

  }


  const openAddCategory = () => {
    const menuElement = document.getElementById("add_category");
    menuElement.style.display = "flex";
    setTimeout(() => {
      menuElement.style.opacity = "1";


    }, 100);
  }

  function openAddCat() {
    const menuElement = document.getElementById("add_sub");
    menuElement.style.display = "flex";
    setTimeout(() => {
      menuElement.style.opacity = "1";
    }, 100);
  }


  const chooseSub = (title) => {
    setSubCategory(title.name)
    setSubCategoryId(title._id)
    setCategoryId(null)

    console.log(title)

  }


  return (

    <div id="add_blog_component" className="add_blog_component">
      {isLoading && <Loader />}
      <form onSubmit={create} className="blog_modal">
        <div className="lerft_blog_modal">

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
                      setImageFile(file); // Synchronizes imageFile state
                      console.log(file);
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

          <div className="product_price_con blog_con_con">
            <span className="setting_up">Пост</span>
            <input name="name" type="text" value={blogTitle} onChange={(e) => { setTitle(e.target.value) }} placeholder="Назва поста" className="input blog_inpui" />
            <textarea className="text_areablog" value={blogText} onChange={(e) => { setText(e.target.value) }} placeholder="Текст поста" />
          </div>

        </div>
        <div className="sep_add_blog_line"></div>

        <div className="lerft_blog_modal">

          <div className="product_price_con blog_con_con w_margin">
            <span className="setting_up">Відео</span>
            <input name="name" type="text" value={blogVideo} onChange={(e) => { setVideo(e.target.value) }} placeholder="Назва поста" className="input blog_inpui" />
          </div>

          <div className="product_price_con">
            <span className="setting_up">Категорія</span>
            <div onClick={openDrop} className="drop_down_cat">
              <div className="catigory">{category}</div>
              <img src="/img/Group 22.svg" alt="" />
              <div className="dropdown_cat" style={{ height: isCategoryOpen ? "auto" : "0" }}>
                <span onClick={resetCat}>...</span>
                {categoryq?.sections && categoryq.sections.length > 0 ? (
                  categoryq.sections.map(section => (
                    <span onClick={() => chooseCat(section)} className="category_on_add" key={section._id}>{section.name}</span>
                  ))
                ) : (
                  <span>немає категорій</span>
                )}
                <span className="add_cat_in_add" onClick={openAddCategory}>Додати категорію</span>
              </div>
            </div>
            <div onClick={openDropSub} className="drop_down_cat" style={{ display: isCategorySelected ? "flex" : "none" }}>
              <div className="catigory">{subCategory}</div>
              <img src="/img/Group 22.svg" alt="" />
              <div className="dropdown_cat" style={{ height: isSubOpen ? "auto" : "0" }}>
                <span onClick={resetSub}>...</span>
                {subsetcions && subsetcions.length > 0 ? (
                  subsetcions.map(section => (
                    <span onClick={() => chooseSub(section)} className="category_on_add" key={section._id}>{section.name}</span>
                  ))
                ) : (
                  <span>немає категорій</span>
                )}
                <span className="add_cat_in_add" onClick={openAddCat}>Додати категорію</span>
              </div>
            </div>



          </div>

          <div className="product_price_con">
            <span className="setting_up">Показувати товар</span>
            <div className="radio-container">
              <div className="radio-wrapper">
                <label className="radio-button">
                  <input
                    id="option3"
                    name="radio-group_1"
                    type="radio"
                    onChange={handleRadioChange}
                    checked={display === 1}
                  />
                  <span className="radio-checkmark"></span>
                </label>
                <span className="radio-label">Так</span>
              </div>

              <div className="radio-wrapper">
                <label className="radio-button">
                  <input
                    id="option4"
                    name="radio-group_1"
                    type="radio"
                    onChange={handleRadioChange}
                    checked={display === 0}
                  />
                  <span className="radio-checkmark"></span>
                </label>
                <span className="radio-label">Ні</span>
              </div>
            </div>
          </div>
          <div className="blog_btn_group">
            <button className="blog_c_btn cancel_blog" type="button" onClick={closeAddMenu}>Скасувати</button>

            <button className="blog_c_btn create_blog">Зберегти</button>


          </div>
        </div>
      </form>

      <AddCategory />
      <AddSub id={categoryId} />
    </div>
  );
}
