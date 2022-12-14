import { useEffect, useState } from "react";
import axios from "axios";
import "bootstrap/dist/css/bootstrap.min.css";
import "./App.scss";
import Nav from "./components/Nav";
import MovieCard from "./components/MovieCard";

const API_KEY = process.env.REACT_APP_API_KEY;
const API_URL = "https://api.themoviedb.org/3";
// const SEARCH = "https://api.themoviedb.org/3/search/company";

function App() {
  const [movies, setMovies] = useState([]);

  // fetch movie
  const fetchMovie = async () => {
    const {
      data: { results },
    } = await axios.get(`${API_URL}/movie/popular`, {
      params: { api_key: API_KEY },
    });

    setMovies(results);
  };

  useEffect(() => {
    fetchMovie();
  }, []);

  // Create indivials movie card components
  const movieCard = movies.map((data) => {
    return <MovieCard key={data.id} {...data} />;
  });

  return (
    <div className="App">
      <Nav setMovies={setMovies} />

      <div className="container d-flex flex-xs-column flex-md-row  flex-wrap ">
        {movieCard}
      </div>
    </div>
  );
}

export default App;
