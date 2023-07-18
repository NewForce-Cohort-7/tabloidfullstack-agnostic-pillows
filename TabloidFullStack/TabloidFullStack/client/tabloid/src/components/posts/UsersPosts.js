import { useEffect, useState } from "react";
import { useParams } from "react-router";
import { Card, Col, Container, Row } from "reactstrap";
import { getAllUsersPosts } from "../../Managers/PostManager";
import { Post } from "./Post";

export const UsersPosts = () => {
    const [userPost, setUserPost] = useState([]);
    //grab the currently logged in user
    const localTabloidUser = localStorage.getItem("userProfile")
    const tabloidUserObject = JSON.parse(localTabloidUser)

    useEffect(() => {
        //use the currently logged in user's id in the getAllUsersPosts function where the userId is taken as the parameter
        getAllUsersPosts(tabloidUserObject.id)
            .then((data) => {
                setUserPost(data)
            })
            .catch((error) => {
                console.log("Error fetching user posts:", error)
            });
    }, [tabloidUserObject.id]);

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