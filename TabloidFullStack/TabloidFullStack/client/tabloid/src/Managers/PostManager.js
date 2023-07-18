const baseUrl = '/api/Post';

export const getAllPosts = () => {
    return fetch(baseUrl)
        .then((res) => res.json())
};
export const getAllUsersPosts = (UserId) => {
    return fetch(`${baseUrl}/UserId?id=${UserId}`)
    .then((res) => res.json())
};