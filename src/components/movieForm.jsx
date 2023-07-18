import React, { Component } from "react";
import Form from "./commons/form";
import { getMovies } from "../services/fakeMovieService";
import { getGenres } from "../services/fakeGenreService";
import Joi from "joi-browser";

class MovieForm extends Form {
  state = {
    data: {
      title: "",
      genre: "",
      numberInStock: "",
      rate: "",
    },
    movies: getMovies(),
    genres: getGenres(),
    errors: {},
  };

  schema = {
    title: Joi.string().required().label("Title"),
    genre: Joi.string().required().label("Genre"),
    numberInStock: Joi.number().integer().positive().label("Number in Stock"),
    rate: Joi.number().min(0).max(10).label("Rate"),
  };

  componentDidMount() {
    // const genres = [{ _id: "", name: "All Genres" }, ...getGenres()];
    // const movies = getMovies();
    // this.setState({ movies: getMovies(), genres });
  }

  handleSave = () => {
    // Navigate to /products
    this.props.history.replace("/movies");
  };

  render() {
    const id = this.props.match.params.id;
    const moviesAux = this.state.movies.filter((m) => m._id === id);
    const movie = moviesAux[0];    
    return (
      <div>
        <h1>Movie Form</h1>
        <form onSubmit={this.handleSave}>
          {this.renderInput("title", "Title")}
          {this.renderInput("genre", "Genre")}
          {this.renderInput("numberInStock", "Number In Stock", "number")}
          {this.renderInput("rate", "Rate", "number")}

        </form>
        {/* <h1>Movie Details - {movie.title} </h1> */}
        {/* <h1>Movie Details - {this.props.match.params.id} </h1> */}
        {this.renderButton("Save")}
        {/* <button onClick={this.handleSave} className="btn btn-primary">
          Save
        </button> */}
      </div>
    );
  }
}

export default MovieForm;
