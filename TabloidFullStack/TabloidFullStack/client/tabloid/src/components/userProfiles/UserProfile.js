import React, { useState, useEffect } from "react"
import { Card, CardBody } from "reactstrap"
import { getAllUserProfiles } from "../../Managers/UserProfileManager"

export const UserProfile = ({ userProfileProp }) => {
    
        const [userProfiles, setUserProfiles] = useState([]);
    
        useEffect(() => {
            getAllUserProfiles()
                .then(userProfiles => setUserProfiles(userProfiles));
        }, []);
    
        return (
            <Card className="m-4 text-center">
            <CardBody>
                <div>
                    <strong className="userProfile-title">
                        <h5>{userProfileProp.fullName}</h5>
                    </strong>
                    <div className="userProfile-author">
                      <strong>Display Name:</strong> {userProfileProp.displayName}
                    </div>
                    <div>
                     <strong>User Type:</strong> {userProfileProp.userType.name}
                    </div>
                </div>
            </CardBody>
            </Card>
        )
    }
