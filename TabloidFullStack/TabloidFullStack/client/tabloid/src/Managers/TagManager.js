const baseUrl = "/api/tag";

export const GetAllTags = () => {
  return fetch(baseUrl)
  .then((res) => res.json());
};

export const addTag = (tag) => {
  return fetch(baseUrl, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(tag),
  });
};

export const deleteTag = (Id) => {
  return fetch(`${baseUrl}/${Id}`, {
    method: "DELETE",
  }).then(GetAllTags);
};

export const updateTag = (tagId, updatedName) => {
  const updatedTag = {
    name: updatedName
  };

  return fetch(`${baseUrl}/${tagId}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(updatedTag),
  }).then(response => {
    if (response.ok) {
      return response.json();
    } else {
      throw new Error('Failed to update tag');
    }
  });
};
