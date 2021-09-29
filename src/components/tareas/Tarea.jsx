import React, { useContext } from "react";
import proyectoContext from "../../context/proyectos/proyectoContext";
import TareasContext from "../../context/tareas/tareasContext";

const Tarea = ({ tarea }) => {
  const proyectosContext = useContext(proyectoContext);
  const {
    proyectoActual: [proyecto],
  } = proyectosContext;
  const tareasContext = useContext(TareasContext);
  const { obtenerTareas, eliminarTarea, actualizarTarea, guardarTareaActual } =
    tareasContext;

  const eliminar = () => {
    eliminarTarea(tarea._id, proyecto._id);
    obtenerTareas(proyecto._id);
  };

  const cambiarEstado = (tarea) => {
    if (tarea.estado) {
      tarea.estado = false;
    } else {
      tarea.estado = true;
    }
    actualizarTarea(tarea);
  };

  const seleccionarTarea = (tarea) => {
    guardarTareaActual(tarea);
  };

  return (
    <li className="tarea sombre">
      <p>{tarea.nombre}</p>
      <div className="estado">
        {tarea.estado ? (
          <button
            type="button"
            className="completo"
            onClick={() => cambiarEstado(tarea)}>
            Completo
          </button>
        ) : (
          <button
            type="button"
            className="incompleto"
            onClick={() => cambiarEstado(tarea)}>
            Incompleto
          </button>
        )}
      </div>
      <div className="acciones">
        <button
          type="button"
          className="btn btn-secundario"
          onClick={() => seleccionarTarea(tarea)}>
          Editar
        </button>
        <button type="button" className="btn btn-primario" onClick={eliminar}>
          Eliminar
        </button>
      </div>
    </li>
  );
};

export default Tarea;
