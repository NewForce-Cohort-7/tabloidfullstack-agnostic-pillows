import React from "react";
import { Button, CardBody, Card } from "reactstrap";
import { deleteTag } from "../../Managers/TagManager";
const Tag = ({ tag, getTags }) => {

    const handleDelete = (evt) => {
        evt.preventDefault();
        var results = (window.confirm('Delete the item?'))
        if (results) {
            deleteTag(tag.id).then(() => {
                getTags()})
        };
    };

    return (
        <Card>
            <CardBody>
                <p>{tag.name}</p>
                <Button onClick={handleDelete}>Delete</Button>
            </CardBody>
        </Card>
    )
}

export default Tag;