import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Store, select } from '@ngrx/store';
import { Actions, ofType } from '@ngrx/effects';

import { UserData } from '@models';

import {
  selectUsers,
  selectIsLoadingList,
  selectError
} from '@store/user/user.selectors';
import { fromUserActions } from '@store/user/user.actions';

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.css']
})
export class UserListComponent implements OnInit {

  data$: Observable<UserData[]>;
  isLoadingList$: Observable<boolean>;
  error$: Observable<string>;

  constructor(
    private actions$: Actions,
    private store: Store<any>
  ) {
    this.data$ = this.store.pipe(
      select(selectUsers)
    );
    this.isLoadingList$ = this.store.pipe(
      select(selectIsLoadingList)
    );
    this.error$ = this.store.pipe(
      select(selectError)
    );
  }

  ngOnInit() {
    const params = '?_sort=id:desc';
    this.store.dispatch(
      fromUserActions.loadUsers({ params })
    );
  }

  onDelete(id: number) {

  }
}
