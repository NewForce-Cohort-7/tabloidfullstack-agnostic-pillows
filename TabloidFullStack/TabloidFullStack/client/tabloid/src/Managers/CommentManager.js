const baseUrl = '/api/Comment';

export const getCommentsByPostId = (id) => {
    //make sure the fetch call matches the Request URL from your swagger
    return fetch(`${baseUrl}/${id}`)
        .then((res) => res.json())
};

export const addComment = (commentObject) => {
    return fetch(baseUrl, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(commentObject),
    })
    .then((res) => {
        if (!res.ok) {
            throw new Error("Failed to create new Comment")
        }
        return res.json();
    });
};