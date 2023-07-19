import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getPostById } from "../../Managers/PostManager";
import { Card, Col, Container, Row } from "reactstrap";

export const PostDetails = () => {
    const [post, setPost] = useState([]);
    const { id } = useParams();
    const publishDateTime = new Date(post.publishDateTime);
    const formattedDate = publishDateTime.toLocaleDateString();

    useEffect(() => {
        getPostById(id).then(setPost);
    }, [])
    if (!post) {
        return null;
    }
    return <>
    {

        <Container>
            <Row className="post-row">
                <Col md={6} lg={4} key={post.id}>
                    <Card className="post-card">
                        <div>{post.title}</div>
                        <div>{post.userProfile?.displayName}</div>
                        <div>{post.content}</div>
                        <div>Published: {formattedDate}</div>
                    </Card>
                </Col>
            </Row>
        </Container>
        }
    ;
    </>
    
}