import React, { useContext, useEffect, useState } from "react";
import proyectoContext from "../../context/proyectos/proyectoContext";
import TareasContext from "../../context/tareas/tareasContext";

const FormTareas = () => {
  const proyectosContext = useContext(proyectoContext);
  const { proyectoActual } = proyectosContext;
  const tareasContext = useContext(TareasContext);
  const {
    agregarTarea,
    mensajeTarea,
    mensajeError,
    obtenerTareas,
    tareaActual,
    actualizarTarea,
    limpiarTarea,
  } = tareasContext;
  const [nuevaTarea, setNuevaTarea] = useState({
    nombre: "",
  });

  useEffect(() => {
    if (tareaActual !== null) {
      setNuevaTarea(tareaActual);
    } else {
      setNuevaTarea({
        nombre: "",
      });
    }
  }, [tareaActual]);
  const { nombre } = nuevaTarea;

  if (!proyectoActual) return null;

  const [proyecto] = proyectoActual;

  const handleChange = (e) => {
    setNuevaTarea({
      ...nuevaTarea,
      [e.target.name]: e.target.value,
    });
  };

  const subirTarea = (e) => {
    e.preventDefault();

    //Validar form
    if (nombre.trim() === "") {
      mensajeTarea();
      return;
    }

    //Pasar validacion
    if (tareaActual === null) {
      nuevaTarea.proyecto = proyecto._id;
      agregarTarea(nuevaTarea);
    } else {
      actualizarTarea(nuevaTarea);
      limpiarTarea();
    }

    //Reiniciar State
    obtenerTareas(proyecto.id);
    setNuevaTarea({
      nombre: "",
    });
  };

  return (
    <div className="formulario">
      <form onSubmit={subirTarea}>
        <div className="contenedor-input">
          <input
            type="text"
            name="nombre"
            placeholder="Nombre Tarea..."
            className="input-text"
            onChange={handleChange}
            value={nombre}
            autoComplete="off"
          />
        </div>
        <div className="contenedor-input">
          <input
            type="submit"
            value={tareaActual ? "Editar Tarea" : "Agregar Tarea"}
            className="btn btn-primario btn-submit btn-block"
          />
        </div>
      </form>
      {mensajeError && (
        <p className="mensaje error">Nombre de tarea obligatorio</p>
      )}
    </div>
  );
};

export default FormTareas;
