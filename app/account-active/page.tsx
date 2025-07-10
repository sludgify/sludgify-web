"use client";
import React, { useState } from "react";
import Image from "next/image";
import { InputOTP, InputOTPGroup, InputOTPSeparator, InputOTPSlot } from "@/components/ui/input-otp";
import { axiosInstance } from "@/lib/axios";
import { useSearchParams } from "next/navigation";
import { useEffect } from "react";
import { AxiosError } from "axios";
import { useRouter } from "next/navigation";

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
    return (
        <div className="flex font-radley h-screen w-screen p-7">
            <div className="flex flex-col space-y-4 justify-center items-center w-[50vw]">
                <div className="absolute top-7 left-7 flex items-center gap-2  text-primary text-4xl ">
                    <Image src={"/logo.svg"} width={50} height={50} alt="logo"></Image>
                    <h1>Sludgify</h1>
                </div>
                <h1>Enter OTP</h1>
                <InputOTP maxLength={6} value={otp} onChange={setOtp}>
                    <InputOTPGroup>
                        <InputOTPSlot index={0} />
                        <InputOTPSlot index={1} />
                        <InputOTPSlot index={2} />
                    </InputOTPGroup>
                    <InputOTPSeparator />
                    <InputOTPGroup>
                        <InputOTPSlot index={3} />
                        <InputOTPSlot index={4} />
                        <InputOTPSlot index={5} />
                    </InputOTPGroup>
                </InputOTP>
                <button onClick={handleSubmit} className="bg-primary text-white px-4 py-2 rounded">
                    Submit OTP
                </button>
            </div>
            <Image src={"/bg-auth.svg"} alt="Background Auth" width={800} height={800} className="absolute right-0 top-0 h-screen w-[50vw] object-cover" />
        </div>
    );
}
