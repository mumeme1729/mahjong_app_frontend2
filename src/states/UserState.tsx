import { atom } from 'recoil';
import firebase from 'firebase/auth';
import { LoginUserInfo, LoginUserTotalRecord } from '../components/types/UserTypes';
import { recoilPersist } from "recoil-persist";

const { persistAtom } = recoilPersist();
type LoginUserState = LoginUserInfo| null;
type loginUserTotalRecordState =  LoginUserTotalRecord | null;

//  ログインしているユーザー情報
 export const loginUserState = atom<LoginUserState>({
  key: 'loginUserState',
  default: null,
  dangerouslyAllowMutability: true,
  effects_UNSTABLE: [persistAtom]
});

// ログインしているユーザーのトータル成績
 export const loginUserTotalRecordState = atom<loginUserTotalRecordState>({
    key: 'loginUserTotalRecordState',
    default: {
        game_count: 0,
        rank1: 0,
        rank2: 0,
        rank3: 0,
        rank4: 0,
        total_score: 0,
        score_average: 0,
        rank_average: 0,
        top_rate: 0,
        last_rate: 0,
        winning_rate: 0
    },
    // TypeError: Cannot freezeを回避
    dangerouslyAllowMutability: true,
  });
  
//   export default loginUserTotalRecordState;