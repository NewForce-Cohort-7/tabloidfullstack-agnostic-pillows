import React from "react";
import { Link } from "react-router-dom";
import { Card, CardBody } from "reactstrap";

const Category = ({ category }) => {
    return (
        <div>
            <Card className="m-4">
                <p className="text-left px-2">{category.name}</p>
                <CardBody>

                </CardBody>
            </Card>
        </div>
    );
};

export default Category;
