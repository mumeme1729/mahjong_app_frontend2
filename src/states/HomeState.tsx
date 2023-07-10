import { atom } from 'recoil';
import { recoilPersist } from "recoil-persist";

const { persistAtom } = recoilPersist();
 export const isProfileModalOpenState = atom<boolean>({
  key: 'isProfileModalOpenState',
  default: false,
  dangerouslyAllowMutability: true,
  effects_UNSTABLE: [persistAtom]
});

