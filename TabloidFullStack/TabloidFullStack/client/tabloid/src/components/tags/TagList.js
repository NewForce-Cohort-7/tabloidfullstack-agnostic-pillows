import React, { useEffect, useState } from "react";
import { Card, Col, Container, Row, Button } from "reactstrap";
import Tag from "./Tag";
import { GetAllTags } from "../../Managers/TagManager";
import "./Tag.css";
import { Link } from "react-router-dom";



const TagList = () => {
  const [tags, setTags] = useState([]);
 

  const getTags = () => {
    GetAllTags().then((tags) => setTags(tags));
  };

  useEffect(() => {
    getTags();
  }, []);

  return (
    <Container>
      <Row className="flex-column">
        {tags.map((tag) => (
          <Col md={6} lg={4} key={tag.id}>
            <Card className="mb-4">
              <Tag tag={tag} getTags={getTags} />
            </Card>
          </Col>
        ))}
      </Row>
      <Button tag={Link} to="/tag-form">Create New Tag</Button>
    </Container>
  );
};

export default TagList;
