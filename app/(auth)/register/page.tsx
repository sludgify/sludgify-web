"use client";
import React, { useState } from "react";
import Image from "next/image";
import { Lock } from "lucide-react";
import { useRouter } from "next/navigation";
import Link from "next/link";

export default function Page() {
    const router = useRouter();
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);
    const [registerData, setRegisterData] = useState({
        firstname: "",
        lastname: "",
        companyname: "",
        email: "",
        password: "",
        confirmpassword: "",
    });

    const handleRegister = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            const res = await fetch("/api/auth/login", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(registerData),
            });
            const data = await res.json();
            localStorage.setItem("user", JSON.stringify(data.user));
            if (!res.ok) {
                return alert(data.error);
            }
            setTimeout(() => {
                if (data.user.role === "user") {
                    router.push("/dashboard");
                }
                if (data.user.role === "admin") {
                    router.push("/admin");
                }
            }, 1000);
        } catch (e) {
            alert("Error logging in: " + e);
        }
    };
    return (
        <div className="bg-[url('/bg-register.jpg')] font-radley bg-no-repeat bg-cover bg-center grayscale-50 h-screen w-screen p-7">
            <div className="absolute top-7 left-7 flex items-center gap-2  text-white text-4xl ">
                <Image src={"/logo.svg"} width={50} height={50} alt="logo"></Image>
                <h1>Sludgify</h1>
            </div>
            <div className=" flex justify-end items-center mr-[10%]">
                <div className="bg-white right-0 space-y-2 rounded-[25px] p-12  w-[500px] h-[652px]">
                    <h1 className="text-4xl">Create Account</h1>
                    <form className="grid grid-cols-2 gap-2 " onSubmit={handleRegister}>
                        <div>
                            <label className="block text-sm text-gray-900 mb-2">First Name </label>
                            <input
                                value={registerData.firstname}
                                onChange={(e) => setRegisterData({ ...registerData, firstname: e.target.value })}
                                type="email"
                                className="w-full p-2 border border-primary rounded-md focus:outline-none"
                                required
                            />
                        </div>
                        <div>
                            <label className="block text-sm text-gray-900 mb-2">Last Name </label>
                            <input
                                value={registerData.lastname}
                                onChange={(e) => setRegisterData({ ...registerData, lastname: e.target.value })}
                                type="email"
                                className="w-full p-2 border border-primary rounded-md focus:outline-none"
                                required
                            />
                        </div>
                        <div>
                            <label className="block text-sm text-gray-900 mb-2">Company Name </label>
                            <input
                                value={registerData.companyname}
                                onChange={(e) => setRegisterData({ ...registerData, companyname: e.target.value })}
                                type="email"
                                className="w-full p-2 border border-primary rounded-md focus:outline-none"
                                required
                            />
                        </div>
                        <div>
                            <label className="block text-sm text-gray-900 mb-2">Email </label>
                            <input value={registerData.email} onChange={(e) => setRegisterData({ ...registerData, email: e.target.value })} type="email" className="w-full p-2 border border-primary rounded-md focus:outline-none" required />
                        </div>

                        <div>
                            <label className="block text-sm text-gray-900 mb-2">Create Password</label>
                            <div className="relative">
                                <input
                                    value={registerData.password}
                                    onChange={(e) => setRegisterData({ ...registerData, password: e.target.value })}
                                    type={showPassword ? "text" : "password"}
                                    className="w-full p-2 border border-primary rounded-md focus:outline-none"
                                    required
                                />
                                <button type="button" onClick={() => setShowPassword(!showPassword)} className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600">
                                    {showPassword ? <Lock className="h-5 w-5 text-primary" /> : <Lock className="h-5 w-5 text-primary" />}
                                </button>
                            </div>
                        </div>
                        <div>
                            <label className="block text-sm text-gray-900 mb-2">Confirm Password</label>
                            <div className="relative">
                                <input
                                    value={registerData.password}
                                    onChange={(e) => setRegisterData({ ...registerData, confirmpassword: e.target.value })}
                                    type={showConfirmPassword ? "text" : "password"}
                                    className="w-full p-2 border border-primary rounded-md focus:outline-none"
                                    required
                                />
                                <button type="button" onClick={() => setShowConfirmPassword(!showConfirmPassword)} className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600">
                                    {showConfirmPassword ? <Lock className="h-5 w-5 text-primary" /> : <Lock className="h-5 w-5 text-primary" />}
                                </button>
                            </div>
                        </div>

                        <Link href="#" className="text-sm text-primary col-span-2">
                            Forgot password?
                        </Link>

                        <button type="submit" className="w-full col-span-2 border border-primary text-primary  py-3 px-6 rounded-md ">
                            Save & Continue
                        </button>
                    </form>
                    <div className="my-3 flex items-center">
                        <div className="flex-1 border-t border-primary"></div>
                        <span className="px-4 text-sm text-gray-500">or</span>
                        <div className="flex-1 border-t border-primary"></div>
                    </div>
                    <button className="w-full bg-primary border border-primary text-secondary py-3 px-6 rounded-md  flex items-center justify-center">
                        <svg className="w-5 h-5 mr-3" viewBox="0 0 24 24">
                            <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" />
                            <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" />
                            <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" />
                            <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" />
                        </svg>
                        Continue with Google
                    </button>

                    <div className="flex items-center justify-center gap-1 mt-6">
                        <p>Already have an account?</p>
                        <Link href="/login" className="text-[#173863]">
                            Log in
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    );
}
