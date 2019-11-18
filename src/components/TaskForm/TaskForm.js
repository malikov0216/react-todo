import React, { Component } from "react";
import { Button, Col, Form, FormGroup } from "reactstrap";
import FormElement from "../UI/FormElement/FormElement";

class TaskForm extends Component {
  state = {
    username: "",
    email: "",
    text: "",
    photo: ""
  };

  inputChangeHandler = e => {
    this.setState({ [e.target.name]: e.target.value });
  };

  submitFormHandler = e => {
    e.preventDefault();
    const formData = new FormData();

    for (let key in this.state) {
      formData.append(key, this.state[key]);
    }

    this.props.submitForm(formData);
  };

  render() {
    return (
      <Form className='mt-4' onSubmit={this.submitFormHandler}>
        <FormElement
          title="Имя пользователя"
          type="text"
          required
          name="username"
          value={this.state.username}
          placeholder="Введите имя пользователя"
          onChange={this.inputChangeHandler}
        />

        <FormElement
          title="Email"
          type="email"
          required
          placeholder="Введите почту"
          value={this.state.email}
          name="email"
          onChange={this.inputChangeHandler}
        />

        <FormElement
          title="Текст"
          type="text"
          name="text"
          required
          value={this.state.text}
          placeholder="Введите текст задачи"
          onChange={this.inputChangeHandler}
        />

        <FormGroup row>
          <Col sm={{ offset: 2, size: 10 }}>
            <Button type="submit" color="primary">
              Сохранить
            </Button>
          </Col>
        </FormGroup>
      </Form>
    );
  }
}

export default TaskForm;
