import { useState, useEffect } from 'react';
import { firebaseAuth } from './firebase'; // Firebaseの認証オブジェクトに置き換える
import { useSetRecoilState } from 'recoil';
import {authState,isAuthLoadingState} from './states/AuthState';
// firebaseの認証情報を監視
export function useAuth() {
  const setAuth = useSetRecoilState(authState);
  const setIsAuthLoading = useSetRecoilState(isAuthLoadingState);

  useEffect(() => {
    const unsubscribe = firebaseAuth.onAuthStateChanged((currentUser) => {
        //     // if(currentUser && currentUser.emailVerified){
      if(currentUser){
        setAuth(currentUser);
      }
      setIsAuthLoading(false);
    });

    return () => unsubscribe(); // クリーンアップ関数でリスナーを解除
  }, []);
}