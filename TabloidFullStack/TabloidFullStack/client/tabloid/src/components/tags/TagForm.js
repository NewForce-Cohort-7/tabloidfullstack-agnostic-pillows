import React, { useState, useNavigate } from "react";
import { addTag } from "../../Managers/TagManager";
import { Button, Form, FormGroup, Label, Input } from 'reactstrap';

const TagForm = () => {
  const [tag, setTag] = useState({ name: '' });
  const navigate = useNavigate();

  const handleInputChange = (event) => {
    const { value, id } = event.target;
    setTag((prevTag) => ({ ...prevTag, [id]: value }));
  };

  const handleSave = (event) => {
    event.preventDefault();
    addTag(tag).then(() => {
      navigate("/tags");
    });
  };

  return (
    <Form>
      <FormGroup>
        <Label for="name">Name</Label>
        <Input
          type="text"
          name="name"
          id="name"
          placeholder="tag name"
          value={tag.name}
          onChange={handleInputChange}
        />
      </FormGroup>
      <Button className="btn btn-primary" onClick={handleSave}>
        Submit
      </Button>
    </Form>
  );
};

export default TagForm;
