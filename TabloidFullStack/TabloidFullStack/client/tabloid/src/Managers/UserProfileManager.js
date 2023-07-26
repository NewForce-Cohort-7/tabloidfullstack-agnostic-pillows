const apiUrl = "https://localhost:5001";

export const login = (userObject) => {
  return fetch(`${apiUrl}/api/userprofile/getbyemail?email=${userObject.email}`)
    .then((r) => r.json())
    .then((userProfile) => {
      if (userProfile && userProfile.id && userProfile.isActive) {
        localStorage.setItem("userProfile", JSON.stringify(userProfile));
        return userProfile;
      } else {
        throw new Error("Invalid email or account deactivated");
      }
    })
    .catch((error) => {
      throw new Error("Invalid email or account deactivated");
    });
};

export const logout = () => {
      localStorage.clear()
};

export const getUserStatus = (email) => {
  return fetch(`${apiUrl}/api/UserProfile/GetByEmail?email=${email}`).then((res) => res.json());
};

export const register = (userObject, password) => {
  return  fetch(`${apiUrl}/api/userprofile`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(userObject),
  })
  .then((response) => response.json())
    .then((savedUserProfile) => {
      localStorage.setItem("userProfile", JSON.stringify(savedUserProfile))
    });
};

// user profile stuff 
export const getAllUserProfiles = () => {
  return fetch(`${apiUrl}/api/userprofile`)
  .then((response) => response.json())
};

export const getUserProfileById = (id) => {
  return fetch(`${apiUrl}/api/userprofile/${id}`)
  .then((response) => response.json())
};

// grab user types 
export const getAllUserTypes = () => {
  return fetch(`${apiUrl}/api/UserProfile/GetUserTypes`)
  .then((response) => response.json())
};

// update user type 
export const updateUserType = (id, userTypeId) => {
  return fetch(`/api/userprofile/UpdateUserType/${id}`, {
      method: "PATCH",
      headers: {
          "Content-Type": "application/json"
      },
      body: JSON.stringify(userTypeId)
  })
}

export const deactivateUserProfile = (id) => {
  return fetch(`${apiUrl}/api/userprofile/deactivate/${id}`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ isActive: false }),
  })
}

export const reactivateUserProfile = (id) => {
  return fetch(`${apiUrl}/api/userprofile/reactivate/${id}`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ isActive: true }),
  })
}
export const uploadUserProfileImage = (singleImage) => {
  const formData = new FormData();
  formData.append("image", singleImage)
  return fetch(`${apiUrl}/api/UserProfile/upload-image`, {
      method: "POST",
      body: formData,
  })
}
export const editUserProfile = (userProfile) => {
  //make sure your parameter matches the one you are sending to the API
  return fetch(`${apiUrl}/api/UserProfile/${userProfile.Id}`, {
      method: "PUT",
      headers: {
          "Content-Type": "application/json"
      },
      body: JSON.stringify(userProfile)
  })
}


// return (
//   <UserProfileContext.Provider value={{ isLoggedIn, login, logout, register,  }}>
//      {props.children}
//   </UserProfileContext.Provider>
// );
