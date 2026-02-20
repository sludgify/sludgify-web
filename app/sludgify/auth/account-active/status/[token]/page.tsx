import React from "react";

export default function page({ params }: { params: { token: string } }) {
    const token = params.token;

    return <div>
        <h1 className="text-2xl font-bold">Account Activation</h1>
        <p className="mt-4">Your activation token is: <strong>{token}</strong></p>
        <p className="mt-2">Please use this token to activate your account.</p>
        {/* Additional logic for activation can be added here */}
    </div>;
}
