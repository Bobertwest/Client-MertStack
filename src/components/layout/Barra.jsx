import React, { useContext, useEffect } from "react";
import authContext from "../../context/autenticacion/authContext";

const Barra = () => {
  const AuthContext = useContext(authContext);
  const { usuario, usuarioAutenticado, loading, cerrarSesion } = AuthContext;

  useEffect(() => {
    usuarioAutenticado();

    //eslint-disable-next-line
  }, []);

  return (
    <header className="app-header">
      {loading ? (
        <p className="nombre-usuario">Cargando...</p>
      ) : (
        <>
          <p className="nombre-usuario">
            Hola <span>{usuario ? usuario.nombre : null}</span>
          </p>
          <nav className="nav-principal">
            <button className="btn btn-blank" onClick={cerrarSesion}>
              Cerrar Sesión
            </button>
          </nav>
        </>
      )}
    </header>
  );
};

export default Barra;
