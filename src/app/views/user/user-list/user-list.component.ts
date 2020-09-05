import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { filter } from 'rxjs/operators';
import { Store, select } from '@ngrx/store';
import { Actions, ofType } from '@ngrx/effects';

import { UserData } from '@models';

import {
  selectUsers,
  selectIsLoadingList,
  selectIsLoadingUpdate,
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
  isLoadingUpdate$: Observable<boolean>;
  error$: Observable<string>;

  constructor(
    private router: Router,
    private actions$: Actions,
    private store: Store<any>
  ) {}

  ngOnInit() {
    this.getData();
  }

  getData() {
    const params = '?is_active=true&_sort=id:desc';
    this.store.dispatch(
      fromUserActions.loadUsers({ params })
    );

    this.isLoadingList$ = this.store.pipe(
      select(selectIsLoadingList)
    );
    this.error$ = this.store.pipe(
      select(selectError)
    );

    this.data$ = this.store.pipe(
      select(selectUsers),
      filter(val => val.length !== 0)
    );
  }

  onDelete(id: number) {
    const bodyUser = {
      is_active: false
    };

    this.store.dispatch(
      fromUserActions.updateUser({
        id,
        update: bodyUser
      })
    );

    this.isLoadingUpdate$ = this.store.pipe(
      select(selectIsLoadingUpdate)
    );
    this.error$ = this.store.pipe(
      select(selectError)
    );

    this.actions$
      .pipe(ofType(fromUserActions.updateUserSuccess))
      .subscribe(() => {
        this.getData();
      });
  }
}
