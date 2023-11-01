import { connectMongoDB } from "@/lib/mongodb";
import { IMovieSchema, Movie } from "@/models/Movie";
import { messages } from "@/utils/message";
import { NextRequest, NextResponse } from "next/server";


interface MovieQueryParams {
    title: string;
    poster_path: string;
    release_date: string;
    idUser: string;
}

export default async function GET(request: NextRequest) {
    try {
        const postData = await request.json();

        await connectMongoDB();

        // Busca la película según los datos proporcionados
        const movie = await Movie.findOne({     
            title: postData.title,
            poster_path: postData.poster_path,
            release_date: postData.release_date,
            idUser: postData.idUser,
        });

        return NextResponse.json({ movie }, { status: 200 });

    } catch (error) {
        return NextResponse.json(
            { message: messages.error.default, error },
            { status: 500 }
        )
    }
}


export async function POST(request: NextRequest) {
    try {
        
        const postData = await request.json();

        await connectMongoDB();

        const newMovie: IMovieSchema = new Movie({
            title: postData.title,
            poster_path: postData.poster_path,
            release_date: postData.release_date,
            idUser: postData.idUser,
        });

        await newMovie.save();

        return NextResponse.json({ newMovie }, { status: 200 });

    } catch (error) {
        return NextResponse.json(
            { message: messages.error.default, error },
            { status: 500 }
        )
    }
}


export async function DELETE(request: NextRequest) {
    try {
        
        await connectMongoDB();

        const movie = await Movie.find();

        return NextResponse.json({ movie }, { status: 200 });

    } catch (error) {
        return NextResponse.json(
            { message: messages.error.default, error },
            { status: 500 }
        )
    }
}


// export async function getMovies(request: NextRequest) {
//     try {
//         await connectMongoDB();
//         const movies = await Movie.find();
//         return NextResponse.json({ movies }, { status: 200 });
//     } catch (error) {
//         return NextResponse.json(
//             { message: messages.error.default, error },
//             { status: 500 }
//         );
//     }
// }

// export async function saveMovie(request: NextRequest) {
//     try {
//         const data = await request.json();
//         await connectMongoDB();
//         // Realiza las acciones necesarias para procesar la solicitud POST, por ejemplo, guardar una nueva película.
//         // Puedes utilizar los datos recibidos en 'data'.
//         // Ejemplo:
//         // const newMovie = new Movie(data);
//         // await newMovie.save();
//         return NextResponse.json({ message: "Película guardada" }, { status: 201 });
//     } catch (error) {
//         return NextResponse.json(
//             { message: messages.error.default, error },
//             { status: 500 }
//         );
//     }
// }


// Endpoint para manejar tanto GET como POST
// export default async function handler(request: NextRequest) {
    
//     if (request.method === "GET") {
//         try {
//             await connectMongoDB();
//             const movies = await Movie.find();
//             return NextResponse.json({ movies }, { status: 200 });
//         } catch (error) {
//             return NextResponse.json(
//                 { message: messages.error.default, error },
//                 { status: 500 }
//             );
//         }
        
//     } else if (request.method === "POST") {
//         try {
//             const data = await request.json();
//             await connectMongoDB();
//             // Realiza las acciones necesarias para procesar la solicitud POST, por ejemplo, guardar una nueva película.
//             // Puedes utilizar los datos recibidos en 'data'.
//             // Ejemplo:
//             // const newMovie = new Movie(data);
//             // await newMovie.save();
//             return NextResponse.json({ message: "Película guardada" }, { status: 201 });
//         } catch (error) {
//             return NextResponse.json(
//                 { message: messages.error.default, error },
//                 { status: 500 }
//             );
//         }
//     }

//     return NextResponse.json({ message: "Método no permitido" }, { status: 405 });
// }

// endpoint para traer usuarios
// export async function GET(request: NextRequest) {
//     try {
        
//         await connectMongoDB();

//         const movie = await Movie.find();

//         return NextResponse.json({ movie }, { status: 200 });

//     } catch (error) {
//         return NextResponse.json(
//             { message: messages.error.default, error },
//             { status: 500 }
//         )
//     }
// }