import React from "react";
import { Button, CardBody, Card } from "reactstrap";
import { deleteTag, updateTag } from "../../Managers/TagManager";
const Tag = ({ tag, getTags }) => {

    const handleDelete = (evt) => {
        evt.preventDefault();
        var results = (window.confirm('Delete the item?'))
        if (results) {
            deleteTag(tag.id).then(() => {
                getTags()})
        };
    };
    
    const handleEdit = () => {
        <></>
    }
    return (
        <Card>
            <CardBody>
                <p>{tag.name}</p>
                <Button onClick={handleEdit}>Edit</Button>
                <Button onClick={handleDelete}>Delete</Button>
            </CardBody>
        </Card>
    )
}

export default Tag;