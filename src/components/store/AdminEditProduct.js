import React, { useState, useEffect } from "react";
import { Form, InputGroup, Button } from "react-bootstrap";
import { Link, useParams, useHistory } from "react-router-dom";
import { useAuth } from "../../contexts/AuthContext";
import { database } from "../../firebase";
import Loading from "../Loading";

function AdminEditProduct() {
  const [productName, setProductName] = useState("");
  const [productDescription, setProductDescription] = useState("");
  const [productPrice, setProductPrice] = useState(0);
  const [product, setProduct] = useState();
  const { logout } = useAuth();
  const { id: productId } = useParams();
  const history = useHistory();

  useEffect(() => {
    database.products
      .doc(productId)
      .get()
      .then((prod) => {
        setProduct(prod.data());
        setProductName(prod.data().name);
        setProductDescription(prod.data().description);
        setProductPrice(prod.data().price);
      });
  }, []);

  async function save() {
    await database.products.doc(product.id).set({
      createdAt: product.createdAt,
      name: productName,
      description: productDescription,
      price: productPrice,
      id: product.id,
    });
    history.push(`/admin/products/${product.id}`);
  }

  function cancel() {
    history.push(`/admin/products/${product.id}`);
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
            <InputGroup style={{ padding: "10px" }}>
              <InputGroup.Prepend>
                <Form.Control
                  placeholder="Name"
                  value={productName}
                  onChange={(e) => setProductName(e.target.value)}
                />
              </InputGroup.Prepend>
            </InputGroup>
            <InputGroup style={{ padding: "10px" }}>
              <InputGroup.Prepend>
                <Form.Control
                  placeholder="Description"
                  value={productDescription}
                  onChange={(e) => setProductDescription(e.target.value)}
                />
              </InputGroup.Prepend>
            </InputGroup>
            <InputGroup style={{ padding: "10px" }}>
              <InputGroup.Prepend>
                <Form.Control
                  placeholder="Price in $"
                  type="number"
                  value={productPrice}
                  step="0.01"
                  min="0"
                  onChange={(e) => setProductPrice(e.target.value)}
                />
              </InputGroup.Prepend>
            </InputGroup>
            <Button variant="primary" onClick={save}>
              Save
            </Button>
            <Button variant="secondary" onClick={cancel}>
              Cancel
            </Button>
          </main>
        </div>
      ) : (
        <Loading />
      )}
    </div>
  );
}

export default AdminEditProduct;
