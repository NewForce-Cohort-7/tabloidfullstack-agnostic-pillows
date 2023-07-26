import { useState } from "react"
import { editUserProfile, getUserProfileById, uploadUserProfileImage } from "../../Managers/UserProfileManager";
import { Button, CardBody, CardSubtitle, CardTitle, FormGroup, Input, Label } from "reactstrap";
import { useParams } from "react-router-dom";

export const UserProfileEdit = ({ userProfileProp, setUserProfile, setShowEdit, isAdmin }) => {
    const [editedUserProfile, setEditedUserProfile] = useState({
        displayName: "",
        firstName: "",
        lastName: "",
        email: "",
        createDateTime: Date.now(),
        imageLocation: "",
        userTypeId: null,
        isActive: null
    })
    const [selectedImage, setSelectedImage] = useState(null);

    const handleSaveButtonClick = (e) => {
        e.preventDefault()

        const userProfileToEdit = {
            Id: userProfileProp.id,
            DisplayName: userProfileProp.displayName,
            FirstName: userProfileProp.firstName,
            LastName: userProfileProp.lastName,
            Email: userProfileProp.email,
            CreateDateTime: userProfileProp.createDateTime,
            ImageLocation: editedUserProfile.imageLocation,
            userTypeId: userProfileProp.userProfileId,
            isActive: userProfileProp.isActive
        }
        editUserProfile(userProfileToEdit)
            .then(() => getUserProfileById(userProfileProp.id))
            .then((updatedProfile) => setUserProfile(updatedProfile));
            setShowEdit(false)
    }
    const handleImageChange = async (e) => {
        const file = e.target.files[0];

        try {
            const res = await uploadUserProfileImage(file);
            const data = await res.json();
            if (data.imageUrl) {
                const copy = { ...editedUserProfile }
                copy.imageLocation = data.imageUrl
                setEditedUserProfile(copy);
            }
            else {
                alert("Image Upload Failed")
            }
        } catch (error) {
            console.error("Error uploading image: ", error);
            alert("An error occured during the image upload");
        }
    };

    return (
        <>
            <CardBody>
            <FormGroup className="form-group">
                <Label htmlFor="imageLocation">Image Url:</Label>
                <Input
                    className="userProfile-input"
                    type="file"
                    id="imageLocation"
                    onChange={handleImageChange} />
                {selectedImage && <p>Selected Image: {selectedImage}</p>}
            </FormGroup>
            <Button onClick={(clickEvent) => handleSaveButtonClick(clickEvent)} className="btn btn-primary">Upload New Avatar</Button>
                <CardTitle tag="h4">{userProfileProp.displayName}</CardTitle>
                <CardSubtitle tag="h6" className="mb-2">Email: {userProfileProp.email}</CardSubtitle>
                <CardSubtitle tag="h6" className="mb-2">Full Name: {userProfileProp.firstName} {userProfileProp.lastName}</CardSubtitle>
                <CardSubtitle tag="h6" className="mb-2">User Type: {userProfileProp.userType?.name}</CardSubtitle>
                <CardSubtitle tag="h6" className="mb-2">Creation Date: {
                    new Date(userProfileProp.createDateTime).toLocaleDateString('en-US')
                }</CardSubtitle>
                {isAdmin && (
                    <CardSubtitle tag="h6" className="mb-2">Account Status: {userProfileProp.isActive ? "Active" : "Deactivated"}</CardSubtitle>
                )}
            </CardBody>
        </>
    )
}