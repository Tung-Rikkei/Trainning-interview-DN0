import { Injectable } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
@Injectable({
  providedIn: 'root'
})
export class UserService {
  constructor(
    private route: ActivatedRoute,
    private http: HttpClient
  ) {

  }
  apiUrl: string = `${environment.apiUrl}/users`

  createUser(payload: { [key: string]: any }): Observable<any> {
    return this.http.post(this.apiUrl, payload)
  }

  getUsers(): Observable<any> {
    return this.http.get(this.apiUrl, { params: this.route.snapshot.queryParams })
  }

  updateUser(payload: { [key: string]: any }): Observable<any> {
    return this.http.put(this.apiUrl, payload)
  }

  deleteUser(payload: number[] | Set<number>) {
    return this.http.delete(this.apiUrl, { body: { ids: [...payload] } })
  }
}
