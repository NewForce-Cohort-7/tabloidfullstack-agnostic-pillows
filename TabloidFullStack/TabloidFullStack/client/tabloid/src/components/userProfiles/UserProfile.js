import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Card, CardBody, Button } from "reactstrap";
import { getAllUserProfiles } from "../../Managers/UserProfileManager";

export const UserProfile = ({ userProfileProp, isAdmin, handleDeactivateUser }) => {
  const [userProfiles, setUserProfiles] = useState([]);

  useEffect(() => {
    getAllUserProfiles().then((userProfiles) => setUserProfiles(userProfiles));
  }, []);


  return (
    <Card className="m-4 text-center">
      <CardBody>
        <div>
          <strong className="userProfile-title">
            <Link to={`/userprofiles/${userProfileProp.id}`}>
              <h5>{userProfileProp.fullName}</h5>
            </Link>
          </strong>
          <div className="userProfile-author">
            <strong>Display Name:</strong> {userProfileProp.displayName}
          </div>
          <div>
            <strong>User Type:</strong> {userProfileProp.userType.name}
          </div>
          {isAdmin && (
          <div>
            <strong>Account Status:</strong>{" "}
            {userProfileProp.isActive ? "Active" : "Deactivated"}
          </div>
          )}
        </div>
      </CardBody>
      {isAdmin && (
        <Button
          color="danger"
          onClick={() => handleDeactivateUser(userProfileProp.id)}
        >
          Deactivate
        </Button>
      )}
    </Card>
  );
};
