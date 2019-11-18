import { FETCH_TASKS_SUCCESS, EDIT_TASK_TEXT_SUCCESS } from "../actions/actionTypes";

const initialState = {
    taskData: {},
    editedTasks: []
};

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case FETCH_TASKS_SUCCESS:
            return { ...state, taskData: action.taskData };
        case EDIT_TASK_TEXT_SUCCESS:
            const editedTasks = state.editedTasks;
            editedTasks.push(action.id);
            return { ...state, editedTasks};
        default:
            return state
    }
};

export default reducer