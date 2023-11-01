import { connectMongoDB } from "@/lib/mongodb";
import { isValidEmail } from "@/utils/isValidEmail";
import { messages } from "@/utils/message";
import { NextRequest, NextResponse } from "next/server";
import { IUserSchema, User } from "@/models/User";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

// endpoint para registrar usuarios
export async function POST(request: NextRequest) {

    try {
        await connectMongoDB();

        const body = await request.json()

        const {email, password, confirmPassword} = body;

        // validar que esten todos los campos enviados
        if(!email || !password || !confirmPassword) {

            return NextResponse.json(
                {
                    message: messages.error.needProps,
                },
                {
                    status: 400,  // indica que el servidor no va a procesar la solicitud debido a algo que se percibe como error del cliente. ej datos invalidos
                }
            );
        }

        // validar si el email es un email
        if(!isValidEmail(email)){
            return NextResponse.json({
                message: messages.error.emailNotValid,
            },
            {
                status: 400,
            }
            )
        }

        // validar que las contraseñas sean iguales
        if(password !== confirmPassword) {
            return NextResponse.json({
                message: messages.error.passwordsNotMatch,
            },
            {
                status: 400,
            }
            )
        }

        const userFind = await User.findOne({ email }); // email === email

        if (userFind){
            return NextResponse.json({
                message: messages.error.emailExist,
            },
            {
                status: 409, // 409 Conflict para indicar que la solicitud no se pudo completar debido a un conflicto con el estado actual del recurso
            }
            )
        }

        const hashedPassword = await bcrypt.hash(password, 10);

        const newUser: IUserSchema = new User({
            email,
            password: hashedPassword,
        });

        // @ts-ignore
        const {password: userPass, ...rest} = newUser._doc;

        // guardamos el user en la db
        await newUser.save();

        // 'secreto' -> palabra clave que se utiliza siempre q se usa jwt
        // 1er argumento, el payload. en este caso el nuevo user, excepto pass
        // 3er argumento, un objeto de configuracion
        const token = jwt.sign({ data: rest }, 'secreto', {
            expiresIn: 86400, // 1 dia
        });

        const response = NextResponse.json({
                newUser: rest,
                message: messages.succes.userCreated,
            },
            {
                status: 200,
            }
        );

        // Le setiamos cookies para cuando estemos en el home, ya las tengamos 
        //  setiadas y tengamos validadas nuestras rutas
        response.cookies.set('auth_cookie', token, {
            secure: process.env.NODE_ENV === 'production',
            sameSite: 'strict',
            maxAge: 86400,
            path: "/"
        }) // solo se activa en produccion

        return response;
    } catch (error) {
        return NextResponse.json(
            { messages: messages.error.default, error }, // le envio el error en el catch
            { status: 500 }
        )
    }

}