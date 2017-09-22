import { PhoneActions } from './app/app.actions';
import { rootReducer } from './store';

describe('phoneNumber reducer', () => {
  it('should handle initial state', () => {
    expect(
      rootReducer(undefined, { type: PhoneActions.LIST, payload: null})
    )
    .toEqual({phoneNumbers: [], err: ''});
  });

  it('should handle CREATE', () => {
    expect(
      rootReducer({phoneNumbers: ['1234567890'], err: ''}, {
        type: PhoneActions.CREATE, payload: '12345678'
      })
    )
    .toEqual({phoneNumbers: ['1234567890', '12345678'], err: ''});
  });

  it('should handle DELETE', () => {
    expect(
      rootReducer({phoneNumbers: ['1234567890'], err: ''}, {
        type: PhoneActions.DELETE,
        payload: '1234567890'
      })
    )
    .toEqual({phoneNumbers: [], err: ''});
  });

  it('should not add duplicate element to list', () => {
    expect(
      rootReducer({phoneNumbers: ['1234567890'], err: ''}, {
        type: PhoneActions.CREATE, payload: '1234567890'
      })
    )
    .toEqual({phoneNumbers: ['1234567890'], err: 'The supplied number already exists.'});
  });

  it('should update first element in list', () => {
    expect(
      rootReducer({phoneNumbers: ['1234567890', '1234', '43211'], err: ''}, {
        type: PhoneActions.UPDATE, payload: {oldNumber: '1234567890', newNumber: '4321'}
      })
    )
    .toEqual({phoneNumbers: ['4321', '1234', '43211'], err: ''});
  });

  it('should update middel element in list', () => {
    expect(
      rootReducer({phoneNumbers: ['1234567890', '1234', '43211'], err: ''}, {
        type: PhoneActions.UPDATE, payload: {oldNumber: '1234', newNumber: '4321'}
      })
    )
    .toEqual({phoneNumbers: ['1234567890', '4321', '43211'], err: ''});
  });

  it('should update last element in list', () => {
    expect(
      rootReducer({phoneNumbers: ['1234567890', '1234', '43211'], err: ''}, {
        type: PhoneActions.UPDATE, payload: {oldNumber: '43211', newNumber: '4321'}
      })
    )
    .toEqual({phoneNumbers: ['1234567890', '1234', '4321'], err: ''});
  });

  it('should update element in unary list', () => {
    expect(
      rootReducer({phoneNumbers: ['1234567890'], err: ''}, {
        type: PhoneActions.UPDATE, payload: {oldNumber: '1234567890', newNumber: '4321'}
      })
    )
    .toEqual({phoneNumbers: ['4321'], err: ''});
  });

  it('shouldnt allow duplicate elements in list', () => {
    expect(
      rootReducer({phoneNumbers: ['1234567890', '1234', '43211'], err: ''}, {
        type: PhoneActions.UPDATE, payload: {oldNumber: '1234567890', newNumber: '1234'}
      })
    )
    .toEqual({phoneNumbers: ['1234567890', '1234', '43211'], err: 'The supplied number already exists.'});
  });


});
