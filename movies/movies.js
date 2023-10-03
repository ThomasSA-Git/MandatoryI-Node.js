const movies = [
    {   
        id: 1,
        name: "The room",
        genre: "Drama",
        prodYear: 2003
    },
    {   
        id: 2,
        name: "School of rock",
        genre: "Comedy",
        prodYear: 2003
    },
    {   
        id: 3,
        name: "Anchorman",
        genre: "Comedy",
        prodYear: 2004
    }
];

let currentId = 3;

export function getMovies() {
    return movies;
}

export function getMovie(name) {
    const foundMovie = movies.find((movie) => movie.name === name);
    return foundMovie;
}

export function addMovie(movie) {
    movie.id = ++currentId;
    movies.push(movie);
    return movies.find((movie) => movie.id === currentId)
}

export function updateMovie(movieId, updatedMovie) {
    const existingMovie = movies.findIndex((movie) => movie.id === movieId);
    
    if (existingMovie === -1) {
      return { error: "No movie with that id." };
    } else {
      movies[existingMovie] = { ...movies[existingMovie], ...updatedMovie, id: movieId };
      return movies[existingMovie];
    }
  }

export function deleteMovie(movieName) {

    const existingMovieIndex = movies.findIndex((movie) => movie.name === movieName);
    
    if (existingMovieIndex === -1) {
        return { error: "No movie with that name." };
    } else {
        const deletedMovie = movies.splice(existingMovieIndex, 1);
        return deletedMovie;
    };
}