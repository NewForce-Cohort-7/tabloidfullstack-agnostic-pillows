import React, { useState, useContext, useEffect } from "react";
import { Form, FormGroup, Label, Input, Button } from "reactstrap";
import { CategoryContext } from "../../Managers/CategoryManager";
import { useParams, useNavigate } from "react-router-dom";

const EditCategoryForm = () => {
    const { updateCategory, getCategoryById } = useContext(CategoryContext);
    const [category, setCategory] = useState({
        name: "",
    });

    const { categoryId } = useParams();
    const navigate = useNavigate();

    useEffect(() => {
        getCategoryById(categoryId)
        .then(responseCategory => {
            if(responseCategory) {
                setCategory(responseCategory);
            } else {
                setCategory({
                    name: "",
                });
            }
        });
    }, []);
    

    const handleSubmit = (e) => {
        e.preventDefault();

        const editedCategory = {
            id: categoryId,
            name: category.name,
        };

        updateCategory(editedCategory).then(() => {
            navigate("/categories");
        });
    };

    const handleFieldChange = evt => {
        const stateToChange = { ...category };
        stateToChange[evt.target.id] = evt.target.value;
        setCategory(stateToChange);
    }

    const handleCancel = () => {
        navigate("/categories");
    }

    return (
        <Form onSubmit={handleSubmit}>
            <h2>Edit Category</h2>
            <FormGroup>
                <Label for="name">Category Name:</Label>
                <Input type="text" id="name" onChange={handleFieldChange} value={category.name} required />
            </FormGroup>
            <Button type="submit" className="me-2">Save</Button>
            <Button onClick={handleCancel}>Cancel</Button>
        </Form>
    );
}

export default EditCategoryForm;