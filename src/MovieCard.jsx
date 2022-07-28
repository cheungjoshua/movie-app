import React from "react";

const IMAGE_URL = "https://image.tmdb.org/t/p/w500/";

export default function MovieCard({ detail }) {
  return (
    <div>
      <h1>{detail.title}</h1>
      <img src={IMAGE_URL + detail.poster_path} alt="" />
      <p>{detail.overview}</p>
    </div>
  );
}
