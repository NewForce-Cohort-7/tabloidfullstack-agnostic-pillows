import React, { useState, createContext } from "react";



export const CategoryContext = createContext();


const CategoryProvider = (props) => {
  const [categories, setCategories] = useState([]);

  const getAllCategories = () => {
    return fetch(`/api/Category`)
      .then((res) => res.json())
      .then(setCategories);
  };

  return (
    <CategoryContext.Provider value={{ categories, getAllCategories }}>
      {props.children}
    </CategoryContext.Provider>
  );
};

export default CategoryProvider;
