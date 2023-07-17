import React, {useEffect, useState} from 'react';
import logo from './logo.svg';
import './App.css';
import {RecoilRoot, useRecoilValue, useSetRecoilState} from "recoil"
import {authState,isAuthLoadingState} from './states/AuthState';
import {
  BrowserRouter, 
  Route,
  Routes,
  redirect
} from "react-router-dom";
import Top from './components/ui/pages/auth/Auth';
import Header from './components/ui/pages/header/Header';
import { useNavigate,  Navigate } from "react-router-dom";
import Auth from './components/ui/pages/auth/Auth';
import Home from './components/ui/pages/home/Home';
import { ApiClientProvider } from './lib/ApiClient';
import { useAuth } from './FirebaseAuthCustomHook';
import GroupHome from './components/ui/pages/group/GroupHome';
import GroupMember from './components/ui/pages/group/member/MemberContainer';
import MemberSelectContainer from './components/ui/pages/group/game/MemberSelectContainer';
import GameRecordContainer from './components/ui/pages/game/GameRecordContainer';
import MemberDetail from './components/ui/pages/group/member/MemberDetail';
import SentEmail from './components/ui/pages/auth/SentEmail';
import VerifyEmail from './components/ui/pages/auth/VerifyEmail';


function App() {
  const isLoading = useRecoilValue(isAuthLoadingState);
  const user = useRecoilValue(authState);
  useAuth()
  return (
    <div className="App">
        <ApiClientProvider>
        <BrowserRouter>
        {
          isLoading ?
          <>loading....</>
          :(
            <>
             <Header/>
              <Routes>
                  <Route path="/login" element={<Auth />} />
                  <Route path="/sent_email" element={<SentEmail />}/>
                  <Route path="/varify_email" element={<VerifyEmail />}/>
                  <Route path="/" element={user? <Home/>:<Navigate replace to="/login" />}/>
                  <Route path="/group/:id" element={user? <GroupHome/>:<Navigate replace to="/login" /> }/>
                  <Route path="/group/:id/member" element={user? <GroupMember/>:<Navigate replace to="/login" /> }/>
                  <Route path="/group/:id/member/:profile_id" element={user? <MemberDetail/>:<Navigate replace to="/login" /> }/>
                  <Route path="/group/:id/game" element={user? <MemberSelectContainer/>:<Navigate replace to="/login" /> }/>
                  <Route path="/group/:id/record" element={user? <GameRecordContainer/>:<Navigate replace to="/login" /> }/>
              </Routes>
            </>
           )
        }
        </BrowserRouter>
        </ApiClientProvider>
      </div>
  );
}

export default App;