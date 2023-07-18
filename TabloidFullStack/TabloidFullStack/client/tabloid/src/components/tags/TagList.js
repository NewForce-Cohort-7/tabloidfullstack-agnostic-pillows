import React, { useEffect, useState } from "react";
import { Card, CardBody, Col, Container, Row } from "reactstrap";
import Tag from "./Tag";
import { GetAllTags } from "../../Managers/TagManager";
import "./Tag.css"; // Import your tag.css file

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
    </Container>
  );
};

export default TagList;
