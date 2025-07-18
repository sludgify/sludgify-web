declare type service_name = {
    name: string;
    type: string;
};

declare type PaymentData = {
    amount: string;
    method: string;
}

declare type Transactions = {
    id: string;
    service_name: service_name;
    time: string;
    location: string;
    volume: number;
    status: "Waiting Payment" | "On Process" | "Completed" | "Failed";
};

declare type TrackingStep = {
    time: string;
    label: string;
    desc: string;
    icons: string[];
};

declare interface ErrorResponse {
    message: string;
    errors?: {
        [field: string]: string[];
    };
    data?: {
        [field: string]: string[];
    };
    token?: {
        [field: string]: string[];
    };
}

declare interface FormErrors {
    first_name: string[];
    last_name: string[];
    company_name: string[];
    email: string[];
    password: string[];
    confirm_password: string[];
    password_security: string[];
    password_match: string[];
}

declare interface FormData {
    first_name: string;
    last_name: string;
    company_name: string;
    email: string;
    password: string;
    confirm_password: string;
    provider: string;
}

declare interface User {
    id: string;
    first_name: string | null;
    last_name: string | null;
    email: string;
    password: string | null;
    created_at: number;
    updated_at: number;
    provider: string;
    avatar: string;
    is_active: boolean | null;
    position: string | null;
    company_name: string;
    phone_number: string | null;
    country: string | null;
    is_deleted: boolean | null;
    deleted_id: string | null;
    role: string | null;
}

declare interface Company {
    id: string | null;
    country: string | null;
    email: string | null;
    phone_number: string | null;
    position: string | null;
    address: string | null;
}

declare interface ApiResponse {
    user: User;
    message: string;
    errors?: {
        [field: string]: string[];
    };
    data?: {
        [field: string]: string[];
    };
}

declare interface User {
    id: string;
    username: string;
    email: string | null;
    is_active: boolean;
    updated_at: number;
    created_at: number;
    provider: string;
}
