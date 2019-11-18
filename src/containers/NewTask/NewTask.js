import React, { Component, Fragment } from "react";
import TaskForm from "../../components/TaskForm/TaskForm";
import { createTask } from "../../store/actions/actions";
import { connect } from "react-redux";

class NewTask extends Component {
  render() {
    return (
      <Fragment>
        <h1>Создать новую задачу</h1>
        <TaskForm submitForm={this.props.onTaskCreated} />
      </Fragment>
    );
  }
}

const mapStateToProps = state => {
  return {
  };
};

const mapDispatchToProps = dispatch => {
  return {
    onTaskCreated: task => dispatch(createTask(task))
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(NewTask);
