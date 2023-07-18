import React, { useState, createContext } from "react";

export const CategoryContext = createContext();

const CategoryProvider = (props) => {
  const [categories, setCategories] = useState([]);

  const getAllCategories = () => {
    return fetch(`/api/Category`)
      .then((res) => res.json())
      .then(setCategories);
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

  return (
    <CategoryContext.Provider value={{ categories, getAllCategories, addCategory }}>
      {props.children}
    </CategoryContext.Provider>
  );
};

export default CategoryProvider;
