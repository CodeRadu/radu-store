import { Button, Card } from "react-bootstrap";
import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../../contexts/AuthContext";
import { database } from "../../firebase";
import Loading from "../Loading";
import CreateProductModal from "./CreateProductModal";
import { v4 as uuidv4 } from "uuid";
import { useCollectionData } from "react-firebase-hooks/firestore";
import AdminProduct from "./AdminProduct";

function Admin() {
  const { logout } = useAuth();
  const [user, setUser] = useState();
  const [admin, setAdmin] = useState(false);
  const [createProductModal, setCreateProductModal] = useState(false);
  const { currentUser } = useAuth();
  const [productName, setProductName] = useState("");
  const [productDescription, setProductDescription] = useState("");
  const [productPrice, setProductPrice] = useState(0);
  const query = database.products.orderBy("createdAt");
  const [products] = useCollectionData(query, { idField: "id" });

  useEffect(() => {
    database.users
      .doc(currentUser.email)
      .get()
      .then((doc) => {
        setUser(doc.data());
      });
  }, []);

  function openCreateProductModal() {
    setCreateProductModal(true);
  }

  function closeCreateProductModal() {
    setCreateProductModal(false);
  }

  function handleCreateProduct() {
    if (productName == "" || productDescription == "" || productPrice == 0) {
      setCreateProductModal(false);
      return;
    }
    const id = uuidv4();
    database.products.doc(id).set({
      id,
      name: productName,
      description: productDescription,
      price: productPrice,
      createdAt: database.getCurrentTimestamp(),
    });

    setProductName("");
    setProductDescription("");
    setProductPrice(0);

    setCreateProductModal(false);
  }

  return (
    <div>
      {user ? (
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
            <div className="Products">
              <h2>Products</h2>
              <Button variant="primary" onClick={openCreateProductModal}>
                Add product
              </Button>
              <CreateProductModal
                createProductModal={createProductModal}
                closeCreateProductModal={closeCreateProductModal}
                setProductDescription={setProductDescription}
                setProductName={setProductName}
                setProductPrice={setProductPrice}
                handleCreateProduct={handleCreateProduct}
              />
              <p>
                {products &&
                  products.map((product) => <AdminProduct product={product} />)}
              </p>
            </div>
          </main>
        </div>
      ) : (
        <Loading />
      )}
    </div>
  );
}

export default Admin;
