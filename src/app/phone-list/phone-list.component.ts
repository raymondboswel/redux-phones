import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { CustomValidators } from 'ng2-validation';

import { select } from '@angular-redux/store';
import { NgRedux } from '@angular-redux/store';
import { PhoneActions } from '../app.actions';
import {IAppState} from '../../store';

class PhoneNumberVM {
  number: string;
  edit = false;
  constructor(phoneNumber: string) {
    this.number = phoneNumber;
  }
}

@Component({
  selector: 'app-phone-list',
  templateUrl: './phone-list.component.html',
  styleUrls: ['./phone-list.component.css']
})
export class PhoneListComponent implements OnInit, OnDestroy {

  phoneNumbers: Array<PhoneNumberVM>;
  newNumber = '';
  updatedNumber = '';
  subscription;
  errorSubscription;
  form: FormGroup;

  constructor(private ngRedux: NgRedux<IAppState>,
              private actions: PhoneActions) {
                this.subscription = ngRedux.select<Array<string>>('phoneNumbers')
                .subscribe(phoneNumbers => {
                  this.phoneNumbers = phoneNumbers.map(phoneNumber => new PhoneNumberVM(phoneNumber));
                });
                this.errorSubscription = ngRedux.select<string>('err')
                .subscribe(error => {
                  if (error != '') {
                    alert(error);
                    this.ngRedux.dispatch(this.actions.clearError());
                  }
                });

                this.form = new FormGroup({
                  field: new FormControl('', CustomValidators.phone)
              });
              }

  ngOnInit() {
  }

  delete(phoneNumber: string) {
    this.ngRedux.dispatch(this.actions.delete(phoneNumber));
  }

  updatePhoneNumber(phoneNumber: string, newPhoneNumber: string) {
    if (phoneNumber != newPhoneNumber) {
      this.ngRedux.dispatch(this.actions.update(phoneNumber, newPhoneNumber));
    } else {
      this.toggleEdit(new PhoneNumberVM(phoneNumber));
    }
  }

  createPhoneNumber(phoneNumber: string) {
    this.ngRedux.dispatch(this.actions.create(phoneNumber));
  }

  toggleEdit(phoneNumber: PhoneNumberVM) {
    this.updatedNumber = phoneNumber.number;
    this.phoneNumbers.map(p => {
      p.edit = false;
    });
    if (!phoneNumber.edit) {
      phoneNumber.edit = true;
    }
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

}
