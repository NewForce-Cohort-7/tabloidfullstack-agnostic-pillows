import React, { useContext, useEffect } from "react";
import { CategoryContext } from "./CategoryProvider";
import { Category } from "./Category";

const CategoryList = () => {
    const { categories, getAllCategories } = useContext(CategoryContext);

    useEffect(() => {
        getAllCategories();
    }, []);

    return (
        <div className="categories">
            {categories.map((category) => (
                <Category key={category.id} category={category} />
            ))}
        </div>
    );
}

export default CategoryList;