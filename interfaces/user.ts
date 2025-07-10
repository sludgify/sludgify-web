export interface User {
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
