import type { NextConfig } from "next";

const nextConfig: NextConfig = {
    /* config options here */
    images: {
        domains: ["res.cloudinary.com", "127.0.0.1", "localhost", 'api.sandbox.midtrans.com', 'lh3.googleusercontent.com'],
    },
};

export default nextConfig;
