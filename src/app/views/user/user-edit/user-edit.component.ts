import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { filter } from 'rxjs/operators';
import { Store, select } from '@ngrx/store';
import { Actions, ofType } from '@ngrx/effects';
import { FormGroup, FormControl, Validators } from '@angular/forms';

import { UserData } from '@models';

import {
  selectUser,
  selectIsLoadingRead,
  selectIsLoadingUpdate,
  selectError
} from '@store/user/user.selectors';
import { fromUserActions } from '@store/user/user.actions';

@Component({
  selector: 'app-user-edit',
  templateUrl: './user-edit.component.html',
  styleUrls: ['./user-edit.component.css']
})
export class UserEditComponent implements OnInit {

  myForm: FormGroup;
  id: number;

  data$: Observable<UserData[]>;
  isLoadingRead$: Observable<boolean>;
  isLoadingUpdate$: Observable<boolean>;
  error$: Observable<string>;

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private actions$: Actions,
    private store: Store<any>
  ) {
    this.id = this.route.snapshot.params['id'];
  }

  ngOnInit() {
    this.myForm = new FormGroup({
      first_name: new FormControl({ value: null, disabled: false }, [
        Validators.required,
        Validators.maxLength(100)
      ]),
      last_name: new FormControl({ value: null, disabled: false }, [
        Validators.required,
        Validators.maxLength(100)
      ]),
      email: new FormControl({ value: null, disabled: false }, [
        Validators.required,
        Validators.maxLength(100)
      ]),
    });

    this.getData();
  }

  get f() {
    return this.myForm.controls;
  }

  getData() {
    const params = '';
    this.store.dispatch(
      fromUserActions.loadUser({ id: this.id, params })
    );

    this.isLoadingRead$ = this.store.pipe(
      select(selectIsLoadingRead)
    );
    this.error$ = this.store.pipe(
      select(selectError)
    );

    this.store
      .pipe(
        select(selectUser, { id: this.id }),
        filter(val => val !== undefined)
      )
      .subscribe((result) => {
        this.setForm(result);
      });
  }

  setForm(data: UserData) {
    this.myForm.patchValue({
      first_name: data.first_name,
      last_name: data.last_name,
      email: data.email,
    });
  }

  onSubmit() {
    const bodyUser = this.myForm.value;

    this.store.dispatch(
      fromUserActions.updateUser({
        id: this.id,
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
        this.router.navigate(['']);
      });
  }
}
