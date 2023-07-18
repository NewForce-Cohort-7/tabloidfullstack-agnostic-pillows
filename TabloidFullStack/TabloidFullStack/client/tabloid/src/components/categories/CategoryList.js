import React, { useContext, useEffect } from "react";
import { CategoryContext } from "../../Managers/CategoryManager";
import Category  from "./Category";

const CategoryList = () => {
    const { categories, getAllCategories } = useContext(CategoryContext);

    useEffect(() => {
        getAllCategories();
    }, []);

    return (
        <div className="categories">
            <h2>Categories</h2>
            {categories.map((category) => (
                <Category key={category.id} category={category} />
            ))}
        </div>
    );
}

export default CategoryList;