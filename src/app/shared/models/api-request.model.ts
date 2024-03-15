export interface PagedRequest {
    limit: number,
    offset: number,
    search?: string,
    category?:string
}