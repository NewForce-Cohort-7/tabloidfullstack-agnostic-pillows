import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"
import { FormGroup, Input, Label } from "reactstrap"

export const PostForm = () => {
    const localTabloidUser = localStorage.getItem("userProfile")
    const tabloidUserObject = JSON.parse(localTabloidUser)
    const [selectedCategory, setSelectedCategory] = useState([])
    const navigate = useNavigate();

    const [newPost, updatePost] = useState({
        title: "",
        content: "",
        imageLocation: "",
        userProfileId: tabloidUserObject.id,
        createDateTime: Date.now(),
        publishDateTime: null,
        categoryId: null
    })
    
    useEffect(() => {
        
    },[])

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
                        value={selectedCategory.id}
                        onChange={event => updatePost(event)}
                    >
                        <option value="">Select...</option>
                        {categories.map((category) => (
                            <option key={category.id} value={category}>{category.name}</option>
                        ))}
                    </Input>
                </FormGroup>
            </fieldset>
            <button
                onClick={(clickEvent) => handleSaveButtonClick(clickEvent)} className="btn btn-primary">Submit Post</button>
        </form>
    )
}