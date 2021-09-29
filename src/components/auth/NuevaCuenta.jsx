import React, { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import alertaContext from "../../context/alerta/alertaContext";
import authContext from "../../context/autenticacion/authContext";

const NuevaCuenta = (props) => {
  const alertContext = useContext(alertaContext);
  const { alerta, mostrarAlerta } = alertContext;
  const authenticContext = useContext(authContext);
  const { registrarUsuario, autenticado, mensaje } = authenticContext;
  const [usuarioLogin, setUsuarioLogin] = useState({
    nombre: "",
    email: "",
    password: "",
    confirmar: "",
  });

  const { nombre, email, password, confirmar } = usuarioLogin;

  useEffect(() => {
    if (autenticado) {
      props.history.push("/proyectos");
    }
    if (mensaje) {
      mostrarAlerta(mensaje.msg, mensaje.categoria);
    }
    //eslint-disable-next-line
  }, [autenticado, mensaje, props.history]);

  //Agregar los datos al state
  const handleChange = (e) => {
    setUsuarioLogin({
      ...usuarioLogin,
      [e.target.name]: e.target.value,
    });
  };

  //Enviar los datos
  const submitForm = (e) => {
    e.preventDefault();
    if (
      nombre.trim() === "" ||
      email.trim() === "" ||
      password.trim() === "" ||
      confirmar.trim() === ""
    ) {
      mostrarAlerta("Todos los campos son obligatorios", "alerta-error");
      return;
    }

    //Comprobar si el password esta vacio
    if (password.length < 6) {
      mostrarAlerta(
        "El password tiene que ser al menos de 6 caracteres",
        "alerta-error"
      );
      return;
    }

    //Los password tienes que ser iguales
    if (password !== confirmar) {
      mostrarAlerta("Los passwords no son iguales", "alerta-error");
      return;
    }
    registrarUsuario({
      nombre,
      email,
      password,
    });
  };

  return (
    <div className="form-usuario">
      {alerta ? (
        <div className={`alerta ${alerta.categoria}`}>{alerta.msg}</div>
      ) : null}
      <div className="contenedor-form sombra-dark">
        <h1>Obtener Cuenta</h1>
        <form onSubmit={submitForm}>
          <div className="campo-form">
            <label htmlFor="email">Nombre</label>
            <input
              type="text"
              id="nombre"
              name="nombre"
              placeholder="Tu Nombre"
              value={nombre}
              onChange={handleChange}
              autoComplete="off"
            />
          </div>
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
            <label htmlFor="password">Confirmar Password</label>
            <input
              type="password"
              id="confirmar"
              name="confirmar"
              placeholder="Tu Password Nuevamente"
              value={confirmar}
              onChange={handleChange}
              autoComplete="off"
            />
          </div>
          <div className="campo-form">
            <input
              type="submit"
              value="Crear Cuenta"
              className="btn btn-primario btn-block"
            />
          </div>
        </form>
        <Link to="/" className="enlace-cuenta">
          Iniciar Sesión
        </Link>
      </div>
    </div>
  );
};

export default NuevaCuenta;
