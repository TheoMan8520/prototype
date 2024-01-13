import axios from "axios";
import { useEffect, useState } from "react";
import "../css/category.css";
import CreateCategory from "./CreateCategory";
import UpdateCategory from "./UpdateCategory";

const Category = () => {
  const [isCreateCategory, setisCreateCategory] = useState(false);
  const [isUpdateCategory, setisUpdateCategory] = useState(false);
  const [categories, setCategories] = useState([]);
  const [id, setId] = useState(-1);
  const [sticker, setSticker] = useState("");
  const [category, setCategory] = useState("");

  useEffect(() => {
    if (!isCreateCategory || !isUpdateCategory) {
      fetchCategories();
    }
  }, [isCreateCategory, isUpdateCategory]);

  const fetchCategories = async () => {
    await axios.get(`http://localhost:8000/api/categories`).then(({ data }) => {
      setCategories(data.categories);
    });
  };

  const openCreateCategory = () => {
    setisCreateCategory(true);
  };

  const closeCreateCategory = () => {
    setisCreateCategory(false);
  };

  const openUpdateCategory = async (id, sticker, category) => {
    setId(id);
    console.log("0.1 Set id:", id)
    setSticker(sticker);
    console.log("0.2 Set sticker:", sticker)
    setCategory(category);
    console.log("0.3 Set category", category)
    setisUpdateCategory(true);
  };

  const closeUpdateCategory = () => {
    setisUpdateCategory(false);
  };

  return (
    <>
      <CreateCategory
        isOpen={isCreateCategory}
        onRequestClose={closeCreateCategory}
      />
      <UpdateCategory
        isOpen={isUpdateCategory}
        onRequestClose={closeUpdateCategory}
        id={id}
        stickerIn={sticker}
        categoryIn={category}
      />
      <div className="frame">
        <div className="category-card">
          <div className="category-card-head">
            <h2>Sticker:</h2>
          </div>
          <div className="category-card-body">
            {categories.length > 0
              ? categories.map((category) => (
                  <div
                    key={category.id}
                    className="category-unit"
                    onClick={() => openUpdateCategory(
                      category.id,
                      category.sticker,
                      category.category
                    )}
                  >
                    <div className="sticker">
                      <h2>{category.sticker}</h2>
                    </div>
                    <div className="category">
                      <h2>{category.category}</h2>
                    </div>
                  </div>
                ))
              : null}
            <div className="category-unit" onClick={openCreateCategory}>
              <div className="sticker">
                <h2>💡</h2>
              </div>
              <div className="category">
                <h2>+ Category</h2>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Category;
