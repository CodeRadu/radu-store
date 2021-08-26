import React from "react";
import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { database } from "../../firebase";
import Loading from "../Loading";
import { useAuth } from "../../contexts/AuthContext";
import { Button } from "react-bootstrap";

function AdminViewProduct() {
  const { id: productId } = useParams();
  const [product, setProduct] = useState();
  const { logout } = useAuth();
  const [user, setUser] = useState();
  const { currentUser } = useAuth();

  useEffect(() => {
    database.products
      .doc(productId)
      .get()
      .then((prod) => {
        setProduct(prod.data());
      });
    database.users
      .doc(currentUser.email)
      .get()
      .then((doc) => {
        setUser(doc.data());
      });
  }, []);

  return (
    <div>
      {product && user ? (
        <div>
          <header className="header">
            <h2>
              <Link to="/" style={{ color: "black", textDecoration: "none" }}>
                Radu Store
              </Link>
            </h2>
            <div className="links">
              {user.admin && <Link to="/admin">Admin</Link>}
            </div>
            <button onClick={logout} className="btn btn-primary">
              Logout
            </button>
          </header>
          <main style={{ padding: "50px 20px" }}>
            <h2>{product.name}</h2>
            <Link to="/">Back</Link>
            <br />
            Price: {product.price}$
            <br />
            Description: {product.description}
          </main>
        </div>
      ) : (
        <Loading />
      )}
    </div>
  );
}

export default AdminViewProduct;
