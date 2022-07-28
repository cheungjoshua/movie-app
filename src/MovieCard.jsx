import React from "react";

const IMAGE_URL = "https://image.tmdb.org/t/p/w500/";

export default function MovieCard({ title, poster_path, overview }) {
  return (
    <div>
      <h1>{title}</h1>
      <img src={IMAGE_URL + poster_path} alt="" />
      <p>{overview}</p>
    </div>
  );
}
