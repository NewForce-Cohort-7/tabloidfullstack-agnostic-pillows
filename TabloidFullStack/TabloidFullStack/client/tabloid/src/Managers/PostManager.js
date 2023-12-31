const baseUrl = '/api/Post';

export const getAllPosts = () => {
    return fetch(baseUrl)
        .then((res) => res.json())
};
export const getAllUsersPosts = (id) => {
    //make sure the fetch call matches the Request URL from your swagger
    return fetch(`${baseUrl}/GetUsersPosts/${id}`)
        .then((res) => res.json())
};
export const getPostById = (id) => {
    return fetch(`${baseUrl}/${id}`)
        .then((res) => res.json())
};
//I had to have the addPost fetch call return a response to get the id from the created post. So that I can use that id to navigate to the newly created post's details page
export const addPost = (singlePost) => {
    return fetch(baseUrl, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(singlePost),
    })
        .then((res) => {
            if (!res.ok) {
                throw new Error("Failed to create new Post")
            }
            return res.json();
        })
        .then((data) => {
            return data.id;
        });
};
export const editPost = (post) => {
    //make sure your parameter matches the one you are sending to the API
    return fetch(`${baseUrl}/${post.Id}`, {
        method: "PUT",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(post)
    })
}
export const deletePost = (id) => {
    return fetch(`${baseUrl}/${id}`, {
        method: "DELETE",
    }).then(getAllPosts)
}
export const uploadPostImage = (singleImage) => {
    const formData = new FormData();
    formData.append("image", singleImage)
    return fetch(`${baseUrl}/upload-image`, {
        method: "POST",
        body: formData,
    })
}
