import React, { Component, Fragment } from "react";
import { Button, Row, ListGroup, Spinner } from "reactstrap";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { fetchTasks, editTask } from "../../store/actions/actions";
import TaskItem from "../../components/TaskItem/TaskItem";
import PaginationTool from "../../components/PaginationTool/PaginationTool";
import TaskSort from "../../components/TaskSort/TaskSort";
import {NotificationManager} from "react-notifications";

class Tasks extends Component {
  state = {
    pageNumber: 1,
    isSortBtnOpen: false,
    sortField: 'id',
    sortDirection: 'asc'
  };

  componentDidMount() {
    this.props.onFetchTasks(this.state.pageNumber);
  }

  componentDidUpdate(prevProps, prevState) {
      const { pageNumber, sortField, sortDirection } = this.state;
      if (prevState.pageNumber !== this.state.pageNumber) {
          this.props.onFetchTasks(pageNumber);
      }
      if (prevState.sortField !== sortField || prevState.sortDirection !== sortDirection) {
          this.props.onFetchTasks(pageNumber, sortField, sortDirection)
      }
      if (this.props.routerLocation.pathname === prevProps.routerLocation.pathname && this.props.routerLocation.key !== prevProps.routerLocation.key) {
          this.props.onFetchTasks(pageNumber, sortField, sortDirection)
      }
  };

    pageChangeHandler = pageNumber =>  {
        this.setState({pageNumber})
    };

  openToggleSort = () => {
      this.setState({ isSortBtnOpen: !this.state.isSortBtnOpen})
  };

  changeSort = (e) => {
      if (e.target.name) {
          this.setState({ [e.target.name]: e.target.value})
      }
  };

  editTaskStatusHandler = e => {
      const formData = new FormData();
      if (this.props.user && this.props.user.token ) {
          formData.append('token', this.props.user.token);
          if (e.target.checked) {
              formData.append('status', '10')
          } else {
              formData.append('status', '0')
          }
          this.props.onEditTask(formData, e.target.id)
      } else {
          NotificationManager.error('Токен истёк')
      }
  };


  render() {
    let { tasks, pageNumber } = this.props.taskData;
    let { user, editedTasks } = this.props;
    return (
      <Fragment>

        <div className="d-flex justify-content-between align-items-center">
          <h1>Задачи</h1>
            <Button tag={Link} to="/tasks/new" color="primary">
                Добавить задачу
            </Button>
        </div>

        <TaskSort
            isSortBtnOpen={this.state.isSortBtnOpen}
            openToggleSort={this.openToggleSort}
            changeSort={this.changeSort}
        />

        <ListGroup>
          {tasks ? tasks.map(task => {
              let isEdited = editedTasks.includes(task.id);
            return (
              <TaskItem
                  editTaskStatusHandler={this.editTaskStatusHandler}
                isEdited={isEdited}
                id={task.id}
                key={task.id}
                text={task.text}
                username={task.username}
                email={task.email}
                status={task.status}
                isAllowed={user && user.name === 'admin'}
              />
            );
          }): <Spinner style={{ width: '3rem', height: '3rem', margin: '20px 0' }} />}
        </ListGroup>
        <Row>
            <PaginationTool pageNumber={pageNumber} onPageChangeHandler={this.pageChangeHandler}/>
        </Row>
      </Fragment>
    );
  }
}

const mapStateToProps = state => {
  return {
    taskData: state.taskData.taskData,
    user: state.users.user,
      editedTasks: state.taskData.editedTasks,
      routerLocation: state.router.location
  };
};

const mapDispatchToProps = dispatch => {
  return {
    onFetchTasks: (pageNumber, sortField, sortDirection) => dispatch(fetchTasks(pageNumber, sortField, sortDirection)),
    onEditTask: (taskData, id) => dispatch(editTask(taskData, id))
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Tasks);
