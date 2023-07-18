const baseUrl = '/api/Post';

export const getAllPosts = () => {
    return fetch(baseUrl)
        .then((res) => res.json())
};