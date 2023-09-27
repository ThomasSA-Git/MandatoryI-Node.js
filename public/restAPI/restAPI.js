import { escapeHTML } from "../assets/js/escapeHTML.js";

getMovies();

function getMovies() {
  fetch("/movies")
    .then((response) => {
      if (!response.ok) {
        throw new Error("Error getting movies");
      }
      return response.json();
    })
    .then((result) => {
      const tbody = document.getElementById("table");
      let moviesTable = result
        .map(
          (movie) =>
            `<tr>
            <td>${escapeHTML(movie.name)}</td>
            <td>${escapeHTML(movie.genre)}</td>
            <td>${movie.prodYear}</td>
            </tr>
        `
        )
        .join("");

      tbody.innerHTML = moviesTable;
    });
};


const getMovieBtn = document.getElementById("getMovieBtn");

const getPatchMovieBtn = document.getElementById("getPatchMovieBtn");

getMovieBtn.addEventListener("click", () => {
  getMovie(false);
});



function getMovie(patch) {
  let getMovieName;
  if(!patch){
    getMovieName = document.getElementById("getMovie").value;
  }
  else{
    getMovieName = document.getElementById("patchName").value;
  }

  fetch(`/movies/${getMovieName}`)
    .then((response) => {
      if (!response.ok) {
        throw new Error("Error getting movie");
      }
      return response.json();
    })
    .then((result) => {
      console.log(result.name);
      if (!patch) {
        const desc = document.getElementById("fetchedMovie");

        let movieData = `<p><strong>Movie name: </strong>${escapeHTML(
          result.name
        )}
        <br>
        <strong>Production year: </strong>${result.prodYear}
        </p>`;
        desc.innerHTML = movieData;
      }
      else{
        document.getElementById("movieId").innerText = result.id;
        document.getElementById("patchName").value = result.name;
        document.getElementById("patchGenre").value = result.genre;
        document.getElementById("patchProdYear").value = Number(result.prodYear);
      }
    });
};

const postMovieBtn = document.getElementById("postMovieBtn");

postMovieBtn.addEventListener("click", () => {
  const name = document.getElementById("postName").value;
  const genre = document.getElementById("postGenre").value;
  const prodYear = document.getElementById("postProdYear").value;
  const movieData = {
    name,
    genre,
    prodYear,
  };

  fetch(`/movies`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(movieData),
  })
    .then((response) => {
      if (!response.ok) {
        document.getElementById("response-message-post").innerText = "Error";
        throw new Error("Error posting movie");
      }
      return response.json();
    })
    .then((result) => {
      document.getElementById("response-message-post").innerText = "Post successful. Check table for result";
      document.getElementById("postName").value = "";
      document.getElementById("postGenre").value = "";
      document.getElementById("postProdYear").value = null;
      getMovies();
    });
});

getPatchMovieBtn.addEventListener("click", () => {
  document.getElementById("response-message-patch").innerText = "";
  getMovie(true);
});

const patchMovieBtn = document.getElementById("patchMovieBtn");

patchMovieBtn.addEventListener("click", () => {
  const id = document.getElementById("movieId").innerText;
  const name = document.getElementById("patchName").value;
  const genre = document.getElementById("patchGenre").value;
  const prodYear = document.getElementById("patchProdYear").value;

  const movieData = {
    name,
    genre,
    prodYear,
  };

  fetch(`/movies/${id}`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(movieData),
  })
    .then((response) => {
      if (!response.ok) {
        document.getElementById("response-message").innerText = "Error"
        throw new Error("Error posting movie");
      }
      return response.json();
    })
    .then((result) => {
      document.getElementById("response-message-patch").innerText = "Update successful. Check table for result";
      document.getElementById("movieId").innerText = undefined;
      document.getElementById("patchName").value = "";
      document.getElementById("patchGenre").value = "";
      document.getElementById("patchProdYear").value = null;
      getMovies();
    });
});

const deleteMovieBtn = document.getElementById("deleteMovieBtn");

deleteMovieBtn.addEventListener("click", () => {
  const name = document.getElementById("deleteMovie").value;
  fetch(`/movies/${name}`, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
    }
  })
    .then((response) => {
      if (!response.ok) {
        document.getElementById("response-message-patch").innerText = "Error";
        throw new Error("Error deleting movie");
      }
      return response.json();
    })
    .then((result) => {
      document.getElementById("response-message-delete").innerText = "Delete successful. Check table for result";
      document.getElementById("deleteMovie").value = "";
      getMovies();
    });
});
