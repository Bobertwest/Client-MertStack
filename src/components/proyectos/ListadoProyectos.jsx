import React, { useContext, useEffect } from "react";
import { CSSTransition, TransitionGroup } from "react-transition-group";
import alertaContext from "../../context/alerta/alertaContext";
import proyectoContext from "../../context/proyectos/proyectoContext";
import Proyecto from "./Proyecto";

const ListadoProyectos = () => {
  //Llegada de los proyectos del context
  const proyectosLista = useContext(proyectoContext);
  const { proyectos, mensaje, obtenerProyecto } = proyectosLista;

  const AlertaContext = useContext(alertaContext);
  const { alerta, mostrarAlerta } = AlertaContext;

  useEffect(() => {
    if (mensaje) {
      mostrarAlerta(mensaje.msg, mensaje.categoria);
    }

    obtenerProyecto();
    //eslint-disable-next-line
  }, [mensaje]);
  //Verificar si el state esta vacio
  if (proyectos.length === 0)
    return <p>No hay proyectos, comienza creando uno</p>;
  return (
    <ul className="listado-proyectos">
      {alerta ? (
        <div className={`alerta ${alerta.categoria}`}>{alerta.msg}</div>
      ) : null}
      <TransitionGroup>
        {proyectos.map((proyecto) => (
          <CSSTransition key={proyecto._id} timeout={200} classNames="proyecto">
            <Proyecto proyecto={proyecto} />
          </CSSTransition>
        ))}
      </TransitionGroup>
    </ul>
  );
};

export default ListadoProyectos;
