import React, { useReducer } from "react";
import {
  FORMULARIO_PROYECTO,
  OBTENER_PROYECTOS,
  AGREGAR_PROYECTO,
  MENSAGE_ERROR,
  PROYECTO_ACTUAL,
  ELIMINAR_PROYECTO,
  PROYECTO_ERROR,
} from "../../types";
import proyectoContext from "./proyectoContext";
import proyectoReducer from "./proyectoReducer";
import clienteAxios from "../../config/axios";

const ProyectoState = (props) => {
  const initialState = {
    proyectos: [],
    formulario: false,
    mensageError: false,
    proyectoActual: null,
    mensaje: null,
  };

  //dispatch para ejecutar las acciones
  const [state, dispatch] = useReducer(proyectoReducer, initialState);

  //series de funciones para el CRUD
  const mostrarFormulario = () => {
    dispatch({
      type: FORMULARIO_PROYECTO,
    });
  };

  const obtenerProyecto = async () => {
    try {
      const resultado = await clienteAxios.get("api/proyectos");
      dispatch({
        type: OBTENER_PROYECTOS,
        payload: resultado.data,
      });
    } catch (error) {
      const alerta = {
        msg: "Hubo un error",
        categoria: "alerta-error",
      };
      dispatch({
        type: PROYECTO_ERROR,
        payload: alerta,
      });
    }
  };

  const agregarProyecto = async (proyecto) => {
    try {
      const resultado = await clienteAxios.post("/api/proyectos", proyecto);
      dispatch({
        type: AGREGAR_PROYECTO,
        payload: resultado.data,
      });
    } catch (error) {
      const alerta = {
        msg: "Hubo un error",
        categoria: "alerta-error",
      };
      dispatch({
        type: PROYECTO_ERROR,
        payload: alerta,
      });
    }
  };

  const mostrarError = () => {
    dispatch({
      type: MENSAGE_ERROR,
    });
  };

  const obtenerProyectoActual = (proyectoID) => {
    dispatch({
      type: PROYECTO_ACTUAL,
      payload: proyectoID,
    });
  };

  const eliminarProyecto = async (proyectoID) => {
    try {
      await clienteAxios.delete(`/api/proyectos/${proyectoID}`);
      dispatch({
        type: ELIMINAR_PROYECTO,
        payload: proyectoID,
      });
    } catch (error) {
      const alerta = {
        msg: "Hubo un error",
        categoria: "alerta-error",
      };
      dispatch({
        type: PROYECTO_ERROR,
        payload: alerta,
      });
    }
  };

  return (
    <proyectoContext.Provider
      value={{
        formulario: state.formulario,
        proyectos: state.proyectos,
        proyectoActual: state.proyectoActual,
        mensageError: state.mensageError,
        mensaje: state.mensaje,
        mostrarFormulario,
        obtenerProyecto,
        agregarProyecto,
        mostrarError,
        obtenerProyectoActual,
        eliminarProyecto,
      }}>
      {props.children}
    </proyectoContext.Provider>
  );
};

export default ProyectoState;
