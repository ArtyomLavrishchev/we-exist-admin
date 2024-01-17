import Api from '../index';
import ordersApi from '../ordersApi';

describe('orders api', () => {
  test('fetchOrdersList', () => {
    const spy = jest.spyOn(Api, 'get');
    ordersApi.fetchOrdersList();
    expect(spy).toBeCalledTimes(1);
    expect(spy).toBeCalledWith('/account-orders-detailed/');
  });
});
