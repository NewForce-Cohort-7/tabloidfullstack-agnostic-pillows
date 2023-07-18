import { useEffect, useState } from "react";
import { useParams } from "react-router";
import { Card, Col, Container, Row } from "reactstrap";
import { getAllUsersPosts } from "../../Managers/PostManager";
import { Post } from "./Post";

export const UsersPosts = () => {
    const [userPost, setUserPost] = useState([]);
    const { UserId } = useParams();

    useEffect(() => {
        getAllUsersPosts(UserId)
            .then((data) => {
                setUserPost(data)
            })
            .catch((error) => {
                console.log("Error fetching user posts:", error)
            });
    }, [UserId]);

    return (
        <Container>
        <Row className="post-row">
            {userPost.map((post) => (
                <Col md={6} lg={4} key={post.id}>
                    <Card className="post-card">
                        <Post postProp={post} />
                    </Card>
                </Col>
            ))}
        </Row>
    </Container>  
    );
}