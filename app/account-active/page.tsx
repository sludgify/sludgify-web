"use client";
import React, { useEffect, useState } from "react";
import Image from "next/image";
import { useRouter, useSearchParams } from "next/navigation";
import { toast } from "sonner";
import { AxiosError } from "axios";
import { useMediaQuery } from "react-responsive";

import { axiosInstance } from "@/lib/axios";
import { usePageEmailVerification } from "../api/account-active/AccountActive";

import {
    InputOTP,
    InputOTPGroup,
    InputOTPSlot,
} from "@/components/ui/input-otp";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";

export default function Page() {
    const { push } = useRouter();
    const searchParams = useSearchParams();
    const [token, setToken] = useState<string | null>(null);
    const [otp, setOtp] = useState("");
    const [isLoading, setIsLoading] = useState(false);

    const isXl = useMediaQuery({ minWidth: 1280 });
    const isLg = useMediaQuery({ minWidth: 768, maxWidth: 1279 });
    const isMd = useMediaQuery({ minWidth: 640, maxWidth: 767 });
    const isSm = useMediaQuery({ minWidth: 465, maxWidth: 639 });
    const isDefault = useMediaQuery({ maxWidth: 464 });

    useEffect(() => {
        const urlToken = searchParams.get("token");
        if (urlToken) {
            setToken(urlToken);
        }
    }, [searchParams]);

    const { data: dataPageEmailVerification } = usePageEmailVerification(token || "");

    const handleSubmit = async () => {
        try {
            const res = await axiosInstance.patch(
                `/sludgify/auth/account-active/activation/${token}`,
                { otp },
                { headers: { "Content-Type": "application/json" } }
            );
            toast.success("OTP verified successfully!");
            setTimeout(() => push("/login"), 2000);
        } catch (err) {
            const error = err as AxiosError<ErrorResponse>;
            toast.error(error.response?.data?.message || "Failed to verify OTP.");
            console.error("Verification error:", error);
        }
    };

    const handleResendVerification = async () => {
        setIsLoading(true);
        if (!dataPageEmailVerification?.user?.email) {
            toast.error("Email not found");
            setIsLoading(false);
            return;
        }

        try {
            const res = await axiosInstance.post(
                "/sludgify/auth/account-active/request",
                { email: dataPageEmailVerification.user.email },
                { headers: { "Content-Type": "application/json" } }
            );
            const newToken = res.data?.data?.token_web;
            toast.success("Verification code resent!");
            setTimeout(() => push(`/account-active/sent?token=${newToken}`), 1000);
        } catch (err) {
            const error = err as AxiosError<ErrorResponse>;
            toast.error(error.response?.data?.message || "Failed to resend OTP.");
            console.error("Resend error:", error);
        }
        setIsLoading(false);
    };

    // Responsive Rendering
    if (isSm || isMd || isDefault) {
        return (
            <div className="flex flex-col items-center justify-center h-screen px-6 text-center bg-white">
                <Image src="/logo.svg" width={40} height={40} alt="logo" />
                <h1 className="text-2xl font-bold mt-4">Enter 6 Digit Code That Sended to Your Email</h1>

                <InputOTP maxLength={6} value={otp} onChange={setOtp} className="mt-6">
                    <InputOTPGroup className="gap-2">
                        {[0, 1, 2, 3, 4, 5].map((index) => (
                            <InputOTPSlot
                                key={index}
                                index={index}
                                className="border border-gray-300 rounded-md w-10 h-12 text-xl text-center"
                            />
                        ))}
                    </InputOTPGroup>
                </InputOTP>

                <div className="flex justify-center gap-2 mt-4 text-sm">
                    <span>Didn’t receive code?</span>
                    <button onClick={isLoading ? () => { } : handleResendVerification} className="text-blue-500 underline">
                        Resend
                    </button>
                </div>

                <Button onClick={handleSubmit} className="mt-6 w-full">
                    Send Verification Code
                </Button>
            </div>
        );
    }

    if (isLg || isXl) {
        return (
            <div className="flex h-screen w-screen">
                <div className="w-1/2 flex flex-col justify-center items-center px-12">
                    <div className="absolute top-7 left-7 flex items-center gap-2 h-10 text-black">
                        <Image src={"/logo.svg"} width={isXl ? 50 : 30} height={isXl ? 50 : 30} alt="logo"></Image>
                        <h1 className={`${isXl ? 'text-4xl' : 'text-2xl'}`}>Sludgify</h1>
                        <Separator orientation="vertical" className="w-[10px] h-full bg-black mx-4" />
                        <p className={`${isXl ? 'text-md' : 'text-sm'}`}>
                            One Platform for ESG, Waste, <br /> and Carbon Impact
                        </p>
                    </div>

                    <h1 className={`${isXl ? "text-4xl" : "text-2xl"} text-center`}>
                        Enter 6 Digit Code That Sended to Your Email
                    </h1>
                    <br />

                    <InputOTP maxLength={6} value={otp} onChange={setOtp} className="mt-6">
                        <InputOTPGroup className="gap-3">
                            {[0, 1, 2, 3, 4, 5].map((index) => (
                                <InputOTPSlot
                                    key={index}
                                    index={index}
                                    className="border border-gray-300 rounded-md w-12 h-14 text-2xl text-center"
                                />
                            ))}
                        </InputOTPGroup>
                    </InputOTP>

                    <div className="flex justify-center gap-2 mt-4 text-sm">
                        <span>Didn’t receive code?</span>
                        <button onClick={isLoading ? () => { } : handleResendVerification} className="text-blue-500 underline">
                            Resend
                        </button>
                    </div>

                    <Button onClick={handleSubmit} className="mt-6 w-[80%]">
                        Send Verification Code
                    </Button>
                </div>

                <Image
                    src="/bg-auth.svg"
                    alt="Background"
                    width={800}
                    height={800}
                    className="absolute right-0 top-0 h-screen w-[50vw] object-cover"
                />
            </div>
        );
    }

    return null;
}
