import React, { useState, createContext } from "react";

export const CategoryContext = createContext();

const CategoryProvider = (props) => {
  const [categories, setCategories] = useState([]);

  const getAllCategories = () => {
    return fetch(`/api/Category`)
      .then((res) => res.json())
      .then(setCategories);
  };

  const getCategoryById = (id) => {
    return fetch(`/api/Category/${id}`).then((res) => res.json());
  };

  const addCategory = (category) => {
    return fetch("/api/Category", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(category),
    }).then(getAllCategories);
  };

  const deleteCategory = (categoryId) => {
    return fetch(`/api/Category/${categoryId}`, {
      method: "DELETE",
    }).then(getAllCategories);
  };

  const updateCategory = (category) => {
    return fetch(`/api/Category/${category.id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(category),
    }).then(getAllCategories);
  };

  return (
    <CategoryContext.Provider value={{ categories, getAllCategories, addCategory, deleteCategory, updateCategory, getCategoryById }}>
      {props.children}
    </CategoryContext.Provider>
  );
};

export default CategoryProvider;
