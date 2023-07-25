import { useContext, useEffect, useState } from "react"
import { useParams } from "react-router-dom"
import { useNavigate } from "react-router-dom"
import { Button, FormGroup, Input, Label } from "reactstrap"
import { addComment } from "../../Managers/CommentManager.js"

export const CommentForm = () => {

    //GUESS WHAT! THIS HAS TO MATCH THE ID IN THE URL OF THE ROUTE IN APPVIEWS!
    const { postId } = useParams();

    const localTabloidUser = localStorage.getItem("userProfile")
    const tabloidUserObject = JSON.parse(localTabloidUser)
    const navigate = useNavigate();
    const currentDate = new Date();
    const offset = currentDate.getTimezoneOffset();
    const timezoneOffset = offset * 60 * 1000;
    const correctedDate = new Date(currentDate.getTime() - timezoneOffset)

    const [newComment, updateComment] = useState({
        PostId: postId,
        UserProfileId: tabloidUserObject.id,
        subject: "",
        content: "",
        CreateDateTime: correctedDate.toISOString()
    })

    const handleSaveButtonClick = (e) => {
        e.preventDefault()

        const commentToSendToAPI = {
            PostId: postId,
            UserProfileId: tabloidUserObject.id,
            Subject: newComment.subject,
            Content: newComment.content,
            CreateDateTime: correctedDate.toISOString()
        }

        console.log(postId)
        addComment(commentToSendToAPI)
        .then(() => {
            if (postId) {
                navigate(`/comments/${postId}`);
            }
        });
    };

    return (
        <form className="comment-form">
            <h2 className="comment-form-title">Create a New Comment</h2>

                <FormGroup className="form-group">
                    <Label htmlFor="subject">Subject:</Label>
                    <Input
                        className="comment-input"
                        type="text"
                        id="subject"
                        value={newComment.subject}
                        onChange={
                            (event) => {
                                const copy = { ...newComment }
                                copy.subject = event.target.value
                                updateComment(copy)
                            }
                        } />
                </FormGroup>

                <FormGroup className="form-group">
                    <Label htmlFor="content">Content:</Label>
                    <Input
                        className="comment-input"
                        type="textarea"
                        id="content"
                        value={newComment.content}
                        onChange={
                            (event) => {
                                const copy = { ...newComment }
                                copy.content = event.target.value
                                updateComment(copy)
                            }
                        } />
                </FormGroup>
   
            <Button
                onClick={(clickEvent) => handleSaveButtonClick(clickEvent)} className="btn btn-primary">Save Comment</Button>
        </form>
    )
}   