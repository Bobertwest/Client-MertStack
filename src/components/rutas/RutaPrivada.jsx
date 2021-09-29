import React, { useContext, useEffect } from "react";
import { Redirect, Route } from "react-router";
import authContext from "../../context/autenticacion/authContext";

const RutaPrivada = ({ component: Component, ...props }) => {
  const AuthContext = useContext(authContext);
  const { autenticado, loading, usuarioAutenticado } = AuthContext;

  useEffect(() => {
    usuarioAutenticado();

    //eslint-disable-next-line
  }, []);
  return (
    <Route
      {...props}
      render={(props) =>
        !autenticado && !loading ? (
          <Redirect to="/" />
        ) : (
          <Component {...props} />
        )
      }
    />
  );
};

export default RutaPrivada;
