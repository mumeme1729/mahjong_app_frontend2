import { useState, useEffect } from 'react';
import { firebaseAuth } from './firebase'; // Firebaseの認証オブジェクトに置き換える
import { useSetRecoilState } from 'recoil';
import {authState,isAuthLoadingState} from './states/AuthState';
import { getLoginUserinfo } from './lib/api/UserApi';
import { loginUserState } from './states/UserState';
// firebaseの認証情報を監視
export function useAuth() {
  const setAuth = useSetRecoilState(authState);
  const setIsAuthLoading = useSetRecoilState(isAuthLoadingState);
  useEffect(() => {
    const unsubscribe = firebaseAuth.onAuthStateChanged(async (currentUser) => {
        //     // if(currentUser && currentUser.emailVerified){
      if(currentUser && currentUser.emailVerified){
        setAuth(currentUser);
      }else{
        setAuth(null);
      }
      setIsAuthLoading(false);
    });

    return () => unsubscribe(); // クリーンアップ関数でリスナーを解除
  }, []);
}