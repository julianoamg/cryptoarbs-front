export interface ApiResponse<T> {
    data: T;
    message?: string;
    error?: string;
}

export interface PaginatedResponse<T> {
    count: number;
    next: string | null;
    previous: string | null;
    results: T[];
} 