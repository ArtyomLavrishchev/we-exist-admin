import axios from 'axios';

import Api from '../index';
import authApi from '../authApi';

describe('auth api', () => {
  const spy = jest.spyOn(Api, 'post');
  test('login', () => {
    authApi.login({ username: 'test', password: 'test' });
    expect(spy).toBeCalledTimes(1);
    expect(spy).toBeCalledWith('/token/', {
      username: 'test',
      password: 'test',
    });
  });
  test('refresh', () => {
    const spy = jest.spyOn(axios, 'post');
    authApi.refresh('test');
    expect(spy).toBeCalledTimes(1);
    expect(spy).toBeCalledWith(
      `${import.meta.env.VITE_BACKEND_URL || ''}/token/refresh/`,
      {
        refresh: 'test',
      }
    );
  });
});
