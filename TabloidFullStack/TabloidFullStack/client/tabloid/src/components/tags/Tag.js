import React, { useState } from "react";
import { Button, CardBody, Card } from "reactstrap";
import { deleteTag, updateTag } from "../../Managers/TagManager";
const Tag = ({ tag, getTags }) => {
const [edit, setEdit] = useState(false);
const [updatedTag, setUpdatedTag] = useState(tag.name);

    const handleDelete = (evt) => {
        evt.preventDefault();
        var results = (window.confirm('Are you 100% sure you want to delete this?'))
        if (results) {
            deleteTag(tag.id).then(() => {
                getTags()})
        };
    };
    
    const handleEdit = () => {
        setEdit(true);
      };
    
      const handleCancel = () => {
        setEdit(false);
        setUpdatedTag(tag.name);
      };
    
      const handleSave = () => {
        const gonnaUpdate = { ...tag, name: updatedTag };
        updateTag(gonnaUpdate).then(() => {
          setEdit(false);
          getTags();
        });
      };
    
      const handleChange = (evt) => {
        setUpdatedTag(evt.target.value);
      };
    return (
        <Card>
            <CardBody>
            {edit ? (
          <>
            <input
              type="text"
              value={updatedTag}
              onChange={handleChange}
            />
            <Button onClick={handleSave}>Save</Button>
            <Button onClick={handleCancel}>Cancel</Button>
          </>
        ) : (
          <>
            <p>{tag.name}</p>
            <Button onClick={handleEdit}>Edit</Button>
            <Button onClick={handleDelete}>Delete</Button>
          </>
        )}
            </CardBody>
        </Card>
    )
}

export default Tag;