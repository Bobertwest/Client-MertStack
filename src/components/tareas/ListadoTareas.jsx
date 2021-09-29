import React, { Fragment, useContext } from "react";
import { CSSTransition, TransitionGroup } from "react-transition-group";
import proyectoContext from "../../context/proyectos/proyectoContext";
import TareasContext from "../../context/tareas/tareasContext";
import Tarea from "./Tarea";

const ListadoTareas = () => {
  //Lllegada de las tareas del context
  const actualProyecto = useContext(proyectoContext);
  const { proyectoActual, eliminarProyecto } = actualProyecto;
  const tareasDeProyecto = useContext(TareasContext);
  const { tareasProyectos } = tareasDeProyecto;

  if (!proyectoActual) return <h1>Selecciona un Proyecto</h1>;
  const [proyecto] = proyectoActual;

  return (
    <Fragment>
      <h2>Proyecto: {proyecto.nombre}</h2>
      <ul className="listado-tareas">
        {tareasProyectos.length === 0 ? (
          <li className="tarea">
            <p>No hay tareas</p>
          </li>
        ) : (
          <TransitionGroup>
            {tareasProyectos.map((tarea) => (
              <CSSTransition key={tarea._id} timeout={200} classNames="tarea">
                <Tarea tarea={tarea} />
              </CSSTransition>
            ))}
          </TransitionGroup>
        )}
      </ul>
      <button
        type="button"
        className="btn btn-eliminar"
        onClick={() => eliminarProyecto(proyecto._id)}>
        Eliminar Proyecto &times;
      </button>
    </Fragment>
  );
};

export default ListadoTareas;
