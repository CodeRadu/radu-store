import React, { useState, useEffect } from "react";
import { Redirect, Route } from "react-router-dom";
import { useAuth } from "../../contexts/AuthContext";
import { database } from "../../firebase";
import Loading from "../Loading";

function GuestRoute({ component: Component, ...rest }) {
  const { currentUser } = useAuth();
  const [loading, setLoading] = useState(true);
  const [admin, setAdmin] = useState();

  useEffect(() => {
    if (currentUser) {
      database.users
        .doc(currentUser.email)
        .get()
        .then((doc) => {
          const user = doc.data();
          setAdmin(user.admin);
          setLoading(false);
        });
    } else {
      setLoading(false);
    }
  }, []);

  return (
    <div>
      {!loading ? (
        <Route
          {...rest}
          render={(props) => {
            return admin && currentUser ? (
              <Component {...props} />
            ) : (
              <Redirect to="/" />
            );
          }}
        />
      ) : (
        <Loading />
      )}
    </div>
  );
}

export default GuestRoute;
