import { Injectable } from '@angular/core';
import { Action } from 'redux';

export class PhoneAction implements Action {
    type: any;
    payload: any;
}

@Injectable()
export class PhoneActions {
  static LIST = 'LIST';
  static FIND = 'FIND';
  static CREATE = 'CREATE';
  static DELETE = 'DELETE';
  static UPDATE = 'UPDATE';

  delete(phoneNumber: string): PhoneAction {
      return {type: PhoneActions.DELETE,
              payload: phoneNumber };
  }

  update(oldNumber: string, newNumber: string): PhoneAction {
      return {type: PhoneActions.UPDATE,
              payload: {oldNumber: oldNumber, newNumber: newNumber}  
            };
  }

  create(phoneNumber: string): PhoneAction {
    return { type: PhoneActions.CREATE,
             payload: phoneNumber
    };
  }

  list(): PhoneAction {
    return { type: PhoneActions.LIST,
             payload: null
     };
  }

  find(phone_id: string): PhoneAction {
    return { type: PhoneActions.FIND,
             payload: phone_id };
  }
}
