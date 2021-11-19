import {MMKV} from 'react-native-mmkv';

enum StorageKey {
  JWTToken = 'JWTToken',
}

const storage = new MMKV();

export const Storage = {
  isTokenSet: storage.contains(StorageKey.JWTToken),
  getToken: () => storage.getString(StorageKey.JWTToken),
  setToken: (token: string) => storage.set(StorageKey.JWTToken, token),
  clear: () => storage.clearAll(),
};
