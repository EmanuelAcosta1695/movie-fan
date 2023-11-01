'use client'
import "./style.css";
import React, { useState } from 'react';

import { connectMongoDB } from "@/lib/mongodb";
import { Movie } from "../../models/Movie";
import saveMovie from "./saveMovie";
import unsaveMovie from "./unsaveMovie";

interface Props {
    title: string
    poster_path: string
    release_date: string
    idUser: string
  }

export default function Card({ title, poster_path, release_date, idUser } : Props) {

    const [isFavorited, setIsFavorited] = useState(false);

    const MAX_TITLE_LENGTH = 20; // Define la longitud máxima del título

    // Función para truncar el título si es demasiado largo
    const truncateTitle = (title: String) => {
    if (title.length > MAX_TITLE_LENGTH) {
        return title.substring(0, MAX_TITLE_LENGTH) + '...';
    }
    return title;
    };


    const toggleFavorite = () => {
        // setIsFavorited(!isFavorited);

        if (isFavorited) {
          fetch("/api/movies", {
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
          })
          .catch((error) => {
            console.error("Error al guardar la película:", error);
          });


        // } else if (!isFavorited) {

        //   let idMovie;

        //   fetch(`/api/movies?title=${title}&poster_path=${poster_path}&release_date=${release_date}&idUser=${idUser}`, {
        //     method: "GET",
        //     headers: {
        //     "Content-Type": "application/json",
        //     },
        //   })
        //   .then((response) => response.json())
        //   .then((data) => {
        //     console.log("Película encontrada:", data);
        //     idMovie = data && data.movie ? data.movie._id : null;
        //   })
        //   .catch((error) => {
        //     console.error("Error al encontrar la película:", error);
        //   });


        // fetch("/api/movies?id=ID_DE_LA_PELICULA", {
        //   method: "DELETE",
        //   headers: {
        //     "Content-Type": "application/json",
        //   },
        //   })
        //   .then((response) => response.json())
        //   .then((data) => {
        //     console.log("Película eliminada:", data);
        //   })
        //   .catch((error) => {
        //     console.error("Error al eliminar la película:", error);
        //   });

        }
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
