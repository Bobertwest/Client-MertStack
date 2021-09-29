import React, { Fragment, useContext, useState } from "react";
import proyectoContext from "../../context/proyectos/proyectoContext";

const NuevoProyecto = () => {
  //Obtener el state del formulario
  const proyectosContext = useContext(proyectoContext);
  const {
    formulario,
    mostrarFormulario,
    agregarProyecto,
    mostrarError,
    mensageError,
  } = proyectosContext;

  const [proyecto, setProyecto] = useState({
    nombre: "",
  });

  //Estraer valor del state del proyecto
  const { nombre } = proyecto;

  const hanleChange = (e) => {
    setProyecto({
      ...proyecto,
      [e.target.name]: e.target.value,
    });
  };

  const submitform = (e) => {
    e.preventDefault();
    if (nombre === "") {
      mostrarError();
      return;
    }
    agregarProyecto(proyecto);
    setProyecto({
      nombre: "",
    });
  };

  return (
    <Fragment>
      <button
        type="button"
        className="btn btn-block btn-primario"
        onClick={() => mostrarFormulario()}>
        Nuevo Proyecto
      </button>
      {formulario && (
        <form className="formulario-nuevo-proyecto" onSubmit={submitform}>
          <input
            type="text"
            value={nombre}
            className="input-text"
            name="nombre"
            placeholder="Nombre Proyecto"
            onChange={hanleChange}
            autoComplete="off"
          />
          <input
            type="submit"
            value="Agregar Proyecto"
            className="btn btn-primario btn-block"
          />
        </form>
      )}
      {mensageError && (
        <p className="mensaje error">El nombre del proyecto es obligatorio</p>
      )}
    </Fragment>
  );
};

export default NuevoProyecto;
