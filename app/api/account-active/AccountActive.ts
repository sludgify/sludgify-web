import { useQuery } from "@tanstack/react-query";
import { axiosInstance } from "@/lib/axios";

export const usePageEmailVerification = (token: string) => {
    return useQuery({
        queryKey: ["page-email-verification", token],
        queryFn: async () => {
            const response = await axiosInstance.get<ApiResponse>(`/sludgify/auth/account-active/status/${token}`, {
                params: { token },
                headers: {
                    "Content-Type": "application/json",
                },
            });
            return response.data;
        },
        enabled: !!token,
        refetchOnWindowFocus: false,
        retry: false,
    });
};

export const useUserVerification = (token: string) => {
    return useQuery({
        queryKey: ["page-email-verification", token],
        queryFn: async () => {
            const response = await axiosInstance.get<ApiResponse>(`/short.me/auth/account-active/verify/${token}`, {
                headers: {
                    "Content-Type": "application/json",
                },
            });
            return response.data;
        },
        refetchOnWindowFocus: false,
        retry: false,
    });
};
