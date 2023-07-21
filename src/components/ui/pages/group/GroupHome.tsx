import React,{useEffect,useState }  from 'react'

import styles from "./styles/Group.module.css";
import { useRecoilState, useRecoilValue, useSetRecoilState } from 'recoil';
import { recentlyGamesState, selectedGroupState } from '../../../../states/GroupState';
import { getProfiles, getRecentlyGames, getSelectedGroupInfo } from '../../../../lib/api/GroupApi';
import { useParams } from 'react-router-dom';
import GroupMenu from './GroupMenu';
import GroupInfo from './GroupInfo';
import RecentlyGameContainer from './RecentlyGames';
import { loginUserState } from '../../../../states/UserState';
import { GroupBasicSchema } from '../../../types/GroupTypes';
import JoinGroup from './JoinGroup';
import { ProfilesState } from '../../../../states/ProfilesState';
import { group } from 'console';
import { authState } from '../../../../states/AuthState';
import { getLoginUserinfo } from '../../../../lib/api/UserApi';
import { LoginUserInfo } from '../../../types/UserTypes';
import { useNavigate, useLocation } from "react-router-dom";
const modalStyle={
    overlay: {
        background: 'rgba(0, 0, 0, 0.2)',
        zIndex:2,
      },
    content: {
        
      top: "50%",
      left: "50%",
      backgroundColor: 'white',
      width: 260,
      height: 150,
      transform: "translate(-50%, -50%)",
      },
};

const GroupHome:React.FC = () => {
    const {id} = useParams();
    const setSelectedGroupInfo = useSetRecoilState(selectedGroupState);
    const setRecentlyGames = useSetRecoilState(recentlyGamesState);
    const setGroupMemberProfiles = useSetRecoilState(ProfilesState);
    const auth = useRecoilValue(authState)
    const loginuser = useRecoilValue(loginUserState);
    const [isJoined, setIsJoined] = useState<boolean>(false);
    const setLoginUserInfo = useSetRecoilState(loginUserState);
    const navigate = useNavigate();
    useEffect(() => {
        const fetchLoader = async () => {
            console.log("group home");
            if (id !== undefined) {
                try {
                    const loginUserInfoRes = await getLoginUserinfo()
                    setLoginUserInfo(loginUserInfoRes)
                    isJoinedGroup(loginUserInfoRes) // Pass the new state directly
                    const selectedGroupInfo = await getSelectedGroupInfo(id);
                    setSelectedGroupInfo(selectedGroupInfo);
                    const recentlyGamesRes = await getRecentlyGames(id);
                    setRecentlyGames(recentlyGamesRes);
                    const groupMemberProfiles = await getProfiles(id);
                    setGroupMemberProfiles(groupMemberProfiles)
                } catch (error) {
                    alert(error)
                    navigate("/")
                }
            }
        };
        fetchLoader();
    }, [id]);

    useEffect(() => {
        if (id !== undefined) {
            isJoinedGroup(loginuser);
        }
    }, [loginuser, id]);

    const isJoinedGroup = (loginUserInfo:LoginUserInfo|null) => {
        if(loginUserInfo?.group?.length !== 0 || loginUserInfo?.group !== null || loginUserInfo?.group !== undefined ){
            const isAlreadyJoined = loginUserInfo?.group?.some(group => group.id === id);
            if (isAlreadyJoined !== isJoined && isAlreadyJoined !== undefined) {
                setIsJoined(isAlreadyJoined);
            }
        }
    }

    const isJoinedState = (isJoinedState:boolean)=>{
        setIsJoined(isJoinedState)
    }
    
    // const isJoinedGroup = () =>{
    //     if(loginuser?.group?.length !== 0 || loginuser?.group !== null ||loginuser?.group !== undefined ){
    //         const isAlreadyJoined = loginuser?.group?.some(group => group.id === id);
    //         if (isAlreadyJoined !== isJoined && isAlreadyJoined!==undefined) {
    //             setIsJoined(isAlreadyJoined);
    //         }
    //     }
    // }
    
    return (
        <>
           <div className={styles.group_home_container}>
                <GroupInfo/>
                {
                    isJoined?
                    <div>
                        <div>
                            <GroupMenu/>
                        </div>
                        <div className={styles.group_home_container_right_bottom}>
                            <div className={styles.group_home_results}>
                                <h3 className={styles.hgrouphome_menu_btn_h3}>直近の対局記録</h3>
                                < RecentlyGameContainer/>
                            </div>
                        </div>
                    </div>
                    :<JoinGroup setIsJoined={isJoinedState}/>
                }
            </div>
        </>
    )
}

export default GroupHome
