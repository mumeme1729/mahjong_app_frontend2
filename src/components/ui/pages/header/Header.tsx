import React,{useEffect, useState} from 'react'
import styles from "./styles/Header.module.css";

import HeaderDrawer from './HeaderDrawer';
import { getLoginUserTotalRecord, getLoginUserinfo } from '../../../../lib/api/UserApi';
import { useSetRecoilState } from 'recoil';
import { loginUserState } from '../../../../states/UserState';



const Header:React.FC = () => {
    const setLoginUserInfo = useSetRecoilState(loginUserState);
    useEffect(()=>{
        const fetchLoader = async ()=>{
            try {
                const loginUserInfo = await getLoginUserinfo()
                setLoginUserInfo(loginUserInfo)
            } catch (error) {
                // alert(error)
                console.log(error)
            }
        }
       fetchLoader()
    },[]);

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
