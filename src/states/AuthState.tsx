import { atom } from 'recoil';
import firebase from 'firebase/auth';

type AuthState = firebase.User| null;

export const authState = atom<AuthState>({
  key: 'authState',
  default: null,
  // TypeError: Cannot freezeを回避
  dangerouslyAllowMutability: true,
});

export const isAuthLoadingState = atom<boolean>({
  key: 'isAuthLoadingState',
  default: true,
  // TypeError: Cannot freezeを回避
  dangerouslyAllowMutability: true,
});