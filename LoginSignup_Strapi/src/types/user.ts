import {UserRoleType} from './common';

export type User = {
  id: number;
  username: string;
  email: string;
  role: {
    type: UserRoleType;
  };
};

export type UserResponse = {
  jwt: string;
  user: User;
};

export type UserLoginData = {
  identifier: string;
  password: string;
};

export type UserRegisterData = {
  email: string;
  username: string;
  password: string;
};
