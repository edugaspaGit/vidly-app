import http from './httpService';
// import config from "../config.json";

const apiEndpoint = '/users';
// const apiEndpoint = config.apiUrl + '/users';

// function movieUrl(id) {
//     return `${apiEndpoint}/${id}`;
// }

// export function getMovies() {
//     return http.get(apiEndpoint);
// }

// export function getMovie(id) {
//     return http.get(movieUrl(id));
//     // return http.get(apiEndpoint + '/' + id);
// }

export function register(user) {
    // if (movie._id) {
    //     const body = { ...movie };
    //     delete body._id;
    //     return http.put(movieUrl(movie._id), body);
    // }
    return http.post(apiEndpoint, {
        email: user.username,
        password: user.password,
        name: user.name
    });
}

// export function deleteMovie(id) {
//     return http.delete(movieUrl(id));
// }

