import React, { Component } from "react";
import Like from "./commons/like";
import Table from "./commons/table";
import { NavLink } from "react-router-dom";

class MoviesTable extends Component {
  columns = [
    {
      path: "title",
      label: "Title",
      content: (movie) => (
        <NavLink to={`/movies/${movie._id}`}>{movie.title}</NavLink>
      ),
    },
    { path: "genre.name", label: "Genre" },
    { path: "numberInStock", label: "Stock" },
    { path: "dailyRentalRate", label: "Rate" },
    {
      key: "like",
      content: (movie) => (
        <Like
          liked={movie.liked}
          onClick={() => this.props.onLike(movie)}
        ></Like>
      ),
    },
    {
      key: "delete",
      content: (movie) => (
        <button
          onClick={() => {
            this.props.onDelete(movie);
          }}
          className="btn btn-danger btn-sm"
        >
          Delete
        </button>
      ),
    },
  ];

  render() {
    const { movies, onSort, sortColumn } = this.props;
    return (
      <Table
        columns={this.columns}
        data={movies}
        sortColumn={sortColumn}
        onSort={onSort}
      />

      // // <table className="table">
      // //   <TableHeader
      // //     columns={this.columns}
      // //     sortColumn={sortColumn}
      // //     onSort={onSort}
      // //   />
      //   {/* <thead>
      //     <tr>
      //       <th onClick={() => this.raiseSort("title")}>Title</th>
      //       <th onClick={() => this.raiseSort("genre.name")}>Genre</th>
      //       <th onClick={() => this.raiseSort("numberInStock")}>Stock</th>
      //       <th onClick={() => this.raiseSort("dailyRentalRate")}>Rate</th>
      //       <th></th>
      //     </tr>
      //   </thead> */}
      //   {/* <TableBody data={movies} columns={this.columns} /> */}
      //   {/* <tbody>
      //     {movies.map((movie) => (
      //       <tr key={movie._id}>
      //         <td>{movie.title}</td>
      //         <td>{movie.genre.name}</td>
      //         <td>{movie.numberInStock}</td>
      //         <td>{movie.dailyRentalRate}</td>
      //         <td>
      //           <Like liked={movie.liked} onClick={() => onLike(movie)}></Like>
      //         </td>
      //         <td>
      //           <button
      //             onClick={() => {
      //               onDelete(movie._id);
      //             }}
      //             className="btn btn-danger btn-sm"
      //           >
      //             Delete
      //           </button>
      //         </td>
      //       </tr>
      //     ))}
      // //   </tbody> */}
      // // {/* </table> */}
    );
  }
}
export default MoviesTable;
