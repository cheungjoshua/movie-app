import { useEffect, useState } from "react";
import axios from "axios";
import MovieCard from "./MovieCard";
import "./App.scss";

const API_KEY = process.env.REACT_APP_API_KEY;
const API_URL = "https://api.themoviedb.org/3";
const SEARCH = "https://api.themoviedb.org/3/search/company";

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
    return <MovieCard key={data.id} {...data} />;
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
