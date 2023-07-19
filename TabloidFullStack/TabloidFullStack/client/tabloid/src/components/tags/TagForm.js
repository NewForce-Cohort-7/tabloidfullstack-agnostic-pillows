import React, { useState } from "react";
import { addTag } from "../../Managers/TagManager";
import { Button, Form, FormGroup, Label, Col, Container, Input } from 'reactstrap';
import { useNavigate } from "react-router";

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
    <Container>
      <Col md={6} className="mt-4">
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
      </Col>
    </Container>
  );
};

export default TagForm;
