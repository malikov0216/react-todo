import React, { Component } from 'react';
import {Button, Form, FormGroup, Label, Input} from 'reactstrap'
import { editTask, fetchTasks } from "../../store/actions/actions";
import { connect } from "react-redux";

class EditTask extends Component {
		state = {
				taskValue: ''
		};
		componentDidMount() {
				if (!(this.props.taskData && this.props.taskData.tasks)) {
						this.props.onFetchTasks()
				} else {
						this.getTaskTextValue()
				}
		}

		componentDidUpdate(prevProps, prevState, snapshot) {
				if(prevProps.taskData !== this.props.taskData) {
						this.getTaskTextValue()
				}
		}

		changeTaskTextHandler = e => {
				this.setState({[e.target.name]: e.target.value})
		};

		getTaskTextValue = () => {
				const tasks = this.props.taskData.tasks;
				const id = Number.parseInt(this.props.match.params.id)
				let taskItem = tasks.find(item => item.id === id)
				this.setState({taskValue: taskItem.text})
		};

		onSubmitHandler = e => {
				e.preventDefault();
				const formData = new FormData();
				formData.append('token', this.props.user.token);
				formData.append('text', this.state.taskValue);
				this.props.onEditTask(formData, this.props.match.params.id)
		};

		render() {
				return (
						<Form onSubmit={this.onSubmitHandler}>
								<h1>Редактировать задачу</h1>
								<FormGroup>
										<Label for="exampleText">Текст задачи</Label>
										<Input name='taskValue' type="textarea" id="exampleText" onChange={this.changeTaskTextHandler} value={this.state.taskValue}/>
								</FormGroup>
								<Button type='submit'>Сохранить изменение</Button>
						</Form>
				);
		}
}

const mapStateToProps = state => {
		return {
				user: state.users.user,
				taskData: state.taskData.taskData,
		};
};

const mapDispatchToProps = dispatch => {
		return {
				onEditTask: (taskData, id) => dispatch(editTask(taskData, id)),
				onFetchTasks: (pageNumber, sortField, sortDirection) => dispatch(fetchTasks(pageNumber, sortField, sortDirection))
		};
};


export default connect(mapStateToProps, mapDispatchToProps)(EditTask);