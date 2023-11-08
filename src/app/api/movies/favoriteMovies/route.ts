import { connectMongoDB } from "@/lib/mongodb";
import { IMovieSchema, Movie } from "@/models/Movie";
import { messages } from "@/utils/message";
import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
    try {
        
        const postData = await request.json();

        console.log("PostData: ", postData)

        await connectMongoDB();

        const newMovie: IMovieSchema = new Movie({
            title: postData.title,
            poster_path: postData.poster_path,
            release_date: postData.release_date,
            idUser: postData.idUser,
        });

        await newMovie.save();

        console.log("PostData: ", newMovie)

        return NextResponse.json({ newMovie }, { status: 200 });

    } catch (error) {
        console.error("Error al procesar la solicitud POST:", error);
        return NextResponse.json(
            { message: messages.error.default, error },
            { status: 500 }
        )
    }
}