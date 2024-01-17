/* eslint-disable */
// @ts-ignore
import { ReactElement, ReactNode } from 'react';

const localStorageMock = (function () {
  let store: Record<string, string> = {};

  return {
    getItem(key: keyof typeof store) {
      return store[key] || null;
    },
    setItem(key: keyof typeof store, value: string) {
      store[key] = value.toString();
    },
    removeItem(key: keyof typeof store) {
      delete store[key];
    },
    clear() {
      store = {};
    },
  };
})();
Object.defineProperty(window, 'localStorage', {
  value: localStorageMock,
});

global.matchMedia = global.matchMedia || function(query) {
  return {
    matches: false,
    addListener: function() {},
    removeListener: function() {},
    media: query,
    onchange: null,
    addEventListener: jest.fn(),
    removeEventListener: jest.fn(),
    dispatchEvent: jest.fn(),
  };
};
jest.mock('antd/es/layout/Sider', () => {
  return jest.fn(
    ({ children }: { children: ReactNode | ReactElement }) => children
  );
});

jest.mock('d3', () => {
  return jest.fn();
});

