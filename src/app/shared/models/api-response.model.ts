export class ApiResponse<T> {
    isSuccess!: boolean;
    data!: T;
    statusCode!: number;
    message!: string;
}