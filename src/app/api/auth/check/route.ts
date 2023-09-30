import { messages } from "@/utils/message"
import {headers} from "next/headers"
import { NextResponse } from "next/server"
import jwt from "jsonwebtoken";
import { connectMongoDB } from "@/lib/mongodb";
import { User } from "@/models/User";

// Se agrega luego en un middleware cuando se crea el front
//   para validar en la home que el usuario este autenticado.
//   Y vamos a tener en la cookie un token y justamente este endpoint
//      verifica que esa cookie funcione correctamente.

export async function GET() {
    try {
        const headerList = headers()

        // obtengo el token
        const token = headerList.get('token')

        // validamos que haya token
        if(!token) {
            return NextResponse.json(
                { message: messages.error.notAuthorized },
                { status: 400 }
            )
        }

        try {
            const isTokenValid = jwt.verify(token, 'secreto');

            // @ts-ignore
            const { data } = isTokenValid;

            await connectMongoDB();
            
            const userFind = await User.findById(data._id);

            // verificamos que exista el usuario
            if(!userFind) {
                return NextResponse.json(
                    { message: messages.error.userNotFound },
                    { status: 400 }
                )
            }

            return NextResponse.json(
                { isAuthorized: true, message: messages.succes.authorized },
                { status: 200 }
            )


        } catch (error) {
            return NextResponse.json(
                { messages: messages.error.tokenNotValid, error },
                { status: 400 }
            )
        }

    } catch (error) {
        return NextResponse.json(
            { messages: messages.error.default, error },
            { status: 400 }
        )
    }
}
