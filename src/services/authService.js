import http from './httpService';
import config from "../config.json";

const apiEndpoint = config.apiUrl + '/auths';

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

export function login(email, password) {
    // if (movie._id) {
    //     const body = { ...movie };
    //     delete body._id;
    //     return http.put(movieUrl(movie._id), body);
    // }
    return http.post(apiEndpoint, {
        email,
        password
    });
}

// export function deleteMovie(id) {
//     return http.delete(movieUrl(id));
// }

