import React, { Component } from "react";
import Input from "./commons/input";
import Joi from "joi-browser";

class LoginForm extends Component {
  //   username = React.createRef();
  state = {
    account: {
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

    const account = { ...this.state.account };
    account[input.name] = input.value;
    this.setState({ account, errors });
  };
  handleSubmit = (e) => {
    e.preventDefault();
    const errors = this.validate();
    this.setState({ errors: errors || {} });
    if (errors) return;

    // Call the server
    // const username = this.username.current.value;
    // console.log(errors);
  };

  validate = () => {
    const options = { abortEarly: false };
    const { error } = Joi.validate(this.state.account, this.schema, options);
    if (!error) return null;
    const errors = {};

    //explain the code below, we can also use the map method or reduce
    for (let item of error.details) {
      errors[item.path[0]] = item.message;
    }
    return errors;

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
  };

  validateProperty = ({ name, value }) => {
    if (name === "username") {
      if (value.trim() === "") return "Username is required";
    }
    if (name === "password") {
      if (value.trim() === "") return "Password is required";
    }
  };

  render() {
    const { account, errors } = this.state;
    return (
      <React.Fragment>
        <h1>Login</h1>
        <form onSubmit={this.handleSubmit}>
          <Input
            name="username"
            label="Username"
            value={account.username}
            onChange={this.handleChange}
            error={errors.username}
          />
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
          <Input
            name="password"
            label="Password"
            value={account.password}
            onChange={this.handleChange}
            error={errors.password}
          />
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
          <button type="submit" className="btn btn-primary">
            Login
          </button>
        </form>
      </React.Fragment>
    );
  }
}
export default LoginForm;
