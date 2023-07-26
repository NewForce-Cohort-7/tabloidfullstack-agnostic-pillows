import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { getUserProfileById } from "../../Managers/UserProfileManager";
import { Card, CardBody, CardImg, CardTitle, CardSubtitle, Button, Container, Row, Col } from "reactstrap";
import { UserProfileEdit } from "./UserProfileEdit";

export const UserProfileDetails = () => {
    const { id } = useParams();
    const [userProfile, setUserProfile] = useState({});
    const navigate = useNavigate();
    const [showEdit, setShowEdit] = useState(false);

    const loggedInUser = JSON.parse(localStorage.getItem("userProfile"));
    const isAdmin = loggedInUser?.userType?.id === 1;
    const localTabloidUser = localStorage.getItem("userProfile");
    const tabloidUserObject = JSON.parse(localTabloidUser);

    useEffect(() => {
        getUserProfileById(id)
            .then(userProfileFromAPI => {
                setUserProfile(userProfileFromAPI);
                console.log(userProfileFromAPI)
            });
    }, [id]);

    return (
        !showEdit ?
            <Container>
                <Button onClick={() => navigate(-1)}>Back to User Profiles</Button>
                <Row>
                    <Col sm="12" md={{ size: 6, offset: 3 }}>
                        <Card className="m-auto">
                            <CardImg top width="100%" src={userProfile.imageLocation || 'https://media.tenor.com/EYUlar2QIe4AAAAd/plink.gif'} alt="Profile pic" />
                            {(tabloidUserObject.id === userProfile.id) ? <>
                                <Button onClick={() => setShowEdit(true)}>Change Profile Avatar</Button>
                            </>
                                : <></>
                            }
                            <CardBody>
                                <CardTitle tag="h4">{userProfile.displayName}</CardTitle>
                                <CardSubtitle tag="h6" className="mb-2">Email: {userProfile.email}</CardSubtitle>
                                <CardSubtitle tag="h6" className="mb-2">Full Name: {userProfile.firstName} {userProfile.lastName}</CardSubtitle>
                                <CardSubtitle tag="h6" className="mb-2">User Type: {userProfile.userType?.name}</CardSubtitle>
                                <CardSubtitle tag="h6" className="mb-2">Creation Date: {
                                    new Date(userProfile.createDateTime).toLocaleDateString('en-US')
                                }</CardSubtitle>
                                {isAdmin && (
                                    <CardSubtitle tag="h6" className="mb-2">Account Status: {userProfile.isActive ? "Active" : "Deactivated"}</CardSubtitle>
                                )}
                            </CardBody>
                        </Card>
                    </Col>
                </Row>
            </Container>
            :
            <UserProfileEdit userProfileProp={userProfile} setUserProfile={setUserProfile} setShowEdit={setShowEdit} isAdmin={isAdmin} />
    );
}


