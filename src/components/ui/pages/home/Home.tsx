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
    const loginuser = useRecoilValue(loginUserState);

    useEffect(()=>{
        const fetchLoader = async ()=>{
            try {
                const loginUserTotalRecord = await getLoginUserTotalRecord(false);
                setLoginUserTotalRecord(loginUserTotalRecord)
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
                                    loginuser?.image !== null?
                                        <Avatar alt="who?" src={loginuser?.image} style={{height:'70px',width:'70px'}}/>
                                    :
                                        <Avatar alt="who?" src={""} style={{height:'70px',width:'70px'}}/>
                                }
                            </Button>
                        </div>
                        <div className={styles.home_profile_nickname_container}>
                            <div className={styles.home_nick_name}>{loginuser?.nick_name}</div>
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
