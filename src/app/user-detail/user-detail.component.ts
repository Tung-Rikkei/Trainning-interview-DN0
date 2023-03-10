import { Component, OnInit } from '@angular/core';
import { Pagination, ResponseResult, sortField, sortType, User } from '../interface';
import { UserService } from '../user.service';

@Component({
  selector: 'app-user-detail',
  templateUrl: './user-detail.component.html',
  styleUrls: ['./user-detail.component.scss']
})
export class UserDetailComponent implements OnInit {
  constructor(
    private userService: UserService
  ) { }
  listUsers: User[] = [];
  pagination: Pagination = {
    page: 1,
    total: 1,
    pageSize: 20,
  }
  searchValue: string = ''
  lastSearchValue: string = ''
  activeSearch: boolean = false
  setOfCheckedId = new Set<number>();
  checked = false;
  indeterminate = false;
  loading: boolean = false;
  isVisible: boolean = false;
  deleteType: "single" | "multi" = 'single'
  deleteItemNo: number = -1;

  getDisplayData(page: number, pageSize: number, keyword?: string, sortField?: sortField, sortType?: sortType): void {
    const response: ResponseResult = this.userService.getUsers(page, pageSize, keyword, sortField, sortType)
    this.listUsers = response.users
    this.pagination = response.pagination
    this.refreshCheckedStatus();
  }

  changePage(page: number): void {
    this.getDisplayData(page, this.pagination.pageSize, this.searchValue)
  }

  changePageSize(pageSize: number): void {
    this.getDisplayData(this.pagination.page, pageSize, this.searchValue)
  }

  searchByUserName(): void {
    this.activeSearch = !!this.searchValue
    console.log(this.activeSearch)
    if (this.activeSearch) {
      if (this.searchValue !== this.lastSearchValue) {
        this.getDisplayData(1, this.pagination.pageSize, this.searchValue)
        this.lastSearchValue = this.searchValue
        this.setOfCheckedId.clear()
      }
    } else {
      if (this.lastSearchValue !== '') {
        this.getDisplayData(1, this.pagination.pageSize)
        this.lastSearchValue = this.searchValue
        this.setOfCheckedId.clear()
      }
    }
  }

  updateCheckedSet(id: number, checked: boolean): void {
    if (checked) {
      this.setOfCheckedId.add(id);
    } else {
      this.setOfCheckedId.delete(id);
    }
  }

  refreshCheckedStatus(): void {
    this.checked = !!this.listUsers.length && this.listUsers.every(({ no }) => this.setOfCheckedId.has(no));
    this.indeterminate = this.listUsers.some(({ no }) => this.setOfCheckedId.has(no)) && !this.checked;
  }

  onItemChecked(id: number, checked: boolean): void {
    this.updateCheckedSet(id, checked);
    this.refreshCheckedStatus();
  }

  onAllChecked(checked: boolean): void {
    this.listUsers
      .forEach(({ no }) => this.updateCheckedSet(no, checked));
    this.refreshCheckedStatus();
  }

  deleteUsers(): void {
    this.userService.deleteUsers(this.setOfCheckedId)
    this.setOfCheckedId.clear()
    this.getDisplayData(this.pagination.page, this.pagination.pageSize, this.searchValue)
  }

  deleteUser(no: number): void {
    this.userService.deleteUser(no)
    this.setOfCheckedId.delete(no);
    this.getDisplayData(this.pagination.page, this.pagination.pageSize, this.searchValue)
  }

  openModal(type: 'single' | 'multi', no?: number): void {
    if (type === 'single' && no) this.deleteItemNo = no
    this.deleteType = type
    this.isVisible = true;
  }

  handleCancel(): void {
    this.isVisible = false;
    this.deleteItemNo = -1;
  }

  confirmDelete(): void {
    switch (this.deleteType) {
      case 'single':
        this.deleteUser(this.deleteItemNo)
        break;
      case 'multi':
        this.deleteUsers()
        break;
      default:
        break;
    }
    this.isVisible = false;
  }

  onTableSort(sortField: sortField, sortType: sortType) {
    console.log(sortField, sortType);
    this.getDisplayData(1, this.pagination.pageSize, this.searchValue, sortField, sortType)
  }

  ngOnInit(): void {
    this.getDisplayData(this.pagination.page, this.pagination.pageSize)
  }
}
