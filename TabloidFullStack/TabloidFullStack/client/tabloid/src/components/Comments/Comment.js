import { CardBody } from "reactstrap"

export const Comment = ({ commentProp }) => {

    const commentDateTime = new Date(commentProp.createDateTime);
    const formattedDate = commentDateTime.toLocaleDateString();

    return (
        <CardBody>
            <div>
                <div> Subject: {commentProp.subject} </div>
                <div> {commentProp.content}</div>
                <div> Author: {commentProp.userProfile.displayName}</div>
                <div> Date: {formattedDate}</div>
            </div>
        </CardBody>
    )
}