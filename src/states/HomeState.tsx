import { atom } from 'recoil';
import { recoilPersist } from "recoil-persist";

 export const isProfileModalOpenState = atom<boolean>({
  key: 'isProfileModalOpenState',
  default: false,
  dangerouslyAllowMutability: true,
});

