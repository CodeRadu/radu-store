import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../../contexts/AuthContext";
import { database } from "../../firebase";

function Admin() {
  const { logout } = useAuth();
  const [user, setUser] = useState();
  const [admin, setAdmin] = useState(false);
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
              <Link
                to="/admin"
                style={{ color: "black", textDecoration: "none" }}
              >
                Radu Store Admin
              </Link>
            </h2>
            <div className="links">
              <Link to="/">Dashboard</Link>
            </div>
            <button onClick={logout} className="btn btn-primary">
              Logout
            </button>
          </header>
        </div>
      ) : (
        "Loading"
      )}
    </div>
  );
}

export default Admin;
