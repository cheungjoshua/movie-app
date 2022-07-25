import { useEffect, useState } from "react";
import axios from "axios";
import MovieCard from "./MovieCard";
import "./App.css";

const API_KEY = "ed4fecd45ab8041d6f5b86745794548c";
const API_URL = "https://api.themoviedb.org/3/movie/popular?api_key=";
const SEARCH = "https://api.themoviedb.org/3/search/company?api_key=";

function App() {
  const [movies, setMovies] = useState([]);

  useEffect(() => {
    axios.get(API_URL + API_KEY).then((res) => {
      console.log(res.data);
      setMovies(res.data.results);
      console.log(movies);
    });
  }, []);

  const movieCard = movies.map((data) => {
    return <MovieCard />;
  });

  return <div className="App">{movieCard}</div>;
}

export default App;
