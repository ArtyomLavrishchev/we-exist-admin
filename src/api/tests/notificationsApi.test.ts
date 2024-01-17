import Api from '../index';
import notificationsApi from '../notificationsApi';

describe('notifications api', () => {
  test('fetchNotifications', () => {
    const spy = jest.spyOn(Api, 'get');
    notificationsApi.fetchNotifications();
    expect(spy).toBeCalledTimes(1);
    expect(spy).toBeCalledWith('/notifications/');
  });
  test('readNotice', () => {
    const spy = jest.spyOn(Api, 'patch');
    const read_at = new Date().toISOString();
    notificationsApi.readNotice(1, read_at);
    expect(spy).toBeCalledTimes(1);
    expect(spy).toBeCalledWith('/notifications/1/', {
      read_at,
    });
  });
  test('openNotice', () => {
    const spy = jest.spyOn(Api, 'get');
    notificationsApi.openNotice(1);
    expect(spy).toBeCalledTimes(1);
    expect(spy).toBeCalledWith('/notifications/1/');
  });
});
