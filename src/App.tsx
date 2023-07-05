import React, {useEffect, useState} from 'react';
import logo from './logo.svg';
import './App.css';
import {RecoilRoot, useRecoilValue, useSetRecoilState} from "recoil"
import SignUp from './components/ui/pages/auth/SignUp';
import Login from './components/ui/pages/auth/Login';
import {authState,isAuthLoadingState} from './states/AuthState';
import { signInWithEmailAndPassword, onAuthStateChanged } from 'firebase/auth';
import { firebaseAuth } from './firebase';
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


function App() {
  const isLoading = useRecoilValue(isAuthLoadingState);
  const user = useRecoilValue(authState);
  useAuth()
  return (
    <div className="App">
        <ApiClientProvider>
        <BrowserRouter>
        <Header/>
        {
          isLoading ?
          <>loading....</>
          :(
            <>
              <Routes>
                  <Route path="/login" element={<Auth />} />
                  <Route path="/" element={user? <Home/>:<Navigate replace to="/login" />}/>
                  <Route path="/group/:id" element={user? <GroupHome/>:<Navigate replace to="/login" /> }/>
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
