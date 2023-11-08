'use client'
import "./style.css";
import React, { useState } from 'react';
import { connectMongoDB } from "@/lib/mongodb";
import { Movie } from "../../models/Movie";

interface Props {
    title: string
    poster_path: string
    release_date: string
    idUser: string
  }

export default function Card({ title, poster_path, release_date, idUser } : Props) {

  const [isFavorited, setIsFavorited] = useState(false);

  const MAX_TITLE_LENGTH = 20; // Define la longitud máxima del título

  // Función para truncar el título
  const truncateTitle = (title: String) => {
  if (title.length > MAX_TITLE_LENGTH) {
      return title.substring(0, MAX_TITLE_LENGTH) + '...';
  }
    return title;
  };


  const toggleFavorite = () => {

    fetch("/api/movies/favoriteMovies", {
      method: "POST",
      headers: {
      "Content-Type": "application/json",
      },
      body: JSON.stringify({
        title: title,
        poster_path: poster_path,
        release_date: release_date,
        idUser: idUser,
      }),
    })
    .then((response) => response.json())
    .then((data) => {
      console.log("Película guardada:", data);
      setIsFavorited(true);
    })
    .catch((error) => {
      console.error("Error al guardar la película:", error);
    });

  };
  
  // ver foto peli: https://image.tmdb.org/t/p/w200/51tqzRtKMMZEYUpSYkrUE7v9ehm.jpg   // poster_path
  return (
    <div className="card">
        <button
            className={`favorite-button ${isFavorited ? 'favorited' : ''}`}
            onClick={toggleFavorite}
            >
            &#9734; {/* Estrella Unicode */}
        </button>
        <img src={`https://image.tmdb.org/t/p/w200${poster_path}`} alt="Actor 1"/>
        <div className="card-content">
            <h2 style={{cursor: 'pointer'}}>{truncateTitle(title)} <h3>{release_date}</h3></h2>
        </div>
    </div>
)
}
