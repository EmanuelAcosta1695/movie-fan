import { connectMongoDB } from "@/lib/mongodb";
import { User } from "@/models/User";
import { messages } from "@/utils/message";
import { NextRequest, NextResponse } from "next/server";

// endpoint para traer usuarios
export async function GET(request: NextRequest) {
    try {
        
        await connectMongoDB();

        const users = await User.find();

        return NextResponse.json({ users }, { status: 200 });

    } catch (error) {
        return NextResponse.json(
            { message: messages.error.default, error },
            { status: 500 }
        )
    }
}