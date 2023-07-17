import React,{useEffect, useState} from 'react'
import styles from "./styles/Header.module.css";
import { useNavigate, useLocation } from "react-router-dom";
import HeaderDrawer from './HeaderDrawer';
import { getLoginUserTotalRecord, getLoginUserinfo } from '../../../../lib/api/UserApi';
import {RecoilRoot, useSetRecoilState} from "recoil"
import { loginUserState } from '../../../../states/UserState';
import { authState } from '../../../../states/AuthState';



const Header:React.FC = () => {
    const setLoginUserInfo = useSetRecoilState(loginUserState);
    const navigate = useNavigate();
    // useEffect(()=>{
    //     const fetchLoader = async ()=>{
    //         try {
    //             // ログインしていたら
    //             console.log("aaaaa")
    //             // const loginUserInfo = await getLoginUserinfo()
    //             // setLoginUserInfo(loginUserInfo)
    //         } catch (error) {
    //             alert(error)
    //             console.log(error)
    //             // navigate("/login")
    //         }
    //     }
    //    fetchLoader()
    // },[]);

    return (
        <>
            <div className={styles.header_container}>
                <div className={styles.header_body}>
                    <div className={styles.header_body_left}>
                        <HeaderDrawer/>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Header
function useRecoilValue(authState: any) {
    throw new Error('Function not implemented.');
}

