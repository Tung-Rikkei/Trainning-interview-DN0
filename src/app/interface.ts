export interface User {
    no: number,
    id: number,
    fullName: string,
    age: number,
    isActive: boolean,
    dob: Date,
    username: string,
    password: string | number,
    firstName: string,
    lastName: string,
    email: string,
}

export interface Pagination {
    currentPage: number,
    count: number,
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

export type sortField = 'fullName' | 'age' | 'isActive'
export type sortType = string | null