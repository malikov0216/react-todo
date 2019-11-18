import React, { Component, Fragment } from "react";
import { Alert, Button, Col, Form, FormGroup } from "reactstrap";
import { connect } from "react-redux";
import { loginUser } from "../../store/actions/usersActions";
import FormElement from "../../components/UI/FormElement/FormElement";

class Login extends Component {
  state = {
    username: "",
    password: ""
  };
  inputChangeHandler = e => {
    this.setState({
      [e.target.name]: e.target.value
    });
  };
  onSubmitHandler = e => {
    e.preventDefault();
    const formData = new FormData()
    for (let key in this.state) {
      formData.append(key, this.state[key])
    }
    this.props.loginUser(formData);
  };

  render() {
    return (
      <Fragment>
        <h2>Авторизация</h2>
        {this.props.error ? (
          <Alert color="danger">{this.props.error.message}</Alert>
        ) : null}
        <Form onSubmit={this.onSubmitHandler}>
          <FormElement
              required
            title="Имя пользователя"
            name="username"
            value={this.state.username}
            placeholder="Введите имя пользователя"
            type="text"
            onChange={this.inputChangeHandler}
          />
          <FormElement
              required
            title="Пароль"
            name="password"
            value={this.state.password}
            placeholder="Введите пароль"
            type="password"
            onChange={this.inputChangeHandler}
          />
          <FormGroup row>
            <Col sm={{ offset: 2, size: 10 }}>
              <Button type="submit" color="primary">
                Войти
              </Button>
            </Col>
          </FormGroup>
        </Form>
      </Fragment>
    );
  }
}

const mapStateToProps = state => {
  return {
    error: state.users.loginError
  };
};
const mapDispatchToProps = dispatch => {
  return {
    loginUser: userData => dispatch(loginUser(userData))
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Login);
