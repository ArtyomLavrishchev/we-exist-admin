import Api from '../index';
import usersApi from '../usersApi';

describe('users api', () => {
  test('fetchAccountsList', () => {
    const spy = jest.spyOn(Api, 'get');
    usersApi.fetchAccountsList();
    expect(spy).toBeCalledTimes(1);
    expect(spy).toBeCalledWith('/accounts/');
  });
  test('fetchUserAccount', () => {
    const spy = jest.spyOn(Api, 'get');
    usersApi.fetchUserAccount('TestUser');
    expect(spy).toBeCalledTimes(1);
    expect(spy).toBeCalledWith('/user/accounts/TestUser/');
  });
});
