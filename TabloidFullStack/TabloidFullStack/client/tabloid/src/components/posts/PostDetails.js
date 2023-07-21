import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { getPostById } from "../../Managers/PostManager";
import { Button, Card, Col, Container, Row } from "reactstrap";

export const PostDetails = () => {
    const [post, setPost] = useState([]);
    const { id } = useParams();
    const publishDateTime = new Date(post.publishDateTime);
    const formattedDate = publishDateTime.toLocaleDateString();
    const localTabloidUser = localStorage.getItem("userProfile")
    const tabloidUserObject = JSON.parse(localTabloidUser)

    useEffect(() => {
        getPostById(id).then(setPost);
    }, [])
    if (!post) {
        return null;
    }
    return (tabloidUserObject.id === post.userProfile?.id) ? <>
    {
        post.imageLocation === null ? 
        <Container>
            <Row className="post-row">
                <Col md={6} lg={4} key={post.id}>
                    <Card className="post-card">
                        <strong className="post-title">{post.title}</strong>
                        <div>{post.content}</div>
                        <div>Published: {formattedDate}</div>
                        <div>{post.userProfile?.displayName}</div>
                    </Card>
                </Col>
            </Row>
            <Button tag={Link} to="edit">Edit Post</Button>
        </Container> 
        :
        <Container>
            <Row className="post-row">
                <Col md={10} lg={14} key={post.id}>
                    <Card className="post-card-details">
                        <strong className="post-title">{post.title}</strong>
                        <img src={post.imageLocation} alt="A placeholder picture that doesn't exist anymore"></img>
                        <div>{post.content}</div>
                        <div>Published: {formattedDate}</div>
                        <div>by: {post.userProfile?.displayName}</div>
                    </Card>
                </Col>
            </Row>
        <Button tag={Link} to="edit">Edit Post</Button>
        </Container>
         
    }  
    </> :
     <>
    {
        post.imageLocation === null ? 
        <Container>
            <Row className="post-row">
                <Col md={6} lg={4} key={post.id}>
                    <Card className="post-card">
                        <strong className="post-title">{post.title}</strong>
                        <div>{post.content}</div>
                        <div>Published: {formattedDate}</div>
                        <div>{post.userProfile?.displayName}</div>
                    </Card>
                </Col>
            </Row>
        </Container> 
        :
        <Container>
            <Row className="post-row">
                <Col md={10} lg={14} key={post.id}>
                    <Card className="post-card-details">
                        <strong className="post-title">{post.title}</strong>
                        <img src={post.imageLocation} alt="A placeholder picture that doesn't exist anymore"></img>
                        <div>{post.content}</div>
                        <div>Published: {formattedDate}</div>
                        <div>by: {post.userProfile?.displayName}</div>
                    </Card>
                </Col>
            </Row>
        </Container> 
    }  
    </>
    
}