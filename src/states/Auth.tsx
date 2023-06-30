import { atom } from 'recoil';
import firebase from 'firebase/auth';

type AuthState = firebase.User| null;

const authState = atom<AuthState>({
  key: 'authState',
  default: null,
  // TypeError: Cannot freezeを回避
  dangerouslyAllowMutability: true,
});

export default authState;