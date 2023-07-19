import { useContext, useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"
import { FormGroup, Input, Label } from "reactstrap"
import { CategoryContext } from "../../Managers/CategoryManager"
import { addPost } from "../../Managers/PostManager"

export const PostForm = () => {
    const localTabloidUser = localStorage.getItem("userProfile")
    const tabloidUserObject = JSON.parse(localTabloidUser)
    const { getAllCategories, categories } = useContext(CategoryContext)
    const navigate = useNavigate();

    const [newPost, updatePost] = useState({
        title: "",
        content: "",
        imageLocation: "",
        userProfileId: tabloidUserObject.id,
        createDateTime: Date.now(),
        publishDateTime: null,
        categoryId: ""
    })

    useEffect(() => {
        getAllCategories()
    }, [])

    const handleSaveButtonClick = (e) => {
        e.preventDefault()

        if (newPost.categoryId === "") {
            alert("Please select a category");
            return;
        }

        const postToSendToAPI = {
            Title: newPost.title,
            Content: newPost.content,
            ImageLocation: newPost.imageLocation,
            CreateDateTime: new Date().toISOString(),
            PublishDateTime: null,
            IsApproved: true,
            CategoryId: newPost.categoryId,
            UserProfileId: tabloidUserObject.id
        }
        addPost(postToSendToAPI)
            .then(navigate("/"))
    }

    return (
        <form className="post-form">
            <h2 className="post-form-title">Create a New Post</h2>
            <fieldset>
                <div className="form-group">
                    <label htmlFor="title">Title:</label>
                    <input
                        type="text"
                        id="title"
                        value={newPost.title}
                        onChange={
                            (event) => {
                                const copy = { ...newPost }
                                copy.title = event.target.value
                                updatePost(copy)
                            }
                        } />
                </div>
            </fieldset>
            <fieldset>
                <div className="form-group">
                    <label htmlFor="content">Content:</label>
                    <input
                        type="textbox"
                        id="content"
                        value={newPost.content}
                        onChange={
                            (event) => {
                                const copy = { ...newPost }
                                copy.content = event.target.value
                                updatePost(copy)
                            }
                        } />
                </div>
            </fieldset>
            <fieldset>
                <div className="form-group">
                    <label htmlFor="imageLocation">Image Url:</label>
                    <input
                        type="text"
                        id="imageLocation"
                        value={newPost.imageLocation}
                        onChange={
                            (event) => {
                                const copy = { ...newPost }
                                copy.imageLocation = event.target.value
                                updatePost(copy)
                            }
                        } />
                </div>
            </fieldset>
            <fieldset>
                <FormGroup>
                    <Label for="categoryDropdown">Select Category:</Label>
                    <Input
                        type="select"
                        name="category"
                        id="categoryDropdown"
                        value={newPost.categoryId}
                        onChange={(event) => {
                            const copy = { ...newPost }
                            copy.categoryId = parseInt(event.target.value)
                            updatePost(copy)
                        }}
                    >
                        <option value="">Select...</option>
                        {categories.map((category) => (
                            <option key={category.id} value={category.id || ""}>{category.name}</option>
                        ))}
                    </Input>
                </FormGroup>
            </fieldset>
            <button
                onClick={(clickEvent) => handleSaveButtonClick(clickEvent)} className="btn btn-primary">Submit Post</button>
        </form>
    )
}   