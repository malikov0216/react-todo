import { FETCH_TASKS_SUCCESS, CREATE_TASK_SUCCESS, EDIT_TASK_STATUS_SUCCESS, EDIT_TASK_TEXT_SUCCESS } from "./actionTypes";
import { push } from "connected-react-router";
import axios from "../../axios-api";
import config from "../../config";
import { NotificationManager } from "react-notifications";

export const fetchTasksSuccess = taskData => {
  return { type: FETCH_TASKS_SUCCESS, taskData };
};

export const createTaskSuccess = () => {
  return { type: CREATE_TASK_SUCCESS };
};

export const editTaskStatusSuccess = (editType, id) => {
  return { type: EDIT_TASK_STATUS_SUCCESS, editType, id };
};

export const editTaskTextSuccess = id => {
  return { type: EDIT_TASK_TEXT_SUCCESS, id }
}

export const createTask = task => {
  return dispatch => {
    return axios.post(`https://uxcandy.com/~shapoval/test-task-backend/v2/create?${config.developerName}`, task).then(response => {
      dispatch(createTaskSuccess());
      dispatch(push("/"));
      NotificationManager.success("Задача успешно создана")
    });
  };
};

export const editTask = (taskData, id) => {
  return (dispatch, getState) => {
    const hasText = taskData.has('text')
    id = Number.parseInt(id)
    axios
        .post(`https://uxcandy.com/~shapoval/test-task-backend/v2/edit/${id}?${config.developerName}`, taskData)
        .then(response => {
          if (response.data.status === 'error' && response.data.message.token) {
            NotificationManager.error('Токен истёк')
          } else if (response.data.status === 'error' && response.data.message.id) {
            NotificationManager.error('ID задачи не валиден')
          } else {
            if (hasText) {
              dispatch(editTaskTextSuccess(id))
              dispatch(push(`/`));
              NotificationManager.success("Текст задачи успешно отредактирована")
            } else {
              dispatch(editTaskStatusSuccess());
              dispatch(push(`/`));
              NotificationManager.success("Статус задачи успешно отредактирована")
            }
          }
        })
  }
};

export const fetchTasks = (pageNumber, sortField = 'id', sortDirection= 'asc') => {
  return dispatch => {
    axios
      .get(
        `https://uxcandy.com/~shapoval/test-task-backend/v2/?${config.developerName}&sort_field=${sortField}&sort_direction=${sortDirection}&page=${pageNumber}`
      )
      .then(response => {
        let taskData = {
          tasks: response.data.message.tasks,
          pageNumber: Math.ceil(response.data.message.total_task_count / 3)
        }
        taskData.tasks.map(task => {
          if (task.status > 0) {
            task.status = true
            return task
          } else {
            task.status = false
            return task
          }
        })
        dispatch(fetchTasksSuccess(taskData));
      });
  };
};

