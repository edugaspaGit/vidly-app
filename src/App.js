import React, { Component } from "react";
import Navbar from "./components/navbar";
import Movies from "./components/movies";
import Customers from "./components/customers";
import Rentals from "./components/rentals";
import MovieForm from "./components/movieForm";
import ProtectedRoute from "./components/commons/protectedRoute";
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
    } catch (ex) {
    }
  }
  render() {
    const { user } = this.state;
    return (
      <React.Fragment>
        <ToastContainer />
        <Navbar user={user} />
        <main className="container">
          <Switch>
            <ProtectedRoute path="/movies/:id" component={MovieForm} />
            {/* <Route path="/movies" component={Movies} /> */}
            {/* <Route path="/movies/new" component={MovieForm} /> */}
            {/* <Route path="/movies/:id"
              render={props => {
                if (user) return <MovieForm {...props} />;
                return <Redirect to="/login" />;
              }} /> */}
            <Route path="/movies"
              render={props => <Movies {...props} user={user} />} />
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
