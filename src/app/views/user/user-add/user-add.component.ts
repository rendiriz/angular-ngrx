import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { filter } from 'rxjs/operators';
import { Store, select } from '@ngrx/store';
import { Actions, ofType } from '@ngrx/effects';
import { FormGroup, FormControl, Validators } from '@angular/forms';

import { UserData } from '@models';

import {
  selectUsers,
  selectIsLoadingCreate,
  selectError
} from '@store/user/user.selectors';
import { fromUserActions } from '@store/user/user.actions';

@Component({
  selector: 'app-user-add',
  templateUrl: './user-add.component.html',
  styleUrls: ['./user-add.component.css']
})
export class UserAddComponent implements OnInit {

  myForm: FormGroup;

  data$: Observable<UserData[]>;
  isLoadingCreate$: Observable<boolean>;
  error$: Observable<string>;

  constructor(
    private router: Router,
    private actions$: Actions,
    private store: Store<any>
  ) {
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
  }

  get f() {
    return this.myForm.controls;
  }

  onSubmit() {
    const bodyUser = this.myForm.value;

    this.store.dispatch(
      fromUserActions.createUser({
        create: bodyUser
      })
    );

    this.isLoadingCreate$ = this.store.pipe(
      select(selectIsLoadingCreate)
    );
    this.error$ = this.store.pipe(
      select(selectError)
    );

    this.actions$
      .pipe(ofType(fromUserActions.createUserSuccess))
      .subscribe(() => {
        this.router.navigate(['']);
      });
  }
}
