import { connectMongoDB } from "@/lib/mongodb";
import { IMovieSchema, Movie } from "@/models/Movie";
import { messages } from "@/utils/message";
import { NextRequest, NextResponse } from "next/server";


export async function GET(request: NextRequest) {
    try {

        const url = new URL(request.url);

        const userId = url.searchParams.get("userId");

        await connectMongoDB();

        // Busca la película según el ID del usuario
        let movies = await Movie.find({ idUser: userId });

        return NextResponse.json({ movies }, { status: 200 });

    } catch (error) {
        console.error("Ocurrió un error", error);
        return NextResponse.json(
            { message: messages.error.default, error },
            { status: 500 }
        );
    }
}

