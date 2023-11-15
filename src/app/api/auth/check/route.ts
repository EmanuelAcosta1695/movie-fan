import { messages } from "@/utils/message"
import {headers} from "next/headers"
import { NextResponse } from "next/server"
import jwt from "jsonwebtoken";
import { connectMongoDB } from "@/lib/mongodb";
import { User } from "@/models/User";

export async function GET() {
    try {
        const headerList = headers()

        const token = headerList.get('token')

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
