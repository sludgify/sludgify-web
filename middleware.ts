import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { axiosInstance } from "./lib/axios";
import { AxiosError } from "axios";

interface ErrorResponse {
    message: string;
    errors?: {
        [field: string]: string[];
    };
}

const getAccountActivePage = async (token: string) => {
    try {
        const response = await axiosInstance.get(`/sludgify/auth/account-active/status/${token}`, {
            headers: { "Content-Type": "application/json" },
        });
        console.log("Response data:", response.data?.data);
        return response.data?.data;
    } catch (err) {
        const error = err as AxiosError<ErrorResponse>;
        console.error("Terjadi kesalahan:", error);
    }
};

const getAccountActiveEmail = async (token: string) => {
    try {
        const response = await axiosInstance.get(`/sludgify/auth/account-active/activation/${token}`, {
            headers: { "Content-Type": "application/json" },
        });
        return response.data?.data;
    } catch (err) {
        const error = err as AxiosError<ErrorResponse>;
        console.error("Terjadi kesalahan:", error);
    }
};

export async function middleware(request: NextRequest) {
    const url = request.nextUrl.clone();
    const accessToken = request.cookies.get("accessToken")?.value;

    if (url.pathname === "/account-active" || url.pathname === "/account-active/sent") {
        const token = url.searchParams.get("token");
        console.log("Token from URL:", token);
        if (!token) {
            return NextResponse.redirect(new URL("/login", request.url));
        }

        if (url.pathname === "/account-active/sent") {
            const getAccountActive = await getAccountActivePage(token || "");
            console.log("Account Active Data line 51:", getAccountActive);
            if (!getAccountActive) {
                return NextResponse.redirect(new URL("/login", request.url));
            }
        }

        if (url.pathname === "/account-active") {
            const getAccountActive = await getAccountActiveEmail(token || "");
            console.log("Account Active Data line 59:", getAccountActive);
            if (!getAccountActive) {
                return NextResponse.redirect(new URL("/login", request.url));
            }
        }
    }

    if (url.pathname === "/login" || url.pathname === "/register") {
        if (accessToken) {
            return NextResponse.redirect(new URL("/client-menu", request.url));
        }
    }

    if (url.pathname === "/client-menu") {
        if (!accessToken) {
            return NextResponse.redirect(new URL("/login", request.url));
        }
    }
}
