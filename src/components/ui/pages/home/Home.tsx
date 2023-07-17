import React,{ useEffect, useState} from 'react'
import { useRecoilValue, useSetRecoilState } from 'recoil';
import { Avatar, Button,Drawer} from '@material-ui/core';
import {loginUserState, loginUserTotalRecordState} from '../../../../states/UserState';
import { getLoginUserTotalRecord, getLoginUserinfo } from '../../../../lib/api/UserApi';
import BelongGroupContainer from './BelongingGroupsContainer';
import styles from "./styles/Home.module.css";
import PersonalRecord from './PersonalRecord';
import { isProfileModalOpenState } from '../../../../states/HomeState';
import Profile from './ProfileEdit';
import CreateGroup from './CreateGroup';


const Home:React.FC = () => {
    const setLoginUserTotalRecord = useSetRecoilState(loginUserTotalRecordState);
    const setIsProfileModalOpen = useSetRecoilState(isProfileModalOpenState)
    const setLoginUserInfo = useSetRecoilState(loginUserState);
    const loginUser = useRecoilValue(loginUserState);

    useEffect(()=>{
        const fetchLoader = async ()=>{
            try {
                const loginUserInfoRes = await getLoginUserinfo()
                setLoginUserInfo(loginUserInfoRes)
                const loginUserTotalRecord = await getLoginUserTotalRecord(false);
                setLoginUserTotalRecord(loginUserTotalRecord)
                if(loginUser?.nick_name === null){
                    setIsProfileModalOpen(true);
                }else{
                    setIsProfileModalOpen(false);
                }
            } catch (error) {
                console.log(error)
            }
        }
       fetchLoader()
    },[]);

    return (
        <>
            <div className={styles.home_container}>
                <div className={styles.home_body}>
                    <div className={styles.home_profile_container}>
                        <div className={styles.navmune_profile_avater}>
                            <Button onClick={()=>{setIsProfileModalOpen(true)}}>
                                {
                                    loginUser?.image !== null?
                                        <Avatar alt="who?" src={loginUser?.image} style={{height:'70px',width:'70px'}}/>
                                    :
                                        <Avatar alt="who?" src={""} style={{height:'70px',width:'70px'}}/>
                                }
                            </Button>
                        </div>
                        <div className={styles.home_profile_nickname_container}>
                            <div className={styles.home_nick_name}>{loginUser?.nick_name}</div>
                        </div>
                    </div>
                    <div>
                        <PersonalRecord />
                    </div>
                    <CreateGroup/>
                    <div>
                        <BelongGroupContainer />
                    </div>
                </div>
            </div>
            <Profile />
        </>
    )
}

export default Home
