import { Action } from 'redux';
import { PhoneActions } from './app/app.actions';
import { PhoneAction } from './app/app.actions';

export interface IAppState {
  phoneNumbers: Array<string>;
  err: string;
}

export const INITIAL_STATE: IAppState = {
  phoneNumbers: ['1234567890'],
  err: ''
};

export function rootReducer(lastState: IAppState = INITIAL_STATE, action: PhoneAction): IAppState {
  switch (action.type) {
    case PhoneActions.CREATE: return maybeAddElement(lastState, action.payload);
    case PhoneActions.DELETE: return { phoneNumbers: lastState.phoneNumbers.filter(phoneNumber => phoneNumber != action.payload), err: '' };
    case PhoneActions.UPDATE: return maybeUpdateElement(lastState, action.payload.oldNumber, action.payload.newNumber);
    case PhoneActions.CREATE: return { phoneNumbers: [...lastState.phoneNumbers, action.payload], err: ''};
    case PhoneActions.CLEAR_ERROR: return {phoneNumbers: lastState.phoneNumbers, err: ''};
  }

  // We don't care about any other actions right now.
  return lastState;
}

function maybeAddElement(state: IAppState, el: string): IAppState  {
  if (state.phoneNumbers.some(e => e == el)) {
    return {phoneNumbers: state.phoneNumbers, err: 'The supplied number already exists.'};
  } else {
    state.phoneNumbers = [...state.phoneNumbers, el];
    return {phoneNumbers: state.phoneNumbers, err: ''};
  }
}

function maybeUpdateElement(state: IAppState, oldNumber: string, newNumber: string): IAppState {
  if (state.phoneNumbers.some(number => number == newNumber)) {
    return {phoneNumbers: state.phoneNumbers, err: 'The supplied number already exists.'};
  } else {
    return {phoneNumbers: replaceElement(state.phoneNumbers, oldNumber, newNumber), err: ''};
  }
}

function replaceElement(array: Array<string>, oldEl: string, newEl: string): Array<string> {
  const targetIndex = array.findIndex(el => el === oldEl);
  return [...array.slice(0, targetIndex), newEl, ...array.slice(targetIndex + 1, array.length)];
}
