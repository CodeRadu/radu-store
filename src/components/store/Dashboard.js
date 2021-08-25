import React, { useEffect } from "react";
import "../../css/Dashboard.css";
import { Link } from "react-router-dom";
import { useState } from "react";
import { useAuth } from "../../contexts/AuthContext";
import { database } from "../../firebase";

function Dashboard() {
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
      ) : (
        "Loading"
      )}
    </div>
  );
}

export default Dashboard;
