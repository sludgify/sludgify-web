// app/api/login/route.ts
import { NextRequest, NextResponse } from "next/server";
import { cookies } from "next/headers";
import axios from "axios";
import { axiosInstance } from "@/lib/axios";

export async function POST(req: NextRequest) {
    const body = await req.json();

    try {
        const { data } = await axiosInstance.post("/sludgify/login", body);

        // Simpan access token ke cookie
        (await cookies()).set("accessToken", data.token.access_token, {
            httpOnly: true,
            secure: process.env.NODE_ENV === "production",
            maxAge: 60 * 60 * 24 * 7, // 7 hari
            path: "/",
        });

        return NextResponse.json({ message: "Login berhasil", data: data.data, token: data.token });
    } catch (error: unknown) {
        if (axios.isAxiosError(error)) {
            console.error("Login error:", error.response?.data);
            return NextResponse.json({ message: error.response?.data?.message || "Login gagal" }, { status: 400 });
        } else {
            console.error("Login error:", error);
            return NextResponse.json({ message: "Login gagal" }, { status: 400 });
        }
    }
}
