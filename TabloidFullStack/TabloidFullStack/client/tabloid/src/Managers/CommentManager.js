const baseUrl = '/api/Comment';

export const getCommentsByPostId = (id) => {
    //make sure the fetch call matches the Request URL from your swagger
    return fetch(`${baseUrl}/${id}`)
        .then((res) => res.json())
};