import { useContext, useEffect, useState } from "react"
import { editComment, getCommentById } from "../../Managers/CommentManager.js";
import { useNavigate, useParams } from "react-router-dom";
import { Button, FormGroup, Input, Label } from "reactstrap";

export const CommentEdit = () => {

    const localTabloidUser = localStorage.getItem("userProfile")
    const tabloidUserObject = JSON.parse(localTabloidUser)

    const { commentId } = useParams();

    const navigate = useNavigate();
    
    const [editedComment, setEditedComment] = useState({
        subject: "",
        content: "",
        userProfileId: tabloidUserObject.id,
        createDateTime: Date.now()
    })
    useEffect(() => {
        getCommentById(commentId).then((res) => {
            setEditedComment(res)
        }
        );
    }, [commentId])
    if (!editedComment) {
        return null;
    }

    const handleSaveButtonClick = (e) => {
        e.preventDefault()

        const commentToEdit = {
            Id: parseInt(commentId),
            Subject: editedComment.subject,
            Content: editedComment.content,
            CreateDateTime: editedComment.createDateTime,
            UserProfileId: editedComment.userProfileId,
            PostId: editedComment.postId

        }
        console.log(commentId)
        return editComment(commentToEdit)
            .then(() => {
                navigate(`/comments/${editedComment.postId}`)
            })
    }
    

    return (
        <form className="comment-form">
            <h2 className="comment-form-title">Edit your Comment</h2>
                <FormGroup className="form-group">
                    <Label htmlFor="subject">Subject:</Label>
                    <Input
                        className="comment-input"
                        type="text"
                        id="subject"
                        value={editedComment.subject}
                        onChange={
                            (event) => {
                                const copy = { ...editedComment }
                                copy.subject = event.target.value
                                setEditedComment(copy)
                            }
                        } />
                </FormGroup>

                <FormGroup className="form-group">
                    <Label htmlFor="content">Content:</Label>
                    <Input
                        className="post-input"
                        type="textarea"
                        id="content"
                        value={editedComment.content}
                        onChange={
                            (event) => {
                                const copy = { ...editedComment }
                                copy.content = event.target.value
                                setEditedComment(copy)
                            }
                        } />

                </FormGroup>


            <Button
                onClick={(clickEvent) => handleSaveButtonClick(clickEvent)} className="btn btn-primary">Save Comment</Button>
        </form>
    );
}