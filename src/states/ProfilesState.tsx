import { atom } from 'recoil';
import { recoilPersist } from "recoil-persist";
import { ProfileBasicSchema, ProfilesSchema } from '../components/types/ProfileTypes';

const { persistAtom } = recoilPersist();
// グループに参加しているメンバー情報
 export const ProfilesState = atom<ProfilesSchema>({
  key: 'ProfilesState',
  default: null,
  dangerouslyAllowMutability: true,
  effects_UNSTABLE: [persistAtom]
});

