import { useEffect, useState } from "react";
import { getAllUserProfiles } from "../../Managers/UserProfileManager";
import { Card, Col, Container, Row } from "reactstrap";
import { UserProfile } from "./UserProfile";
import { deactivateUserProfile } from "../../Managers/UserProfileManager";

export const UserProfileList = () => {
  const [userProfiles, setUserProfiles] = useState([]);

  useEffect(() => {
    getAllUserProfiles().then((userProfiles) => {
      const sortedUserProfiles = sortUserProfilesByActivation(userProfiles);
      setUserProfiles(sortedUserProfiles);
    });
  }, []);

  const loggedInUser = JSON.parse(localStorage.getItem("userProfile"));
  const isAdmin = loggedInUser?.userType?.id === 1;

  // this handles the deactivation of a user
  const handleDeactivateUser = (userId) => {
    if (window.confirm("Are you sure you want to deactivate this user?")) {
      deactivateUserProfile(userId).then(() => {
        // after deactivating, fetch all user profiles again and update the state
        getAllUserProfiles().then((userProfiles) => {
          const sortedUserProfiles = sortUserProfilesByActivation(userProfiles);
          setUserProfiles(sortedUserProfiles);
        });
      });
    }
  };

  // sort user profiles by activation status 
  const sortUserProfilesByActivation = (profiles) => {
    return profiles.sort((a, b) => {
      if (a.isActive && !b.isActive) return -1; // active profiles come first
      if (!a.isActive && b.isActive) return 1; // deactivated profiles come next
      // if both profiles have the same activation status, sort by display name
      return a.displayName.localeCompare(b.displayName);
    });
  };

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
            <UserProfile
              key={userProfile.id}
              userProfileProp={userProfile}
              isAdmin={isAdmin}
              handleDeactivateUser={handleDeactivateUser}
            />
          </Col>
        ))}
      </Row>
    </Container>
  );
};
