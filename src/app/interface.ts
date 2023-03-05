export interface User {
    no: number,
    fullName: string,
    age: number,
    active: boolean,
}

export interface Pagination {
    page: number,
    total: number,
    pageSize: number,
}

export interface ResponseResult {
    users: User[],
    pagination: Pagination
}

export type sortField = 'no' | 'fullName' | 'age'
export type sortType = string | null