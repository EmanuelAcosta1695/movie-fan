import { connectMongoDB } from "@/lib/mongodb";
import { IMovieSchema, Movie } from "@/models/Movie";
import { messages } from "@/utils/message";
import { NextRequest, NextResponse } from "next/server";



export async function DELETE(request: NextRequest) {
    try {
      const url = new URL(request.url);

      const movieId = url.searchParams.get('movieId');
  
      if (!movieId) {
        return NextResponse.json({ message: "Falta el parámetro 'movieId' en la URL" }, { status: 400 });
      }
  
      await connectMongoDB();
  
      // Busca la película por su ID y elimínala
      const deletedMovie = await Movie.findByIdAndRemove(movieId);
  
      if (deletedMovie) {
        return NextResponse.json({ message: "Película eliminada con éxito" }, { status: 200 });
      } else {
        return NextResponse.json({ message: "Película no encontrada" }, { status: 404 });
      }
    } catch (error) {
      return NextResponse.json(
        { message: "Error al eliminar la película", error },
        { status: 500 }
      );
    }
  }