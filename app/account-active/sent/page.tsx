"use client";
import { Card, CardFooter, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { usePageEmailVerification } from "@/app/api/account-active/AccountActive";
import { useSearchParams, useRouter } from "next/navigation";
import { axiosInstance } from "@/lib/axios";
import { AxiosError } from "axios";
import { useEffect, useState } from "react";
import { toast } from "sonner";
import { useMediaQuery } from "react-responsive";

interface ErrorResponse {
    message: string;
    errors?: {
        [field: string]: string[];
    };
}

const AccountActiveSentPage = () => {
    const { push } = useRouter();
    const isXl = useMediaQuery({ minWidth: 1280 });
    const isLg = useMediaQuery({ minWidth: 1024 });

    const searchParams = useSearchParams();
    const [token, setToken] = useState<string | null>(null);
    const [isLoading, setIsLoading] = useState(false);

    const { data: dataPageEmailVerification } = usePageEmailVerification(token || "");

    useEffect(() => {
        const tokenParam = searchParams.get("token");
        if (tokenParam) {
            setToken(tokenParam);
        }
    }, [searchParams]);

    const handleResendVerification = async () => {
        setIsLoading(true);
        if (!dataPageEmailVerification?.user?.email) {
            toast.error("Email not found");
            setIsLoading(false);
            return;
        }

        try {
            const response = await axiosInstance.post(
                "/sludgify/auth/account-active/request",
                {
                    email: dataPageEmailVerification?.user?.email,
                },
                { headers: { "Content-Type": "application/json" } }
            );
            const data = response.data;
            setTimeout(() => {
                push(`/account-active/sent?token=${data.data.token_web}`);
            }, 5000);
        } catch (err) {
            const error = err as AxiosError<ErrorResponse>;
            console.error("Terjadi kesalahan:", error);
        }
        setIsLoading(false);
    };

    if (isLg || isXl) {
        return (
            <div className="flex h-screen w-screen">
                {/* Left Panel */}
                <div className="w-1/2 flex flex-col justify-center items-center px-12">
                    {/* Logo dan Judul */}
                    <div className="absolute top-7 left-7 flex items-center gap-4 text-primary">
                        <div className="flex items-center gap-2">
                            <Image
                                src="/logo.svg"
                                width={isXl ? 50 : 30}
                                height={isXl ? 50 : 30}
                                alt="logo"
                                className="flex-shrink-0"
                            />
                            <h1 className={`${isXl ? "text-4xl" : "text-2xl"} leading-none`}>Sludgify</h1>
                        </div>
                    </div>

                    {/* Konten Card */}
                    <Card className="w-full max-w-md">
                        <CardHeader>
                            <CardTitle className="text-center text-2xl font-bold">
                                Verify your email address
                            </CardTitle>
                        </CardHeader>
                        <CardContent className="text-center">
                            <p className="text-sm">
                                {`We have sent a verification link to your email ${dataPageEmailVerification?.user?.email}`}
                            </p>
                        </CardContent>
                        <CardFooter className="flex justify-center">
                            <Button
                                onClick={isLoading ? () => { } : handleResendVerification}
                                className="bg-transparent text-black border border-black hover:bg-black hover:text-white"
                            >
                                Resend
                            </Button>
                        </CardFooter>
                    </Card>
                </div>

                {/* Background Image */}
                <Image
                    src="/bg-auth.svg"
                    alt="Background Auth"
                    width={800}
                    height={800}
                    className="absolute right-0 top-0 h-screen w-[50vw] object-cover"
                />
            </div>
        );
    }

    return (
        <div className="flex flex-col items-center justify-center min-h-screen px-6 py-12">
            <Image src="/logo.svg" width={40} height={40} alt="logo" />
            <h1 className="text-2xl font-semibold mt-4">Sludgify</h1>
            <p className="text-sm mt-2 text-center">
                {`We have sent a verification link to your email ${dataPageEmailVerification?.user?.email}`}
            </p>
            <Button
                onClick={isLoading ? () => { } : handleResendVerification}
                className="mt-6 bg-transparent text-black border border-black hover:bg-black hover:text-white"
            >
                Resend
            </Button>
        </div>
    );
};

export default AccountActiveSentPage;
