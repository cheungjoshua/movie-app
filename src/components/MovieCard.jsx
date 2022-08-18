import React from "react";

const IMAGE_URL = "https://image.tmdb.org/t/p/w500/";

export default function MovieCard({ title, poster_path, overview }) {
  return (
    <div className="movieCard container d-flex flex-column justify-content-even  ">
      <h1 className="p-3">{title}</h1>
      <img src={IMAGE_URL + poster_path} alt="" className="p-2" />
      <p className="p-2">{overview}</p>
    </div>
  );
}
