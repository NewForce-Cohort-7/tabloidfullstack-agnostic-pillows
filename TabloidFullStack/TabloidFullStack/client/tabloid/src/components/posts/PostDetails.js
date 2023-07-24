import { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { deletePost, getPostById } from "../../Managers/PostManager";
import { Button, Card, Col, Container, Row } from "reactstrap";

export const PostDetails = () => {
    const [post, setPost] = useState([]);
    const { id } = useParams();
    const publishDateTime = new Date(post.publishDateTime);
    const formattedDate = publishDateTime.toLocaleDateString();
    const localTabloidUser = localStorage.getItem("userProfile");
    const tabloidUserObject = JSON.parse(localTabloidUser);
    const navigate = useNavigate();

    useEffect(() => {
        getPostById(id).then(setPost);
    }, [])
    if (!post) {
        return null;
    }
    const handleDeleteButton = (e) => {
        e.preventDefault();
        const results = (window.confirm('Are you sure you want to delete your post?'))
        if (results) {
            deletePost(post.id)
            .then(navigate(`/posts`))
        };
    };
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
            <Button onClick={handleDeleteButton}>Delete</Button>
            <Link to={`/comment/${post.id}`}>View Comments</Link>
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
        <Button onClick={handleDeleteButton}>Delete</Button>
        <Link to={`/comment/${post.id}`}>View Comments</Link>
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
            <Link to={`/comment/${post.id}`}>View Comments</Link>
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
                        <Link to={`/comment/${post.id}`}>View Comments</Link>
                    </Card>
                </Col>
            </Row>
            
        </Container> 
    }  
    </>
    
}