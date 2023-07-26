import React from "react";
import { useNavigate } from "react-router-dom";
import { Card, CardBody, Button, Row, Col } from "reactstrap";

const Category = ({ category, deleteCategory }) => {
  const navigate = useNavigate();

  const handleDelete = () => {
    const confirmDelete = window.confirm("Are you sure you want to delete this category?");
    if (confirmDelete) {
      deleteCategory(category.id);
      // redirects the user back to the category list after deleting a category
      navigate("/categories");
    } else {
      // redirects the user back to the category list if they cancel the delete
      navigate("/categories");
    }
  };

  return (
    <div>
      <Card className="m-4">
        <CardBody className="text-center">
        <h5 className="text-center px-2">{category.name}</h5>
          <Button color="primary" className="me-2" onClick={() => navigate(`/categories/${category.id}/edit`)}>
            Edit
          </Button>
          <Button color="danger" onClick={handleDelete}>
            Delete
          </Button>
        </CardBody>
      </Card>
    </div>
  );
};

export default Category;
