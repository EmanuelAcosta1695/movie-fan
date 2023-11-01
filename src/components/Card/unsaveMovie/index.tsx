import { connectMongoDB } from '@/lib/mongodb';
import { IMovieSchema, Movie } from '@/models/Movie';
import React from 'react'

interface Props {
    title: string
    poster_path: string
    release_date: string
    idUser: string
  }


export default async function unsaveMovie({ title, poster_path, release_date, idUser } : Props) {

    try {
        await connectMongoDB();

        const movieFind = await Movie.findOne({ title, idUser});
    
        if (movieFind) {
            await Movie.deleteOne({ title, idUser })
            // await Movie.deleteOne({ _id: movieFind._id });
        }
    
        return (
            <div>Peliculas Eliminada.</div>
        )
    } catch (error) {
        console.log(error);
    }

}