import React, { useContext, useEffect } from "react";
import { Link } from "react-router-dom";
import { Button } from "reactstrap";
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
            <Button tag={Link} to="/category-form">Create Category</Button>
            {categories.map((category) => (
                <Category key={category.id} category={category} />
            ))}
        </div>
    );
}

export default CategoryList;
