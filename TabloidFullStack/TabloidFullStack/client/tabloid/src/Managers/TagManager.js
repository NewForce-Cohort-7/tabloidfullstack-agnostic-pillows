const baseUrl = 'https://localhost:5001';

export const GetAllTags = () => {
    return fetch(`${baseUrl}/api/tag`)
    .then((res) => res.json())
};
