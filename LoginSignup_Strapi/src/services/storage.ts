import {MMKV} from 'react-native-mmkv';
import {UserRoleType} from '../types/common';

enum StorageKey {
  JWTToken = 'JWTToken',
  userRole = 'userRole',
}

const storage = new MMKV();

export const Storage = {
  isTokenSet: storage.contains(StorageKey.JWTToken),
  getToken: () => storage.getString(StorageKey.JWTToken),
  setToken: (token: string) => storage.set(StorageKey.JWTToken, token),
  getUserRole: () => storage.getString(StorageKey.userRole),
  setUserRole: (role: UserRoleType) => storage.set(StorageKey.userRole, role),
  clear: () => storage.clearAll(),
};
