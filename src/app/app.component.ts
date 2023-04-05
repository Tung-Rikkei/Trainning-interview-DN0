import { Component } from '@angular/core';
import { Store } from '@ngrx/store';
import { selectAuthLoading } from './store/selectors/auth-selector';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'angular-learn';
  authLoading$ = this.store.select(selectAuthLoading)
  constructor(
    private store: Store,
  ) { }
}
