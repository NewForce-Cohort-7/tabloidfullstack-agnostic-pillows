import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { Button, Form, FormGroup, Label, Input } from 'reactstrap';
import { getUserProfileById, updateUserType, getAllUserTypes } from "../../Managers/UserProfileManager";

export const EditUserProfile = () => {
  const [userProfile, setUserProfile] = useState({});
  const [userTypes, setUserTypes] = useState([]);
  const { id } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    // fetch the User Profile
    getUserProfileById(id).then(setUserProfile);

    // fetch all user types
    getAllUserTypes().then(setUserTypes);
  }, [id]);

  const handleFieldChange = (evt) => {
    const stateToChange = { ...userProfile };
    stateToChange[evt.target.id] = evt.target.value;
    setUserProfile(stateToChange);
  };

  const saveUserProfile = (evt) => {
    evt.preventDefault(); 

    updateUserType(id, userProfile.userTypeId).then(() => navigate('/users'));
  };

  const cancelEdit = () => {
    navigate('/users');
  };

  return (
    <Form>
      <h2>Edit User Profile</h2>
      <FormGroup>
        <Label for="userTypeId">User Type:</Label>
        <Input
            type="select"
            id="userTypeId"
            onChange={handleFieldChange}
            value={userProfile.userTypeId}
        >
            {userTypes.map(type =>
              <option key={type.id} value={type.id}>{type.name}</option>
            )}
        </Input>
      </FormGroup>
      <Button onClick={saveUserProfile} className="me-2">Save</Button>
      <Button onClick={cancelEdit}>Cancel</Button>
    </Form>
  );
};
