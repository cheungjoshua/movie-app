import { useEffect, useState } from "react";
import axios from "axios";
import MovieCard from "./MovieCard";
import "./App.scss";

const API_KEY = "ed4fecd45ab8041d6f5b86745794548c";
const API_URL = "https://api.themoviedb.org/3";
const SEARCH = "https://api.themoviedb.org/3/search/company";

//https://api.themoviedb.org/3/discover/movie?api_key=ed4fecd45ab8041d6f5b86745794548c&with_genres=28&page=1

function App() {
  const [movies, setMovies] = useState([]);
  const [genres, setGenres] = useState([{ id: 0, name: "None" }]);
  const [value, setValue] = useState("None");

  // fetch movie
  const fetchMovie = async () => {
    const {
      data: { results },
    } = await axios.get(`${API_URL}/movie/popular`, {
      params: { api_key: API_KEY },
    });

    setMovies(results);
  };

  // Fetch Genres
  const fetchGenres = async () => {
    const {
      data: { genres },
    } = await axios.get(`${API_URL}/genre/movie/list`, {
      params: { api_key: API_KEY },
    });

    setGenres((prev) => [...prev, ...genres]);
  };

  // Fetch by genres
  const fetchByGenres = async (id) => {
    const {
      data: { results },
    } = await axios.get(`${API_URL}/discover/movie`, {
      params: { api_key: API_KEY, with_genres: id },
    });
    console.log(results);
    setMovies(results);
  };

  useEffect(() => {
    fetchMovie();
    fetchGenres();
  }, []);

  // Create indivials movie card components
  const movieCard = movies.map((data) => {
    return <MovieCard key={data.id} detail={data} />;
  });

  // Create Genres drop down component
  const genresList = genres.map((genre) => {
    return <option value={genre.id}>{genre.name}</option>;
  });

  return (
    <div className="App">
      <nav>
        <select
          value={value}
          onChange={(e) => {
            e.preventDefault();
            fetchByGenres(e.target.value);
            console.log("called");
          }}
        >
          {genresList}
        </select>
      </nav>
      <div className="movies_container">{movieCard}</div>
    </div>
  );
}

export default App;
