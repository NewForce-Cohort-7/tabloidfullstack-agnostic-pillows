import { useContext, useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"
import { Button, FormGroup, Input, Label } from "reactstrap"
import { CategoryContext } from "../../Managers/CategoryManager"
import { addPost } from "../../Managers/PostManager"

export const PostForm = () => {
    const localTabloidUser = localStorage.getItem("userProfile")
    const tabloidUserObject = JSON.parse(localTabloidUser)
    const { getAllCategories, categories } = useContext(CategoryContext)
    const navigate = useNavigate();
    const currentDate = new Date();
    const offset = currentDate.getTimezoneOffset();
    const timezoneOffset = offset * 60 * 1000;
    const correctedDate = new Date(currentDate.getTime() - timezoneOffset)

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
        //The page that displays all of the posts only shows posts with the publish date < or = to the current time. Unfortunately, the function new Date().toISOString() adds a date that uses UTC, NOT my current timezone. So on line 12-15 I calculated the offset of the timezone in milliseconds, and then subtracted it from the UTC time, and then converted that to an ISOString, allowing me to give the database the correct format of date, while also letting me see my new post immediately instead of having to wait 5 hours.
        
        const postToSendToAPI = {
            Title: newPost.title,
            Content: newPost.content,
            ImageLocation: newPost.imageLocation,
            CreateDateTime: correctedDate.toISOString(),
            PublishDateTime: correctedDate.toISOString(),
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
                <FormGroup className="form-group">
                    <Label htmlFor="title">Title:</Label>
                    <Input
                        className="post-input"
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
                </FormGroup>
                <FormGroup className="form-group">
                    <Label htmlFor="content">Content:</Label>
                    <Input
                        className="post-input"
                        type="textarea"
                        id="content"
                        value={newPost.content}
                        onChange={
                            (event) => {
                                const copy = { ...newPost }
                                copy.content = event.target.value
                                updatePost(copy)
                            }
                        } />
                </FormGroup>
                <FormGroup className="form-group">
                    <Label htmlFor="imageLocation">Image Url:</Label>
                    <Input
                        className="post-input"
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
                </FormGroup>
                <FormGroup>
                    <Label for="categoryDropdown">Select Category:</Label>
                    <Input
                        className="post-input"
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
            <Button
                onClick={(clickEvent) => handleSaveButtonClick(clickEvent)} className="btn btn-primary">Submit Post</Button>
        </form>
    )
}   