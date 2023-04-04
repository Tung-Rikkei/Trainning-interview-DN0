import { Component, OnInit } from '@angular/core';
import { Pagination, sortField, sortType, User, SortArr } from '../../interface';
import { UserService } from '../../services/user/user.service';
import { Router } from '@angular/router';
import { debounce } from 'lodash'
import { ActivatedRoute } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { differenceInCalendarDays } from 'date-fns';
import { ComponentCanDeactivate } from 'src/app/component-can-deactivate';
import { debounceTime, switchMap } from 'rxjs';

@Component({
  selector: 'app-user-detail',
  templateUrl: './user-detail.component.html',
  styleUrls: ['./user-detail.component.scss']
})
export class UserDetailComponent extends ComponentCanDeactivate implements OnInit {
  constructor(
    private userService: UserService,
    private router: Router,
    private route: ActivatedRoute,
    private fb: FormBuilder,
  ) { super() }
  listUsers: User[] = [];
  currentEditUser: any
  pagination: Pagination = {
    currentPage: this.route.snapshot.queryParams['page'] ?? 1,
    count: 1,
    pageSize: this.route.snapshot.queryParams['take'] ?? 10,
  }
  searchValue: string = this.route.snapshot.queryParams['keyword'] ?? ''
  lastSearchValue: string = this.searchValue
  activeSearch: boolean = false
  setOfCheckedId = new Set<number>();
  checked = false;
  indeterminate = false;
  loading: boolean = false;
  isVisible: boolean = false;
  deleteType: "single" | "multi" | "addUser" | "edit" = 'single'
  deleteItemNo: number[] = [];
  sortArr: SortArr = []
  addUserForm: FormGroup = this.fb.group({
    username: ['', Validators.compose([Validators.required, Validators.maxLength(255), Validators.pattern(/^[A-Za-z]+$/)])],
    password: ['', Validators.required,],
    firstName: ['', Validators.compose([Validators.required, Validators.maxLength(255), Validators.pattern(/^[A-Za-z]+$/)])],
    lastName: ['', Validators.compose([Validators.required, Validators.maxLength(255), Validators.pattern(/^[A-Za-z]+$/)])],
    email: ['', Validators.compose([Validators.required, Validators.pattern(/^\w+@[a-zA-Z_]+?\.[a-zA-Z]{2,3}$/)])],
    dob: new Date(),
  });
  isVisibleAdd: boolean = false
  editUserForm: FormGroup = this.fb.group({
    username: ['', Validators.compose([Validators.required, Validators.maxLength(255), Validators.pattern(/^[A-Za-z]+$/)])],
    password: ['', Validators.required,],
    firstName: ['', Validators.compose([Validators.required, Validators.maxLength(255), Validators.pattern(/^[A-Za-z]+$/)])],
    lastName: ['', Validators.compose([Validators.required, Validators.maxLength(255), Validators.pattern(/^[A-Za-z]+$/)])],
    email: ['', Validators.compose([Validators.required, Validators.pattern(/^\w+@[a-zA-Z_]+?\.[a-zA-Z]{2,3}$/)])],
    dob: new Date(),
    id: 0,
  });
  isVisibleEdit: boolean = false
  loadingModal: boolean = false
  isEdit: boolean = false

  disabledDate = (current: Date): boolean =>
    // Can not select days before today and today
    differenceInCalendarDays(current, new Date()) > 0;

  handleOk() { }
  submitForm(): void {
    this.loadingModal = true
    this.userService.createUser({ ...this.addUserForm.value }).subscribe(() => {
      this.loadingModal = false;
      this.isVisibleAdd = false;
      this.isEdit = false
      this.addUserForm.reset();
      this.getDisplayData()
    })
  }
  editUser(): void {
    this.loadingModal = true;
    this.userService.updateUser({ ...this.editUserForm.value }).subscribe(() => {
      this.loadingModal = false;
      this.isVisibleEdit = false;
      this.getDisplayData()
    })
  }
  closeAddUserModal() {
    if (this.loadingModal) return
    this.isVisibleAdd = false;
  }
  closeEditUserModal() {
    console.log('call close edit modal')
    this.isVisibleEdit = false;
  }

  getDisplayData(): void {
    this.loading = true
    const sortParams = this.sortArr.map((item, index) => {
      return `sorts[${index}].[field]=${item.field}&sorts[${index}].[direction]=${item.direction}`;
    }).join('&');
    const currentPageParams = this.pagination.currentPage ? `page=${this.pagination.currentPage}` : ''
    const pageSizeParams = this.pagination.pageSize ? `take=${this.pagination.pageSize}` : ''
    const searchValue = this.searchValue ? `keyword=${this.searchValue}` : ''
    const queryParams = [sortParams, currentPageParams, pageSizeParams, searchValue].filter(param => param).join('&')

    this.router.navigateByUrl(`/users?${queryParams}`)
  }

  searchByUserName(): void {
    this.activeSearch = !!this.searchValue
    const search = (): void => {
      if (this.activeSearch) {
        if (this.searchValue !== this.lastSearchValue) {
          this.getDisplayData()
          this.lastSearchValue = this.searchValue
          this.setOfCheckedId.clear()
        }
      } else {
        if (this.lastSearchValue !== '') {
          this.getDisplayData()
          this.lastSearchValue = this.searchValue
          this.setOfCheckedId.clear()
        }
      }
    }
    debounce(search, 300)()
  }

  updateCheckedSet(id: number, checked: boolean): void {
    if (checked) {
      this.setOfCheckedId.add(id);
    } else {
      this.setOfCheckedId.delete(id);
    }
  }

  refreshCheckedStatus(): void {
    this.checked = !!this.listUsers.length && this.listUsers.every(({ id }) => this.setOfCheckedId.has(id));
    this.indeterminate = this.listUsers.some(({ id }) => this.setOfCheckedId.has(id)) && !this.checked;
  }

  onItemChecked(id: number, checked: boolean): void {
    this.updateCheckedSet(id, checked);
    this.refreshCheckedStatus();
  }

  onAllChecked(checked: boolean): void {
    this.listUsers
      .forEach(({ id }) => this.updateCheckedSet(id, checked));
    this.refreshCheckedStatus();
  }

  deleteUsers(): void {
    this.setOfCheckedId.clear()
    this.getDisplayData()
  }

  deleteUser(no: number): void {
    this.setOfCheckedId.delete(no);
    this.getDisplayData()
  }

  openModal(type: 'single' | 'multi' | 'addUser' | 'edit', no?: number): void {
    if (type === 'single' && no) this.deleteItemNo = [no]
    if (type === 'addUser') {
      this.isVisibleAdd = true
      return
    }
    if (type === 'edit' && no) {
      const user = this.listUsers.find(user => user.id === no)
      this.currentEditUser = user
      this.editUserForm.patchValue({
        username: user?.username,
        password: user?.password,
        firstName: user?.firstName,
        lastName: user?.lastName,
        email: user?.email,
        dob: user?.dob,
        id: no
      });
      this.isVisibleEdit = true
      return
    }
    this.deleteType = type
    this.isVisible = true;
  }

  handleCancel(): void {
    this.isVisible = false;
    this.deleteItemNo = [];
  }

  confirmDelete(): void {
    this.userService.deleteUser(this.deleteItemNo.length ? this.deleteItemNo : this.setOfCheckedId).subscribe(() => {
      this.getDisplayData()
      this.deleteItemNo = []
      this.setOfCheckedId.clear()
    })
    this.isVisible = false;
  }

  onTableSort(sortField: sortField, sortType: sortType) {
    const indexOfField = this.sortArr.findIndex(sortObj => sortObj.field === sortField);
    if (indexOfField !== -1) {
      if (sortType === null) {
        this.sortArr.splice(indexOfField, 1);
      } else {
        this.sortArr[indexOfField].direction = sortType.slice(0, -3);
      }
    } else {
      if (sortType !== null) {
        this.sortArr.push({
          field: sortField,
          direction: sortType.slice(0, -3)
        })
      }
    }
    this.getDisplayData()
  }

  ngOnInit(): void {
    const initialValue = this.addUserForm.value
    this.addUserForm.valueChanges.subscribe(() => {
      this.isEdit = Object.keys(initialValue).some(key => this.addUserForm.value[key] !=
        initialValue[key])
    });
    this.route.queryParams.pipe(
      // debounceTime(300),
      switchMap(() => {
        this.loading = true;
        return this.userService
          .getUsers()
      })
    )
      .subscribe((data: any) => {
        let listUser = data.data as User[]
        console.log('after finishing: ', listUser)
        listUser = listUser.map((user, index) => ({
          ...user,
          no: index + 1 + (this.pagination.currentPage - 1) * this.pagination.pageSize
        }))
        this.listUsers = listUser
        this.pagination.currentPage = data.currentPage
        this.pagination.count = data.count
        this.loading = false
        this.refreshCheckedStatus();
      })
  }

  canDeactivate(): boolean {
    return !this.isEdit
  }
}
