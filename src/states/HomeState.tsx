import { atom } from 'recoil';

//  ログインしているユーザー情報
 export const isProfileModalOpenState = atom<boolean>({
  key: 'isProfileModalOpenState',
  default: false,
  dangerouslyAllowMutability: true,
});

