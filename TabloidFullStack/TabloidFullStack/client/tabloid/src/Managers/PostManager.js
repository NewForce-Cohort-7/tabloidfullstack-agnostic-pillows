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
export const addPost = (singlePost) => {
    return fetch(baseUrl, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(singlePost),
    });
};