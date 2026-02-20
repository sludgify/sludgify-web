'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import {
    Select,
    SelectTrigger,
    SelectValue,
    SelectContent,
    SelectItem,
} from '@/components/ui/select';
import Cookies from 'js-cookie';
import { AxiosInstance } from 'axios';
import { axiosInstance } from '@/lib/axios';

export default function DepositForm() {
    const { push } = useRouter();

    const [amount, setAmount] = useState('');
    const [paymentType, setPaymentType] = useState('bca');
    const [message, setMessage] = useState('');
    const [messageClass, setMessageClass] = useState('');

    const accessToken = Cookies.get('accessToken');

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        const value = parseFloat(amount);
        if (isNaN(value) || value <= 0) {
            setMessage('Masukkan jumlah deposit yang valid.');
            setMessageClass('text-red-500');
            return;
        }

        try {
            const response = await axiosInstance.post('/sludgify/transaction/carbon-credit/bca', { amount: value, type: paymentType }, { headers: { Authorization: `Bearer ${accessToken}` } });

            const data = response.data

            if (response.status === 201) {
                setMessage(`Deposit berhasil: ${data.message}`);
                setMessageClass('text-green-600');
                setAmount('');
                push(`/pembayaran?unique_code=${data.data.unique_code}`);
            } else {
                setMessage(`Gagal: ${data.message || 'Terjadi kesalahan.'}`);
                setMessageClass('text-red-500');
            }
        } catch (err) {
            setMessage('Gagal menghubungi server.');
            setMessageClass('text-red-500');
            console.error(err);
        }
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-gray-100 to-white flex items-center justify-center px-4">
            <div className="w-full max-w-md bg-white rounded-2xl shadow-xl p-8">
                <div className="text-center mb-6">
                    <div className="text-4xl text-green-500 mb-2">💸</div>
                    <h2 className="text-2xl font-semibold text-gray-800">Form Deposit</h2>
                    <p className="text-gray-500 text-sm mt-1">Masukkan jumlah yang ingin Anda depositkan</p>
                </div>

                <form onSubmit={handleSubmit} className="space-y-4">
                    <div>
                        <label className="block text-gray-700 font-medium mb-2">Metode Pembayaran</label>
                        <Select value={paymentType} onValueChange={setPaymentType}>
                            <SelectTrigger className="w-full px-4 py-3 border border-gray-300 rounded-lg text-lg focus:outline-none focus:ring-2 focus:ring-green-400">
                                <SelectValue placeholder="Pilih metode pembayaran" />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectItem value="bca">BCA Virtual Account</SelectItem>
                                <SelectItem value="qris">QRIS</SelectItem>
                            </SelectContent>
                        </Select>
                    </div>

                    <div>
                        <label htmlFor="amount" className="block text-gray-700 font-medium mb-2">
                            Total Deposit (Rp)
                        </label>
                        <input
                            type="number"
                            id="amount"
                            name="amount"
                            min="0"
                            required
                            placeholder="Masukkan jumlah"
                            value={amount}
                            onChange={(e) => setAmount(e.target.value)}
                            className="w-full px-4 py-3 border border-gray-300 rounded-lg text-lg focus:outline-none focus:ring-2 focus:ring-green-400"
                        />
                    </div>

                    <button
                        type="submit"
                        className="w-full bg-green-500 hover:bg-green-600 text-white text-lg font-semibold py-3 rounded-lg transition duration-200"
                    >
                        Bayar Sekarang
                    </button>
                </form>

                {message && <p className={`text-center mt-4 text-sm ${messageClass}`}>{message}</p>}
            </div>
        </div>
    );
}
