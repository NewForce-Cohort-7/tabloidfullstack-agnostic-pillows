import { useEffect, useState } from "react"
import { getAllPosts } from "../../Managers/PostManager";
import { Button, Card, Col, Container, Row } from "reactstrap";
import { Post } from "./Post";
import './Post.css';
import { Link } from "react-router-dom";

export const PostList = () => {
    const [posts, setPosts] = useState([]);

    useEffect(() => {
        getAllPosts()
            .then(allPosts => setPosts(allPosts));
    }, [])

    return (
        <>
            <Container>
            <Button tag={Link} to="/posts/add">Create a new Post</Button>
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
        </>
    )
}