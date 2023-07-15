import React, { Component } from "react";
import Form from "./commons/form";
import Joi from "joi-browser";

class LoginForm extends Form {
  //   username = React.createRef();
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

  //   componentDidMount() {
  //     this.username.current.focus();
  //   }

  handleChange = ({ currentTarget: input }) => {
    const errors = { ...this.state.errors };
    const errorMessage = this.validateProperty(input);
    if (errorMessage) errors[input.name] = errorMessage;
    else delete errors[input.name];

    const data = { ...this.state.data };
    data[input.name] = input.value;
    this.setState({ data, errors });
  };

  doSubmit = () => {
    // Call the server
    // const username = this.username.current.value;
    console.log("Submitted");
  };

  // console.log(result);

  // const errors = {};
  // const { account } = this.state;
  // if (account.username.trim() === "") {
  //   errors.username = "Username is required";
  // }
  // if (account.password.trim() === "") {
  //   errors.password = "Password is required";
  // }
  // return errors;
  // return { username: "Username is required" };

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
