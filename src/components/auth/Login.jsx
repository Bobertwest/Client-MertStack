import React, { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import alertaContext from "../../context/alerta/alertaContext";
import authContext from "../../context/autenticacion/authContext";

const Login = (props) => {
  const alertContext = useContext(alertaContext);
  const { alerta, mostrarAlerta } = alertContext;
  const authenticContext = useContext(authContext);
  const { iniciarSesion, autenticado, mensaje } = authenticContext;
  const [usuarioLogin, setUsuarioLogin] = useState({
    email: "",
    password: "",
  });
  const { email, password } = usuarioLogin;

  useEffect(() => {
    if (autenticado) {
      props.history.push("/proyectos");
    }
    if (mensaje) {
      mostrarAlerta(mensaje.msg, mensaje.categoria);
    }
    //eslint-disable-next-line
  }, [mensaje, props.history, autenticado]);

  //Agregar datos al state
  const handleChange = (e) => {
    setUsuarioLogin({
      ...usuarioLogin,
      [e.target.name]: e.target.value,
    });
  };

  //Enviar los datos
  const submitForm = (e) => {
    e.preventDefault();
    if (email.trim() === "" || password.trim() === "") {
      mostrarAlerta("Todos los campos son obligatorios", "alerta-error");
    }

    iniciarSesion({ email, password });
  };

  return (
    <div className="form-usuario">
      {alerta ? (
        <div className={`alerta ${alerta.categoria}`}>{alerta.msg}</div>
      ) : null}
      <div className="contenedor-form sombra-dark">
        <h1>Iniciar Sesión</h1>
        <form onSubmit={submitForm}>
          <div className="campo-form">
            <label htmlFor="email">Email</label>
            <input
              type="email"
              id="email"
              name="email"
              placeholder="Tu Email"
              value={email}
              onChange={handleChange}
              autoComplete="off"
            />
          </div>
          <div className="campo-form">
            <label htmlFor="password">Password</label>
            <input
              type="password"
              id="password"
              name="password"
              placeholder="Tu Password"
              value={password}
              onChange={handleChange}
              autoComplete="off"
            />
          </div>
          <div className="campo-form">
            <input
              type="submit"
              value="Iniciar Sesión"
              className="btn btn-primario btn-block"
            />
          </div>
        </form>
        <Link to="/nueva-cuenta" className="enlace-cuenta">
          Obtener Cuenta
        </Link>
      </div>
    </div>
  );
};

export default Login;
