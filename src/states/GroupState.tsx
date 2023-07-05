import { atom } from 'recoil';
import { GroupHomeSchema } from '../components/types/GroupTypes';
import { GameResultSchema } from '../components/types/GameTypes';

type selectedGroupType = GroupHomeSchema| null;
type GameResultType= GameResultSchema| null

//  選択したグループの情報
 export const selectedGroupState = atom<selectedGroupType>({
  key: 'selectedGroupState',
  default: null,
  dangerouslyAllowMutability: true,
});

//  選択したグループの直近の対局
export const recentlyGamesState = atom<GameResultSchema>({
    key: 'recentlyGamesState',
    default: {
        "default": [
          {
            "id": "default1",
            "is_sanma": false,
            "created_at": "2023-06-22T12:11:32.105624",
            "score": 50000,
            "rank": 1,
            "nick_name": null
          },
          {
            "id": "default2",
            "is_sanma": false,
            "created_at": "2023-06-22T12:11:32.105624",
            "score": 30000,
            "rank": 2,
            "nick_name": null
          },
          {
            "id": "default3",
            "is_sanma": false,
            "created_at": "2023-06-22T12:11:32.105624",
            "score": 15000,
            "rank": 3,
            "nick_name": null
          },
          {
            "id": "default4",
            "is_sanma": false,
            "created_at": "2023-06-22T12:11:32.105624",
            "score": 5000,
            "rank": 4,
            "nick_name": null
          }
        ]},
    dangerouslyAllowMutability: true,
  });

