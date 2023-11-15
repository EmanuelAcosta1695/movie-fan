import { connectMongoDB } from "@/lib/mongodb";
import { IUser, User } from "@/models/User";
import { messages } from "@/utils/message";
import { NextRequest, NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

export async function POST(request: NextRequest) {

    try {
        await connectMongoDB();

        const body: IUser = await request.json()

        const {email, password } = body;

        // validar que esten todos los campos enviados
        if(!email || !password ) {

            return NextResponse.json(
                {
                    message: messages.error.needProps,
                },
                {
                    status: 400,  // indica que el servidor no va a procesar la solicitud debido a algo que se percibe como error del cliente. ej datos invalidos
                }
            );
        }

        const userFind = await User.findOne({ email });

        if(!userFind){
            return NextResponse.json(
                { message: messages.error.userNotFound },
                { status: 400 }
            )
        }

        const isCorrect: boolean = await bcrypt.compare(
            password,
            userFind.password
        )

        if(!isCorrect) {
            return NextResponse.json(
                { message: messages.error.incorrectPassword },
                { status: 400 }
            )
        }

        // @ts-ignore
        const {password: userPass, ...rest} = userFind._doc;

        const token = jwt.sign({ data: rest }, 'secreto', {
            expiresIn: 86400, // 1 dia
        });

        const response = NextResponse.json({
            newUser: rest,
            message: messages.succes.userLogged,
        },
        {
            status: 200,
        }
    );

    response.cookies.set('auth_cookie', token, {
        secure: process.env.NODE_ENV === 'production',
        sameSite: 'strict',
        maxAge: 86400,
        path: "/"
    })

    response.cookies.set('user_data', JSON.stringify(rest), {
        secure: process.env.NODE_ENV === 'production',
        sameSite: 'strict',
        maxAge: 86400,
        path: "/"
    })

    return response;

    } catch (error) {
        return NextResponse.json(
            { messages: messages.error.default, error },
            { status: 500 }
        )
    }

}