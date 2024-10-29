
export class ApiResponseDto<T> {
    success: boolean;
    data: T;

    constructor(success: boolean, data: T) {
        this.success = success;
        this.data = data;
    }
}