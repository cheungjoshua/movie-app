import React, { useState, useEffect } from "react";
import axios from "axios";

const API_KEY = process.env.REACT_APP_API_KEY;
const API_URL = "https://api.themoviedb.org/3";

export default function Nav({ setMovies }) {
  const [genres, setGenres] = useState([{ id: 0, name: "None" }]);
  // const [value, setValue] = useState("None");

  let value;

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
    if (id === "0") {
      const {
        data: { results },
      } = await axios.get(`${API_URL}/movie/popular`, {
        params: { api_key: API_KEY },
      });

      setMovies(results);
    } else {
      const {
        data: { results },
      } = await axios.get(`${API_URL}/discover/movie`, {
        params: { api_key: API_KEY, with_genres: id },
      });

      setMovies(results);
    }
  };

  useEffect(() => {
    fetchGenres();
  }, []);

  // Create Genres drop down component
  const genresList = genres.map((genre) => {
    return <option value={genre.id}>{genre.name}</option>;
  });

  return (
    <nav className="container d-flex justify-content-between vh-10">
      <h1>Movie App</h1>
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
  );
}
