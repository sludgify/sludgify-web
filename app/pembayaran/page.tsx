'use client';
import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { axiosInstance } from "@/lib/axios";
import { useMutation } from "@tanstack/react-query";
import { AxiosError } from "axios";
import { useFormik } from "formik";

export default function PaymentForm() {
    const [amount, setAmount] = useState("");

    const { mutate } = useMutation({
        mutationFn: async (formData: PaymentData) => {
            const response = await axiosInstance.post("/sludgify/login", formData);
            return response.data;
        },

        onError: (error) => {
            const err = error as AxiosError<ErrorResponse>;
        },

        onSuccess: (data) => {
            console.log(data);
        },
    });

    const formik = useFormik({
        initialValues: {
            amount: "",
            method: ''
        },

        onSubmit: (values, { setSubmitting }) => {
            try {
                const { amount, method } = values;
                mutate({
                    amount,
                    method
                });
            } catch (error) {
                console.error("Terjadi kesalahan:", error);
            } finally {
                setSubmitting(false);
            }
        },
    });

    return (
        <Card className="max-w-md mx-auto p-6 shadow-lg rounded-2xl">
            <CardContent className="space-y-6">
                <form onSubmit={formik.handleSubmit} className="space-y-6">
                    <div>
                        <Label htmlFor="amount" className="text-base font-medium">
                            Jumlah Pembayaran
                        </Label>
                        <Input
                            id="amount"
                            type="number"
                            min={0}
                            placeholder="Contoh: 50000"
                            value={amount}
                            onChange={(e) => setAmount(e.target.value)}
                            className="mt-2"
                            required
                        />
                    </div>

                    <div>
                        <Label className="text-base font-medium">Metode Pembayaran</Label>
                        <div className="mt-2 p-3 rounded-lg bg-gray-100 text-gray-800 font-semibold">
                            QRIS
                        </div>
                    </div>

                    <Button type="submit" className="w-full">
                        Bayar Sekarang
                    </Button>
                </form>
            </CardContent>
        </Card>
    );
}
