import React, { Component } from "react";
import { getMovies } from "../services/fakeMovieService";
import Pagination from "./commons/pagination";
import { paginate } from "./utils/paginate";
import ListGroup from "./commons/listgroup";
import { getGenres } from "../services/fakeGenreService";
import MoviesTable from "./moviesTable";
import _ from "lodash";
import { NavLink } from "react-router-dom";
import SearchBox from "./commons/searchBox";

class Movies extends Component {
  state = {
    movies: [],
    genres: [],
    currentPage: 1,
    pageSize: 6,
    searchQuery: "",
    selectedGenre: null,
    sortColumn: { path: "title", order: "asc" },
  };
  componentDidMount() {
    const genres = [{ _id: "", name: "All Genres" }, ...getGenres()];
    this.setState({ movies: getMovies(), genres });
  }

  handleSearch = (query) => {
    this.setState({ searchQuery: query, selectedGenre: null, currentPage: 1 });
  };

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
      searchQuery,
      sortColumn,
    } = this.state;

    let filtered = allMovies;
    if (searchQuery)
      filtered = allMovies.filter((movie) =>
        movie.title.toLowerCase().startsWith(searchQuery.toLowerCase())
      );
    else if (selectedGenre && selectedGenre._id)
      filtered = allMovies.filter(
        (movie) => movie.genre._id === selectedGenre._id
      );

    // const moviesGenre =
    //   selectedGenre && selectedGenre._id
    //     ? allMovies.filter((movie) => movie.genre._id === selectedGenre._id)
    //     : allMovies;

    const sorted = _.orderBy(
      filtered,
      // moviesGenre,
      [sortColumn.path],
      [sortColumn.order]
    );

    const movies = paginate(sorted, currentPage, pageSize);

    return { totalCount: filtered.length, movies };
  };

  render() {
    const {
      genres,
      currentPage,
      pageSize,
      searchQuery,
      selectedGenre,
      sortColumn,
    } = this.state;

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
          {/* <button className="btn btn-primary">New Movie</button> */}
          <NavLink to={`/movies/new`}>
            <button className="btn btn-primary" style={{ marginBottom: 20 }}>
              New Movie
            </button>
          </NavLink>
          <p>Showing {totalCount} movies from the DB:</p>
          <SearchBox value={searchQuery} onChange={this.handleSearch} />
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
