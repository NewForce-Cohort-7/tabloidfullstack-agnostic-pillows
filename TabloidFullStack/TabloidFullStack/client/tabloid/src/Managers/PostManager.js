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