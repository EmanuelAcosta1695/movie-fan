import { connectMongoDB } from "@/lib/mongodb";
import { IMovieSchema, Movie } from "@/models/Movie";
import { messages } from "@/utils/message";
import { NextRequest, NextResponse } from "next/server";


export async function POST(request: NextRequest) {
    try {
        const postData = await request.json();

        await connectMongoDB();

        console.log(postData)

        // Busca la película según los datos proporcionados
        const movie = await Movie.findOne({     
            title: postData.title,
            idUser: postData.idUser,
        });

        console.log(movie)

        return NextResponse.json({ movie }, { status: 200 });

    } catch (error) {

        console.log("Ocurrio un error", error)
        return NextResponse.json(
            { message: messages.error.default, error },
            { status: 500 }
        )
    }
}
