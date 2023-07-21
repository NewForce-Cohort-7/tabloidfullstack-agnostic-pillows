import { useContext, useEffect, useState } from "react"
import { editPost, getPostById } from "../../Managers/PostManager";
import { useNavigate, useParams } from "react-router-dom";
import { CategoryContext } from "../../Managers/CategoryManager";
import { Button, FormGroup, Input, Label } from "reactstrap";

export const PostEdit = () => {
    const localTabloidUser = localStorage.getItem("userProfile")
    const tabloidUserObject = JSON.parse(localTabloidUser)
    const { postId } = useParams();
    const navigate = useNavigate();
    const { getAllCategories, categories } = useContext(CategoryContext)
    
    useEffect(() => {
        getAllCategories()
    }, [])
    
    const [editedPost, setEditedPost] = useState({
        title: "",
        content: "",
        imageLocation: "",
        userProfileId: tabloidUserObject.id,
        createDateTime: Date.now(),
        publishDateTime: null,
        categoryId: ""
    })
    useEffect(() => {
        getPostById(postId).then((res) => {
            setEditedPost(res)
        }
        );
    }, [postId])
    if (!editedPost) {
        return null;
    }

    const handleSaveButtonClick = (e) => {
        e.preventDefault()

        const postToEdit = {
            Id: parseInt(postId),
            Title: editedPost.title,
            Content: editedPost.content,
            ImageLocation: editedPost.imageLocation,
            CreateDateTime: editedPost.createDateTime,
            PublishDateTime: editedPost.publishDateTime,
            IsApproved: true,
            CategoryId: editedPost.categoryId,
            UserProfileId: editedPost.userProfileId
        }
        return editPost(postToEdit)
            .then(() => {
                navigate(`/posts/${editedPost.id}`)
            })
    }

    return (
        <form className="post-form">
            <h2 className="post-form-title">Create a New Post</h2>
                <FormGroup className="form-group">
                    <Label htmlFor="title">Title:</Label>
                    <Input
                        className="post-input"
                        type="text"
                        id="title"
                        value={editedPost.title}
                        onChange={
                            (event) => {
                                const copy = { ...editedPost }
                                copy.title = event.target.value
                                setEditedPost(copy)
                            }
                        } />
                </FormGroup>
                <FormGroup className="form-group">
                    <Label htmlFor="content">Content:</Label>
                    <Input
                        className="post-input"
                        type="textarea"
                        id="content"
                        value={editedPost.content}
                        onChange={
                            (event) => {
                                const copy = { ...editedPost }
                                copy.content = event.target.value
                                setEditedPost(copy)
                            }
                        } />
                </FormGroup>
                <FormGroup className="form-group">
                    <Label htmlFor="imageLocation">Image Url:</Label>
                    <Input
                        className="post-input"
                        type="text"
                        id="imageLocation"
                        value={editedPost.imageLocation}
                        onChange={
                            (event) => {
                                const copy = { ...editedPost }
                                copy.imageLocation = event.target.value
                                setEditedPost(copy)
                            }
                        } />
                </FormGroup>
                <FormGroup>
                    <Label for="categoryDropdown">Select Category:</Label>
                    <Input
                        className="post-input"
                        type="select"
                        name="category"
                        id="categoryDropdown"
                        value={editedPost.categoryId}
                        onChange={(event) => {
                            const copy = { ...editedPost }
                            copy.categoryId = parseInt(event.target.value)
                            setEditedPost(copy)
                        }}
                    >
                        <option value="">Select...</option>
                        {categories.map((category) => (
                            <option key={category.id} value={category.id || ""}>{category.name}</option>
                        ))}
                    </Input>
                </FormGroup>
            <Button
                onClick={(clickEvent) => handleSaveButtonClick(clickEvent)} className="btn btn-primary">Submit Post</Button>
        </form>
    );
}