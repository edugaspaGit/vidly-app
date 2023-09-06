import React, { Component } from "react";
import Navbar from "./components/navbar";
import Movies from "./components/movies";
import Customers from "./components/customers";
import Rentals from "./components/rentals";
import MovieForm from "./components/movieForm";
import LoginForm from "./components/loginForm";
import RegisterForm from "./components/registerForm";
import auth from "./services/authService";
import Logout from "./components/logout";
import NotFound from "./components/notFound";
import { Route, Switch, Redirect } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import "./App.css";

class App extends Component {
  state = {};
  componentDidMount() {
    try {
      const user = auth.getCurrentUser();
      this.setState({ user });
      // console.log(user);
    } catch (ex) {
    }
  }
  render() {
    return (
      <React.Fragment>
        <ToastContainer />
        <Navbar user={this.state.user} />
        <main className="container">
          <Switch>
            {/* <Route path="/movies/new" component={MovieForm} /> */}
            <Route path="/movies/:id" component={MovieForm} />
            <Route path="/movies"
              render={props => <Movies {...props} user={this.state.user} />} />
            {/* <Route path="/movies" component={Movies} /> */}
            <Route path="/customers" component={Customers} />
            <Route path="/rentals" component={Rentals} />
            <Route path="/login" component={LoginForm} />
            <Route path="/register" component={RegisterForm} />
            <Route path="/logout" component={Logout} />
            <Route path="/not-found" component={NotFound} />
            <Redirect from="/" exact to="/movies" />
            <Redirect to="/not-found" />
          </Switch>
        </main>
      </React.Fragment >
      // {/* // <main className="container">
      // //   <h1>Hola Simón!</h1>
      // // </main> */}
    );
  }
}
export default App;
