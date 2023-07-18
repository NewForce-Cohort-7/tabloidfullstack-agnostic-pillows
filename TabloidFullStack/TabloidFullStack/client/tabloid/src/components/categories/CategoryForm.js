import React, { useState, useContext } from "react";
import { Form, FormGroup, Label, Input, Button } from "reactstrap";
import { CategoryContext } from "../../Managers/CategoryManager";
import { useNavigate } from "react-router-dom";

const CategoryForm = () => {
    const { addCategory } = useContext(CategoryContext);
    // initial state of category is an empty string
    const [category, setCategory] = useState({
        name: "",
    });

    const navigate = useNavigate();

    const handleSubmit = (e) => {
        e.preventDefault();

        const newCategory = {
            name: category.name,
        };

        addCategory(newCategory).then(() => {
            navigate("/categories");
        });
    };

    const handleFieldChange = evt => {
        const stateToChange = { ...category };
        stateToChange[evt.target.id] = evt.target.value;
        setCategory(stateToChange);
    };

    return (
        <Form onSubmit={handleSubmit}>
            <h2>Create Category</h2>
            <FormGroup>
                <Label for="name">Category Name:</Label>
                <Input type="text" id="name" onChange={handleFieldChange} value={category.name} required />
            </FormGroup>
            <Button type="submit">Save</Button>
        </Form>
    );
}

export default CategoryForm;
