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

interface SortObj {
    field: string,
    direction: string,
}

export type SortArr = SortObj[];

export type sortField = 'fullName' | 'age' | 'active'
export type sortType = string | null