import { Action } from 'redux';
import { PhoneActions } from './app/app.actions';
import { PhoneAction } from './app/app.actions';

export interface IAppState {
  phoneNumbers: Array<string>;
}

export const INITIAL_STATE: IAppState = {
  phoneNumbers: ['1234567890'],
};

export function rootReducer(lastState: IAppState, action: PhoneAction): IAppState {
  switch (action.type) {
    case PhoneActions.CREATE: return { phoneNumbers: [...lastState.phoneNumbers, action.payload] };
    case PhoneActions.DELETE: return { phoneNumbers: lastState.phoneNumbers.filter(phoneNumber => phoneNumber != action.payload) };
    case PhoneActions.UPDATE: return { phoneNumbers: replaceElement(lastState.phoneNumbers, action.payload.oldNumber, action.payload.newNumber) };
    case PhoneActions.CREATE: return { phoneNumbers: [...lastState.phoneNumbers, action.payload]};
  }

  // We don't care about any other actions right now.
  return lastState;
}

function replaceElement(array: Array<string>, oldEl: string, newEl: string): Array<string> {
  const targetIndex = array.findIndex(el => el === oldEl);
  return [...array.slice(0, targetIndex), newEl, ...array.slice(targetIndex + 1, array.length)];
}
