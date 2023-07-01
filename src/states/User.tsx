import { atom } from 'recoil';
import firebase from 'firebase/auth';
import { LoginUserInfo } from '../components/types/auth/user_types';

type LoginUserState = LoginUserInfo| null;

const loginUserState = atom<LoginUserState>({
  key: 'loginUserState',
  default: null,
  // TypeError: Cannot freezeを回避
  dangerouslyAllowMutability: true,
});

export default loginUserState;