import { connectMongoDB } from "@/lib/mongodb";
import { isValidEmail } from "@/utils/isValidEmail";
import { messages } from "@/utils/message";
import { NextRequest, NextResponse } from "next/server";
import { IUserSchema, User } from "@/models/User";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { isValidPassword } from "@/utils/isValidPassword";

export async function POST(request: NextRequest) {

    try {
        await connectMongoDB();

        const body = await request.json()

        const {email, password, confirmPassword} = body;

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

        if(!isValidEmail(email)){
            return NextResponse.json({
                message: messages.error.emailNotValid,
            },
            {
                status: 400,
            }
            )
        }

        if(password !== confirmPassword) {
            return NextResponse.json({
                message: messages.error.passwordsNotMatch,
            },
            {
                status: 400,
            }
            )
        }

        // Validación de la contraseña
        if (!isValidPassword(password)) {
             return NextResponse.json({
                 message: messages.error.passwordNotValid,
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
                status: 409,
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

        await newUser.save();

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

        response.cookies.set('auth_cookie', token, {
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