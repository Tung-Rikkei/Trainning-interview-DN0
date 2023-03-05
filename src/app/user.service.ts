import { Injectable } from '@angular/core';
import { ResponseResult, sortField, sortType, User } from './interface';

const listFirstNameFake: string[] = ['Quang', 'Huy', 'Tung', 'Bao', 'Truong']
const listMiddleNameFake: string[] = ['Van', 'Minh', 'Thanh', 'Ngoc', 'Nhat']

function generateUser(): User[] {
  const data: User[] = [];
  for (let i = 1; i <= 100; i++) {
    data.push({
      no: i,
      fullName: `${listMiddleNameFake[Math.floor(Math.random() * (5))]} ${listFirstNameFake[Math.floor(Math.random() * (5))]}`,
      age: Math.floor(Math.random() * 100),
      active: true,
    })
  }
  return data
}

@Injectable({
  providedIn: 'root'
})
export class UserService {
  listUsers: User[] = generateUser();

  getUsers(page: number, pageSize: number, keyword?: string, sortField?: sortField, sortType?: sortType): ResponseResult {
    const filteredList: User[] =
      keyword
        ? this.listUsers.filter(user =>
          user.fullName.includes(keyword))
        : this.listUsers
    if (sortField && sortType !== undefined) {
      filteredList.sort((a, b) => {
        switch (sortType) {
          case 'ascend':
            return a[sortField] > b[sortField] ? 1 : -1
          case 'descend':
            return a[sortField] > b[sortField] ? -1 : 1
          default:
            return a.no - b.no
        }
      }
      )
    }
    // Check page's existance
    const resultPage: number = (page - 1) * pageSize < filteredList.length ? page : 1
    const returnUsers: User[] = filteredList.filter((user, index) =>
      index + 1 > (resultPage - 1) * pageSize
      && index < resultPage * pageSize
    )
    return {
      users: returnUsers,
      pagination: {
        page: resultPage,
        pageSize,
        total: filteredList.length
      }
    }
  }

  deleteUsers(deleteNo: Set<number>): void {
    this.listUsers = this.listUsers.filter(user => !deleteNo.has(user.no))
  }

  deleteUser(no: number): void {
    this.listUsers = this.listUsers.filter(user => user.no !== no)
  }
}
