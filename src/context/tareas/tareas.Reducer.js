import {
  ACTUALIZAR_TAREA,
  AGREGAR_TAREA,
  ELIMINAR_TAREA,
  LIMPIAR_TAREA,
  MENSAGE_TAREA,
  OBTENER_TAREAS,
  TAREA_ACTUAL,
} from "../../types";

export default function tareaReducer(state, action) {
  switch (action.type) {
    case OBTENER_TAREAS:
      return {
        ...state,
        tareasProyectos: action.payload,
      };
    case AGREGAR_TAREA:
      return {
        ...state,
        tareasProyectos: [action.payload, ...state.tareasProyectos],
        mensajeError: false,
      };
    case MENSAGE_TAREA:
      return {
        ...state,
        mensajeError: true,
      };
    case ELIMINAR_TAREA:
      return {
        ...state,
        tareasProyectos: state.tareasProyectos.filter(
          (tarea) => tarea._id !== action.payload
        ),
      };
    case ACTUALIZAR_TAREA:
      return {
        ...state,
        tareasProyectos: state.tareasProyectos.map((tarea) =>
          tarea._id === action.payload._id ? action.payload : tarea
        ),
      };
    case TAREA_ACTUAL:
      return {
        ...state,
        tareaActual: action.payload,
      };
    case LIMPIAR_TAREA:
      return {
        ...state,
        tareaActual: null,
      };
    default:
      break;
  }
}
