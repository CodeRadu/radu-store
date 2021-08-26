import React, { useEffect } from "react";
import "../../css/Dashboard.css";
import { Link } from "react-router-dom";
import { useState } from "react";
import { useAuth } from "../../contexts/AuthContext";
import { database } from "../../firebase";
import Loading from "../Loading";
import { useCollectionData } from "react-firebase-hooks/firestore";
import { Button } from "react-bootstrap";
import Product from "./Product";

function Dashboard() {
  const { logout } = useAuth();
  const [user, setUser] = useState();
  const query = database.products.orderBy("createdAt");
  const [products] = useCollectionData(query, { idField: "id" });

  const { currentUser } = useAuth();

  useEffect(() => {
    database.users
      .doc(currentUser.email)
      .get()
      .then((doc) => {
        setUser(doc.data());
      });
  }, []);

  return (
    <div>
      {user ? (
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
            <div className="Products">
              <h2>Products</h2>
              {products &&
                products.map((product) => <Product product={product} />)}
            </div>
          </main>
        </div>
      ) : (
        <Loading />
      )}
    </div>
  );
}

export default Dashboard;
