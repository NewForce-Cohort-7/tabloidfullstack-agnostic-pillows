import { useEffect, useState } from "react"
import { getAllPosts } from "../../Managers/PostManager";
import { Card, Col, Container, Row } from "reactstrap";
import { Post } from "./Post";
import './Post.css';

export const PostList = () => {
    const [posts, setPosts] = useState([]);

    const getPosts = () => {
        getAllPosts()
        .then(allPosts => setPosts(allPosts));
    };

    useEffect(() => {
        getPosts();
    }, [])

    return (
        <Container>
            <Row className="post-row">
                {posts.map((post) => (
                    <Col md={6} lg={4} key={post.id}>
                        <Card className="post-card">
                            <Post postProp={post} />
                        </Card>
                    </Col>
                ))}
            </Row>
        </Container>
    )
}