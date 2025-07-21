"use client";
import React, { useState } from "react";
import Image from "next/image";
import { InputOTP, InputOTPGroup, InputOTPSeparator, InputOTPSlot } from "@/components/ui/input-otp";
import { axiosInstance } from "@/lib/axios";
import { useSearchParams } from "next/navigation";
import { useEffect } from "react";
import { AxiosError } from "axios";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { usePageEmailVerification } from "../api/account-active/AccountActive";
import { toast } from "sonner";

export default function Page() {
    //This page is used to input otp
    const searchParams = useSearchParams();
    const { push } = useRouter();
    const [token, setToken] = useState<string | null>(null);
    const [otp, setOtp] = useState("");
    useEffect(() => {
        const urlToken = searchParams.get("token");
        if (urlToken) {
            setToken(urlToken);
        }
    }, [searchParams]);

    const handleSubmit = async () => {
        console.log("OTP yang dimasukkan:", otp);
        try {
            const res = await axiosInstance.patch(
                `/sludgify/auth/account-active/activation/${token}`,
                {
                    otp: otp,
                },
                { headers: { "Content-Type": "application/json" } }
            );
            const data = res.data;
            console.log("Response data:", data);

            setTimeout(() => {
                push(`/login`);
            }, 5000);
            return data;
        } catch (err) {
            const error = err as AxiosError<ErrorResponse>;
            console.error("Terjadi kesalahan:", error);
        }
    };

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
            <div className=" w-[50vw] flex flex-col justify-center items-center">
                <div className="w-[439px] flex space-y-4 flex-col justify-center items-center">
                    <div className="absolute top-7 left-7 flex items-center gap-2  text-primary text-4xl ">
                        <Image src={"/logo.svg"} width={50} height={50} alt="logo"></Image>
                        <h1>Sludgify</h1>
                    </div>
                    <h1 className="text-4xl text-center">Enter 6 Digit Code That Sended to Your Email</h1>
                    <InputOTP maxLength={6} value={otp} onChange={setOtp}>
                        <InputOTPGroup className="flex gap-2">
                            <InputOTPSlot index={0} className="border border-gray-300 rounded-md w-12 h-14 text-2xl text-center" />
                            <InputOTPSlot index={1} className="border border-gray-300 rounded-md w-12 h-14 text-2xl text-center" />
                            <InputOTPSlot index={2} className="border border-gray-300 rounded-md w-12 h-14 text-2xl text-center" />
                            <InputOTPSlot index={3} className="border border-gray-300 rounded-md w-12 h-14 text-2xl text-center" />
                            <InputOTPSlot index={4} className="border border-gray-300 rounded-md w-12 h-14 text-2xl text-center" />
                            <InputOTPSlot index={5} className="border border-gray-300 rounded-md w-12 h-14 text-2xl text-center" />
                        </InputOTPGroup>
                    </InputOTP>

                    <div className="flex gap-2">
                        <h1>Didn&apos;t receive code?</h1>
                        <button className="w-fit mx-auto bg-transparent text-black cursor-pointer" onClick={isLoading ? () => {} : handleResendVerification}>
                            Resend
                        </button>
                    </div>
                    <button onClick={handleSubmit} className="bg-primary text-white px-4 w-[413px] py-2 rounded-[10px]">
                        Send Verification Code
                    </button>
                </div>
            </div>
            <Image src={"/bg-auth.svg"} alt="Background Auth" width={800} height={800} className="absolute right-0 top-0 h-screen w-[50vw] object-cover" />
        </div>
    );
}
