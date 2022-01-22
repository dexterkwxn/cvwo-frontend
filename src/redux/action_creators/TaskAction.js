const TaskAction = {
  fetchAll: () => {
    return {
      type: 'FETCH_ALL',
    }
  },
  fetchAllSuccess: (data) => {
    return {
      type: 'FETCH_ALL_SUCCESS',
      payload: {
        data
      }
    }
  },
  fetchAllError: (error) => {
    return {
      type: 'FETCH_ALL_ERROR',
      payload: {
        error
      }
    }
  },
  addTask: (data) => {
    return {
      type: 'ADD_TASK',
      payload: {
        data
      }
    }
  },
  addTaskSuccess: () => {
    return {
      type: 'ADD_TASK_SUCCESS',
    }
  },
  addTaskError: (error) => {
    return {
      type: 'ADD_TASK_ERROR',
      payload: {
        error
      }
    }
  },
  updateTask: (id, data) => {
    return {
      type: 'UPDATE_TASK',
      payload: {
        id,
        data
      }
    }
  },
  updateTaskSuccess: () => {
    return {
      type: 'UPDATE_TASK_SUCCESS',
    }
  },
  updateTaskError: (error) => {
    return {
      type: 'UPDATE_TASK_ERROR',
      payload: {
        error
      }
    }
  },
  removeTask: (id) => {
    return {
      type: 'REMOVE_TASK',
      payload: {
        id
      }
    }
  },
  removeTaskSuccess: () => {
    return {
      type: 'REMOVE_TASK_SUCCESS',
    }
  },
  removeTaskError: (error) => {
    return {
      type: 'REMOVE_TASK_ERROR',
      payload: {
        error
      }
    }
  },
}

export default TaskAction;