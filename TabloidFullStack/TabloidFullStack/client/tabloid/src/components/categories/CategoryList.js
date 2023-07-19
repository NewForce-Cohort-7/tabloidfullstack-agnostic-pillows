import React, { useContext, useEffect } from "react";
import { Link } from "react-router-dom";
import { Button, Container, Row, Col } from "reactstrap";
import { CategoryContext } from "../../Managers/CategoryManager";
import Category from "./Category";

const CategoryList = () => {
  const { categories, getAllCategories, deleteCategory } = useContext(CategoryContext);

  useEffect(() => {
    getAllCategories();
  }, []);

  return (
    <div className="categories text-center">
      <h2>Categories</h2>
      <Button tag={Link} to="/category-form">Create Category</Button>
      <Container>
        <Row>
          {categories.map((category) => (
            <Col sm="4" key={category.id}>
              <Category category={category} deleteCategory={deleteCategory} />
            </Col>
          ))}
        </Row>
      </Container>
    </div>
  );
}

export default CategoryList;
