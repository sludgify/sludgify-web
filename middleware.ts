import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { axiosInstance } from "@/lib/axios";
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
        return response.data?.data;
    } catch (err) {
        const error = err as AxiosError<ErrorResponse>;
        console.error("❌ Error getAccountActivePage:", error);
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
        console.error("❌ Error getAccountActiveEmail:", error);
    }
};

const getUserCompany = async (accessToken: string, etag?: string) => {
    try {
        const headers: Record<string, string> = {
            Authorization: `Bearer ${accessToken}`,
        };
        if (etag) headers["If-None-Match"] = etag;

        const response = await axiosInstance.get(`/sludgify/company-information`, {
            headers,
            validateStatus: () => true,
        });

        return response;
    } catch (err) {
        const error = err as AxiosError<ErrorResponse>;
        console.error("❌ Error getUserCompany:", error);
    }
};

const getUserMe = async (accessToken: string, etag?: string) => {
    try {
        const headers: Record<string, string> = {
            Authorization: `Bearer ${accessToken}`,
        };
        if (etag) headers["If-None-Match"] = etag;

        const response = await axiosInstance.get(`/sludgify/@me`, {
            headers,
            validateStatus: () => true,
        });

        return response;
    } catch (err) {
        const error = err as AxiosError<ErrorResponse>;
        console.error("❌ Error getUserMe:", error);
    }
};

export async function middleware(request: NextRequest) {
    const url = request.nextUrl;
    const accessToken = request.cookies.get("accessToken")?.value;
    const clientETag = request.cookies.get("me-etag")?.value;
    const fromRedirect = url.searchParams.get("fromRedirect");

    if (url.pathname === "/account-active" || url.pathname === "/account-active/sent") {
        const token = url.searchParams.get("token");
        if (!token) return NextResponse.redirect(new URL("/login", request.url));

        const data =
            url.pathname === "/account-active"
                ? await getAccountActiveEmail(token)
                : await getAccountActivePage(token);

        if (!data) return NextResponse.redirect(new URL("/login", request.url));
    }

    if (url.pathname.startsWith("/client-menu")) {
        if (!accessToken) return NextResponse.redirect(new URL("/login", request.url));

        try {
            const headers: Record<string, string> = {
                Authorization: `Bearer ${accessToken}`,
            };
            if (clientETag) headers["If-None-Match"] = clientETag;

            const responseUserMe = await getUserMe(accessToken, clientETag);

            if (!responseUserMe) {
                throw new Error("❌ getUserMe returned null/undefined");
            }

            const respUserMe = responseUserMe.data;

            let response: NextResponse = NextResponse.next();

            if (responseUserMe.status === 200) {
                console.log("✅ Validating /@me", respUserMe.data);
                const newETag = responseUserMe.headers["etag"];
                console.log("newETag", newETag);
                const newUrl = request.nextUrl;
                newUrl.searchParams.delete("fromRedirect");

                response = NextResponse.redirect(newUrl);

                if (newETag) {
                    response.cookies.set("me-etag", newETag, { httpOnly: false });
                    response.cookies.set("me-data", JSON.stringify(respUserMe.data), {
                        httpOnly: false,
                    });
                }
            } else if (responseUserMe.status === 429) {
                console.warn("⚠️ Rate limited, skip logout.");
                return response;
            } else if (responseUserMe.status !== 304) {
                const redirect = NextResponse.redirect(new URL("/login", request.url));
                redirect.cookies.delete("accessToken");
                redirect.cookies.delete("me-etag");
                redirect.cookies.delete("company-etag");
                return redirect;
            }

            const companyETag = request.cookies.get("company-etag")?.value;
            const companyResp = await getUserCompany(accessToken, companyETag);

            if (companyResp?.status === 200) {
                const newCompanyETag = companyResp.headers["etag"];
                response.cookies.set("company-etag", newCompanyETag ?? "", { httpOnly: false });
                response.cookies.set("company-data", JSON.stringify(companyResp.data?.data ?? {}), {
                    httpOnly: false,
                });
            }

            return response;
        } catch (err) {
            console.error("❌ Error validating /@me", err);
            const response = NextResponse.redirect(new URL("/login", request.url));
            response.cookies.delete("accessToken");
            response.cookies.delete("me-etag");
            return response;
        }
    }

    if (url.pathname === "/login" || url.pathname === "/register") {
        if (accessToken && fromRedirect !== "true") {
            const redirectUrl = new URL("/client-menu", request.url);
            redirectUrl.searchParams.set("fromRedirect", "true");
            return NextResponse.redirect(redirectUrl);
        }
    }

    return NextResponse.next();
}

export const config = {
    matcher: ["/account-active/:path*", "/client-menu/:path*", "/login", "/register"],
};
