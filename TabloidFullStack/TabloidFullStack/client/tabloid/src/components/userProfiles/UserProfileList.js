import { useEffect, useState } from "react";
import { getAllUserProfiles } from "../../Managers/UserProfileManager";
import { Card, Col, Container, Row } from "reactstrap";
import { UserProfile } from "./UserProfile";

export const UserProfileList = () => {
    const [userProfiles, setUserProfiles] = useState([]);

    useEffect(() => {
        getAllUserProfiles()
            .then(userProfiles => {
                // sorts userProfiles by display name alphabetically
                const sortedUserProfiles = userProfiles.sort((a, b) =>
                    a.displayName.localeCompare(b.displayName)
                );
                setUserProfiles(sortedUserProfiles);
            });
    }, []);

    return (
        <Container>
            <Row>
                <Col>
                    <h1>User Profiles</h1>
                </Col>
            </Row>
            <Row>
                {userProfiles.map((userProfile) => (
                    <Col md="4" key={userProfile.id}>
                        <UserProfile userProfileProp={userProfile} />
                    </Col>
                ))}
            </Row>
        </Container>
    );
};
