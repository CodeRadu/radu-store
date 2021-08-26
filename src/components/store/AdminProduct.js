import React from "react";
import { Card } from "react-bootstrap";
import { Link } from "react-router-dom";

function AdminProduct({ product }) {
  return (
    <Card>
      <h2>{product.name}</h2>
      {product.price} $<Link to={`/admin/products/${product.id}`}>View</Link>
    </Card>
  );
}

export default AdminProduct;
