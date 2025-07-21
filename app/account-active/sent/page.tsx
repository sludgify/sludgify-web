"use client";
import { Card, CardFooter, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import Image from "next/image";
// import Email from "@/../public/email.png";
import { Button } from "@/components/ui/button";
import { usePageEmailVerification } from "@/app/api/account-active/AccountActive";
import { useSearchParams } from "next/navigation";
import { axiosInstance } from "@/lib/axios";
import { AxiosError } from "axios";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { toast } from "sonner";

interface ErrorResponse {
    message: string;
    errors?: {
        [field: string]: string[];
    };
}

const AccountActiveSentPage = () => {
    const { push } = useRouter();

    const searchParams = useSearchParams();
    const [token, setToken] = useState<string | null>(null);
    const [isLoading, setIsLoading] = useState(false);

    useEffect(() => {
        const urlToken = searchParams.get("token");
        if (urlToken) {
            setToken(urlToken);
        }
    }, [searchParams]);

    const { data: dataPageEmailVerification } = usePageEmailVerification(token || "");

    const handleResendVerification = async () => {
        setIsLoading(true);
        if (!dataPageEmailVerification?.user?.email) {
            toast.error("email not found");
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

    return (
        <div className="flex font-radley h-screen w-screen p-7">
            <div className="flex flex-col justify-center items-center w-[50vw]">
                <div className="absolute top-7 left-7 flex items-center gap-2  text-primary text-4xl ">
                    <Image src={"/logo.svg"} width={50} height={50} alt="logo"></Image>
                    <h1>Sludgify</h1>
                </div>
                <Card className="sm:w-[50%] md:w-[60%] lg:w-[40%] xl:w-[30%]">
                    <CardHeader>
                        <CardTitle className="flex flex-col justify-center items-center">
                            {/* <Image src={Email} alt="Email" width={100} height={100} /> */}
                            <h1 className="text-2xl font-bold">Verify your email address</h1>
                        </CardTitle>
                    </CardHeader>
                    <hr className="w-[75%] mx-auto text-gray-500" />
                    <CardContent className="w-full text-center">
                        <p className="text-sm">{`we have sent a verification link to your email ${dataPageEmailVerification?.user?.email}`}</p>
                    </CardContent>
                    <CardFooter>
                        <Button className="w-[50%] mx-auto bg-transparent text-black border border-black hover:bg-black hover:text-white cursor-pointer" onClick={isLoading ? () => {} : handleResendVerification}>
                            Resend
                        </Button>
                    </CardFooter>
                </Card>
            </div>
            <Image src={"/bg-auth.svg"} alt="Background Auth" width={800} height={800} className="absolute right-0 top-0 h-screen w-[50vw] object-cover" />
        </div>
    );
};

export default AccountActiveSentPage;
