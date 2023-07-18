import React, { useState, createContext } from "react";

const apiUrl = "https://localhost:5001";


export const CategoryContext = createContext();

export const getAllCategories = () => {
    return fetch(`${apiUrl}/api/category`)
        .then((res) => res.json())
        .then(setCategories);
};



return (
    <CategoryContext.Provider value={{ categories, getAllCategories }}>
        {props.children}
    </CategoryContext.Provider>
);
