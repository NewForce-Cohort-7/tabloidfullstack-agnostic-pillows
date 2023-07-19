import { CardBody } from "reactstrap"

export const Post = ({ postProp }) => {

    const publishDateTime = new Date(postProp.publishDateTime);
    const formattedDate = publishDateTime.toLocaleDateString();
    const createDateTime = new Date(postProp.createDateTime);
    const formattedCreationDate = createDateTime.toLocaleDateString();

    return (
        <CardBody>
            <div>
                <strong className="post-title">
                    {postProp.title}
                </strong>
                <div className="post-author">
                  by: {postProp.userProfile.fullName}
                </div>
                <div>
                    {postProp.category.name}
                </div>
                <div>Created: {formattedCreationDate}</div>
                <div>Published: {formattedDate}</div>
            </div>
        </CardBody>
    )
}