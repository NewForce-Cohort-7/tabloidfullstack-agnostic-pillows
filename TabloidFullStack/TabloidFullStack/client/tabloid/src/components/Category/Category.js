import React from "react";
import { Link } from "react-router-dom";
import { Card, CardBody } from "reactstrap";

const Category = ({ category }) => {
    return (
        <Card className="m-4">
            <p className="text-left px-2">Category: {category.name}</p>
            <CardBody>
                <Link to={`/categories/${category.id}`}>
                    <button>Details</button>
                </Link>
            </CardBody>
        </Card>
    );
};

export default Category;