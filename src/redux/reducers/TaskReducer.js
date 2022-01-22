const InitialState = {
  tasks: [],
  fetchAllStatus: null,
  fetchAllError: null,
  addTaskStatus: null,
  addTaskError: null,
  updateTaskStatus: null,
  updateTaskError: null,
  removeTaskStatus: null,
  removeTaskError: null,
};

const TaskReducer = (state = InitialState, action) => {
  switch (action.type) {
    case 'FETCH_ALL':
      return {
        ...state,
        fetchAllStatus: null,
      }
    case 'FETCH_ALL_SUCCESS':
      return {
        ...state,
        tasks: action.payload.data,
        fetchAllStatus: true,
      }
    case 'FETCH_ALL_ERROR':
      return {
        ...state,
        fetchAllStatus: false,
        fetchAllError: action.payload.error,
      }
    case 'ADD_TASK':
      return {
        ...state,
        addTaskStatus: null,
      }
    case 'ADD_TASK_SUCCESS':
      return {
        ...state,
        addTaskStatus: true,
      }
    case 'ADD_TASK_ERROR':
      return {
        ...state,
        addTaskStatus: false,
        addTaskError: action.payload.error,
      }
    case 'UPDATE_TASK':
      return {
        ...state,
        updateTaskStatus: null,
      }
    case 'UPDATE_TASK_SUCCESS':
      return {
        ...state,
        updateTaskStatus: true,
      }
    case 'UPDATE_TASK_ERROR':
      return {
        ...state,
        updateTaskStatus: false,
        updateTaskError: action.payload.error,
      }
    case 'REMOVE_TASK':
      return {
        ...state,
        removeTaskStatus: null,
      }
    case 'REMOVE_TASK_SUCCESS':
      return {
        ...state,
        removeTaskStatus: true,
      }
    case 'REMOVE_TASK_ERROR':
      return {
        ...state,
        removeTaskStatus: false,
        removeTaskError: action.payload.error
      }
    default:
      return {
        ...state
      };
  }
};

export default TaskReducer;