import React, { useReducer } from "react";
import clienteAxios from "../../config/axios";
import {
  OBTENER_TAREAS,
  AGREGAR_TAREA,
  MENSAGE_TAREA,
  ELIMINAR_TAREA,
  TAREA_ACTUAL,
  ACTUALIZAR_TAREA,
  LIMPIAR_TAREA,
} from "../../types";
import tareaReducer from "./tareas.Reducer";
import TareasContext from "./tareasContext";

const TareasState = (props) => {
  const initialState = {
    tareasProyectos: [],
    mensajeError: false,
    tareaActual: null,
  };

  const [state, dispatch] = useReducer(tareaReducer, initialState);

  const obtenerTareas = async (proyecto) => {
    try {
      const resultado = await clienteAxios.get("/api/tareas", {
        params: { proyecto },
      });
      dispatch({
        type: OBTENER_TAREAS,
        payload: resultado.data.tareas,
      });
    } catch (error) {
      console.log(error);
    }
  };

  const agregarTarea = async (tarea) => {
    try {
      const resultado = await clienteAxios.post("/api/tareas", tarea);
      dispatch({
        type: AGREGAR_TAREA,
        payload: resultado.data.tarea,
      });
    } catch (error) {
      console.log(error);
    }
  };

  const mensajeTarea = () => {
    dispatch({
      type: MENSAGE_TAREA,
    });
  };

  const eliminarTarea = async (id, proyecto) => {
    try {
      await clienteAxios.delete(`/api/tareas/${id}`, { params: { proyecto } });
      dispatch({
        type: ELIMINAR_TAREA,
        payload: id,
      });
    } catch (error) {
      console.log(error);
    }
  };

  const guardarTareaActual = (tarea) => {
    dispatch({
      type: TAREA_ACTUAL,
      payload: tarea,
    });
  };

  const actualizarTarea = async (tarea) => {
    try {
      const resultado = await clienteAxios.put(
        `/api/tareas/${tarea._id}`,
        tarea
      );
      dispatch({
        type: ACTUALIZAR_TAREA,
        payload: resultado.data.tarea,
      });
    } catch (error) {
      console.log(error);
    }
  };
  const limpiarTarea = () => {
    dispatch({
      type: LIMPIAR_TAREA,
    });
  };

  return (
    <TareasContext.Provider
      value={{
        tareasProyectos: state.tareasProyectos,
        tareaActual: state.tareaActual,
        mensajeError: state.mensajeError,
        obtenerTareas,
        agregarTarea,
        mensajeTarea,
        eliminarTarea,
        guardarTareaActual,
        actualizarTarea,
        limpiarTarea,
      }}>
      {props.children}
    </TareasContext.Provider>
  );
};

export default TareasState;
