import React from "react";
import Form from "./commons/form";
import Joi from "joi-browser";
import { login } from "../services/authService";

class LoginForm extends Form {
  state = {
    data: {
      username: "",
      password: "",
    },
    errors: {},
  };

  schema = {
    username: Joi.string().required().label("Username"),
    password: Joi.string().required().label("Password"),
  };

  handleChange = ({ currentTarget: input }) => {
    const errors = { ...this.state.errors };
    const errorMessage = this.validateProperty(input);
    if (errorMessage) errors[input.name] = errorMessage;
    else delete errors[input.name];

    const data = { ...this.state.data };
    data[input.name] = input.value;
    this.setState({ data, errors });
  };

  doSubmit = async () => {
    // Call the server
    // Call the server
    try {
      const { data } = this.state;
      const { data: jwt } = await login(
        data.username,
        this.state.data.password
      );
      localStorage.setItem("token", jwt);
      return this.props.history.push("/movies");
    } catch (ex) {
      const errors = { ...this.state.errors };
      errors.username = ex.response.data;
      this.setState({ errors });
    }
  };

  render() {
    // const { data, errors } = this.state;
    return (
      <React.Fragment>
        <h1>Login</h1>
        <form onSubmit={this.handleSubmit}>
          {this.renderInput("username", "Username")}
          {/* <div className="form-group">
            <label htmlFor="username">Username</label>
            <input
              //autoFocus
              onChange={this.handleChange}
              id="username"
              name="username"
              value={account.username}
              type="email"
              className="form-control"
              aria-describedby="emailHelp"
              placeholder="Enter email"
            />
          </div> */}
          {this.renderInput("password", "Password", "password")}
          {/* <Input
            name="password"
            label="Password"
            value={data.password}
            onChange={this.handleChange}
            error={errors.password}
          /> */}
          {/* <div className="form-group">
            <label htmlFor="password">Password</label>
            <input
              onChange={this.handleChange}
              id="password"
              name="password"
              value={account.password}
              type="password"
              className="form-control"
              placeholder="Password"
            />
          </div> */}
          {this.renderButton("Login")}
        </form>
      </React.Fragment>
    );
  }
}
export default LoginForm;
