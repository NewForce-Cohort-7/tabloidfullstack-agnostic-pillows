import { useEffect, useState } from "react";
import { getCommentsByPostId } from "../../Managers/CommentManager.js";
import { getPostById } from "../../Managers/PostManager.js";
import { Button, Card, Col, Container, Row } from "reactstrap";
import { Link, useParams } from "react-router-dom";
import { Comment } from "./Comment.js";

export const CommentList = () => {

    const { id } = useParams();

    const [comments, setComments] = useState([]);
    const [post, setPost] = useState([]);

    const getComments = (id) => {
        getCommentsByPostId(id)
            .then(allComments => setComments(allComments));
    };

    useEffect(() => {
        getComments(id);
    }, [])

    const getPost = (id) => {
        getPostById(id)
            .then(post => setPost(post));
    };

    useEffect(() => {
        getPost(id);
    }, [])

   

    return (
        <>
            <Container>

                <Link to={`/posts/${id}`}>
                    <strong className="post-title">{post.title}</strong>
                </Link>
            
                <Row className="comment-row">
                    {comments.map((comment) => (
                        <>
                        <Col md={6} lg={4} key={comment.id}>
                            <Card className="comment-card">
                                <Comment commentProp={comment} />
                            </Card>
                        </Col>
                        </>
                    ))}
                </Row>
            </Container>
        </>
    )
}