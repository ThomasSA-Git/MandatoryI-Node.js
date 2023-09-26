const movies = [
    {   
        id: 1,
        name: "Tenacious D in The Pick of destiny",
        prodYear: 2006
    },
    {   
        id: 2,
        name: "School of Rock",
        prodYear: 2003
    },
    {   
        id: 3,
        name: "Anchorman",
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

export function updateMovie(movieName, updatedMovie) {
    const existingMovie = movies.findIndex((movie) => movie.name === movieName);
  
    if (existingMovie === -1) {
      return { error: "No movie with that name." };
    } else {
      movies[existingMovie] = { ...movies[existingMovie], ...updatedMovie };
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