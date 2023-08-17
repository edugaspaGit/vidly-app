import React, { Component } from "react";
import Form from "./commons/form";
import { getMovie, saveMovie } from "../services/movieService";
// import { getMovie, saveMovie } from "../services/fakeMovieService";
import { getGenres } from "../services/genreService";
// import { getGenres } from "../services/fakeGenreService";
import Joi from "joi-browser";

class MovieForm extends Form {
  state = {
    data: {
      title: "",
      genreId: "",
      numberInStock: "",
      dailyRentalRate: "",
    },
    genres: [],
    errors: {},
  };

  schema = {
    _id: Joi.string(),
    title: Joi.string().required().label("Title"),
    genreId: Joi.string().required().label("Genre"),
    numberInStock: Joi.number()
      .integer()
      .positive()
      .max(100)
      .label("Number in Stock"),
    dailyRentalRate: Joi.number().min(0).max(10).label("Rate"),
  };

  async populateGenres() {
    const { data: genres } = await getGenres();
    // const genres = await getGenres();
    this.setState({ genres });
  }

  async populateMovies() {
    try {
      const movieId = this.props.match.params.id;
      if (movieId === "new") return;

      const { data: movie } = await getMovie(movieId);
      this.setState({ data: this.mapToViewModel(movie) });
    } catch (ex) {
      if (ex.response && ex.response.status === 404)
        return this.props.history.replace("/not-found");
    }
  }

  async componentDidMount() {
    // console.log("shit happens");
    await this.populateGenres();
    await this.populateMovies();
  }

  mapToViewModel(movie) {
    return {
      _id: movie._id,
      title: movie.title,
      genreId: movie.genre._id,
      numberInStock: movie.numberInStock,
      dailyRentalRate: movie.dailyRentalRate,
    };
  }

  doSubmit = async () => {
    await saveMovie(this.state.data);
    this.props.history.push("/movies");
    // await saveMovie(this.state.data);
    // console.log("be happy");
    // Must do a research to determine why push method is not working as expected
    // this.props.history.push("/movies");
    // this.props.history.replace("/movies");
  };

  render() {
    return (
      <div>
        <h1>Movie Form</h1>
        <form onSubmit={this.doSubmit}>
          {this.renderInput("title", "Title")}
          {this.renderSelect("genreId", "Genre", this.state.genres)}
          {this.renderInput("numberInStock", "Number In Stock", "number")}
          {this.renderInput("dailyRentalRate", "Rate")}
          {this.renderButton("Save")}
        </form>
        {/* <h1>Movie Details - {movie.title} </h1> */}
        {/* <h1>Movie Details - {this.props.match.params.id} </h1> */}

        {/* <button onClick={this.handleSave} className="btn btn-primary">
          Save
        </button> */}
      </div>
    );
  }
}

export default MovieForm;
