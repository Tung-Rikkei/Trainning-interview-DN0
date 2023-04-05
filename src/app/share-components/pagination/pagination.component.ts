import { Component, EventEmitter, Input, Output } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Pagination } from '../../interface';

@Component({
  selector: 'app-pagination',
  templateUrl: './pagination.component.html',
  styleUrls: ['./pagination.component.scss']
})
export class PaginationComponent {
  constructor(
    private route: ActivatedRoute,
    private router: Router,
  ) { }
  @Input() pagination: Pagination = {
    currentPage: this.route.snapshot.queryParams['page'] ?? 1,
    count: 1,
    pageSize: this.route.snapshot.queryParams['take'] ?? 10,
  };
  @Output() paginationChange = new EventEmitter<Pagination>();

  changeParams(): void {
    this.router.navigate(
      [],
      {
        relativeTo: this.route,
        queryParams: {
          page: this.pagination.currentPage,
          pageSize: this.pagination.pageSize
        }
      }
    )
  }

  changePage(page: number): void {
    this.pagination.currentPage = page
    this.paginationChange.emit({
      ...this.pagination,
      currentPage: page,
    })
    this.changeParams()
  }

  changePageSize(pageSize: number): void {
    this.pagination.pageSize = pageSize
    this.paginationChange.emit({
      ...this.pagination,
      pageSize: this.pagination.pageSize
    })
    this.changeParams()
  }
}
