import { atom } from 'recoil';

// 画像トリミングのモーダル開閉
 export const isImageTrimmingModalOpenState = atom<boolean>({
  key: 'isImageTrimmingModalOpenState',
  default: false,
  dangerouslyAllowMutability: true,
});

// トリミング後のイメージデータ
export const trimedImageState = atom<File|null>({
    key: 'trimedImageState',
    default: null,
    dangerouslyAllowMutability: true,
  });

