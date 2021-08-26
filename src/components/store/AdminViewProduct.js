import React from "react";
import { useEffect, useState } from "react";
import { useParams, Link, useHistory } from "react-router-dom";
import { database } from "../../firebase";
import Loading from "../Loading";
import { useAuth } from "../../contexts/AuthContext";
import { Button } from "react-bootstrap";

function AdminViewProduct() {
  const { id: productId } = useParams();
  const [product, setProduct] = useState();
  const { logout } = useAuth();
  const history = useHistory();

  useEffect(() => {
    database.products
      .doc(productId)
      .get()
      .then((prod) => {
        setProduct(prod.data());
      });
  }, []);

  function edit() {
    history.push(`/admin/products/edit/${product.id}`);
  }

  function del() {
    database.products
      .doc(product.id)
      .delete()
      .then(() => {
        history.push("/admin");
      });
  }

  return (
    <div>
      {product ? (
        <div>
          <header className="header">
            <h2>
              <Link
                to="/admin"
                style={{ color: "black", textDecoration: "none" }}
              >
                Radu Store
              </Link>
            </h2>
            <div className="links">
              <Link to="/">Dashboard</Link>
            </div>
            <button onClick={logout} className="btn btn-primary">
              Logout
            </button>
          </header>
          <main style={{ padding: "50px 20px" }}>
            <h2>{product.name}</h2>
            <Link to="/admin">Back</Link>
            <br />
            Price: {product.price}$
            <br />
            Description: {product.description}
            <div className="buttons">
              <Button variant="primary" onClick={edit}>
                Edit
              </Button>
              <Button variant="danger" onClick={del}>
                Delete
              </Button>
            </div>
          </main>
        </div>
      ) : (
        <Loading />
      )}
    </div>
  );
}

export default AdminViewProduct;
