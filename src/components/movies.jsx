import React, { Component } from "react";
import { getMovies } from "../services/fakeMovieService";
import Pagination from "./commons/pagination";
import { paginate } from "./utils/paginate";
import ListGroup from "./commons/listgroup";
import { getGenres } from "../services/fakeGenreService";
import MoviesTable from "./moviesTable";
import _ from "lodash";


class Movies extends Component {
  state = {
    movies: [],
    genres: [],
    currentPage: 1,
    pageSize: 6,
    sortColumn: { path: "title", order: "asc" },
  };
  componentDidMount() {
    const genres = [{ _id: "", name: "All Genres" }, ...getGenres()];
    this.setState({ movies: getMovies(), genres });
  }

  handleDelete = (movie) => {
    const movies = this.state.movies.filter((m) => m._id != movie._id);
    this.setState({ movies });
  };

  handleLike = (movie) => {
    const movies = [...this.state.movies];
    const index = movies.indexOf(movie);
    movies[index] = { ...movies[index] };
    movies[index].liked = !movies[index].liked;
    this.setState({ movies });
  };

  handlePageChange = (page) => {
    this.setState({ currentPage: page });
  };

  handleGenreSelect = (genre) => {
    this.setState({ selectedGenre: genre, currentPage: 1 });
  };

  handleSort = (sortColumn) => {
    // const sortColumn = { ...this.state.sortColumn };
    // if (sortColumn.path === path) {
    //   sortColumn.order === "asc"
    //     ? (sortColumn.order = "desc")
    //     : (sortColumn.order = "asc");
    // } else {
    //   sortColumn.path = path;
    //   sortColumn.order = "asc";
    // }
    this.setState({ sortColumn });
  };

  getPagedData = () => {
    const {
      movies: allMovies,
      currentPage,
      pageSize,
      selectedGenre,
      sortColumn,
    } = this.state;

    const moviesGenre =
      selectedGenre && selectedGenre._id
        ? allMovies.filter((movie) => movie.genre._id === selectedGenre._id)
        : allMovies;

    const sorted = _.orderBy(
      moviesGenre,
      [sortColumn.path],
      [sortColumn.order]
    );

    const movies = paginate(sorted, currentPage, pageSize);

    return { totalCount: moviesGenre.length, movies };
  };

  render() {
    const { genres, currentPage, pageSize, selectedGenre, sortColumn } =
      this.state;

    const { totalCount, movies } = this.getPagedData();

    if (totalCount === 0) return <p>No movies to show from the database</p>;
    //return <p className="badge m-2">No movies to show from the database</p>;
    return (

        <div className="row">
          <div className="col-3">
            <ListGroup
              groups={genres}
              valueProperty="_id"
              textProperty="name"
              selectedGroup={selectedGenre}
              onGroupSelect={this.handleGenreSelect}
            />
          </div>
          <div className="col">
            <p>Showing {totalCount} movies from the DB:</p>
            <MoviesTable
              movies={movies}
              sortColumn={sortColumn}
              onLike={this.handleLike}
              onDelete={this.handleDelete}
              onSort={this.handleSort}
            />
            <Pagination
              //  itemsCount="abc"
              itemsCount={totalCount}
              pageSize={pageSize}
              currentPage={currentPage}
              onPageChange={this.handlePageChange}
            />
          </div>
        </div>              
    );
  }
}

export default Movies;
