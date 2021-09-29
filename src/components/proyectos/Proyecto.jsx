import React, { useContext } from "react";
import proyectoContext from "../../context/proyectos/proyectoContext";
import TareasContext from "../../context/tareas/tareasContext";

const Proyecto = ({ proyecto }) => {
  const actualProyecto = useContext(proyectoContext);
  const { obtenerProyectoActual } = actualProyecto;
  const tareas = useContext(TareasContext);
  const { obtenerTareas } = tareas;

  const verDetallesDeProyecto = () => {
    obtenerProyectoActual(proyecto._id);
    obtenerTareas(proyecto._id);
  };
  return (
    <li>
      <button
        type="button"
        className="btn btn-blank"
        onClick={verDetallesDeProyecto}>
        {proyecto.nombre}
      </button>
    </li>
  );
};

export default Proyecto;
