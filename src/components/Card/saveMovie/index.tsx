import { connectMongoDB } from '@/lib/mongodb';
import { IMovieSchema, Movie } from '@/models/Movie';
import React, { useEffect } from 'react';

interface Props {
    title: string
    poster_path: string
    release_date: string
    idUser: string
  }


  export default function saveMovie({ title, poster_path, release_date, idUser }: Props) {
    useEffect(() => {
      const saveMovieToDB = async () => {
        try {
          await connectMongoDB();
  
          const newMovie: IMovieSchema = new Movie({
            title,
            poster_path,
            release_date,
            idUser,
          });
  
          await newMovie.save();
        } catch (error) {
          console.log(error);
        }
      };
  
      saveMovieToDB();
    }, []); // Empty dependency array to run the effect only once
  
    return <div>Películas Guardadas.</div>;
  }
