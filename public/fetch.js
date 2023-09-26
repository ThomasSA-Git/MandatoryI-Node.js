//import { sanitizeStringWithTableRows } from "./util/util.js";


getMovies();

function getMovies(){
    fetch("/movies")
    .then(((response) => {
        if(!response.ok) {
           throw new Error("Error getting movies");
        }
        return response.json();
    }))
    .then((result) => {
        console.log(result[0])
        const tbody = document.getElementById("table");
        let moviesTable = result.map(movie =>
            `<tr>
            <td>${movie.name}</td>
            <td>${movie.prodYear}</td>
            </tr>
        `).join("");
        //let safeTable = sanitizeStringWithTableRows(moviesTable);
        tbody.innerHTML = moviesTable;
    });

};

function getMovie(){


};

function addMovie(){


};

function updateMovie(){


};

function deleteMovie(){


};

