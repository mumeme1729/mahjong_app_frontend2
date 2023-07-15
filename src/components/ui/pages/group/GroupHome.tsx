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
    useEffect(() => {
        const fetchLoader = async () => {
          if (id !== undefined) {
            try {
                const selectedGroupInfo = await getSelectedGroupInfo(id);
                setSelectedGroupInfo(selectedGroupInfo);
                const recentlyGamesRes = await getRecentlyGames(id);
                setRecentlyGames(recentlyGamesRes);
                const groupMemberProfiles = await getProfiles(id);
                setGroupMemberProfiles(groupMemberProfiles)
                isJoinedGroup()
            } catch (error) {
                // alert(error)
            }
          }
        };
        fetchLoader();
      }, [id,isJoined]);

      useEffect(() => {
        const fetchLoader = async () => {
          if (id !== undefined) {
            try {
                isJoinedGroup()
            } catch (error) {
                // alert(error)
            }
          }
        };
        fetchLoader();
      }, [loginuser]);

    const isJoinedState = (isJoinedState:boolean)=>{
        setIsJoined(isJoinedState)
    }
    
    const isJoinedGroup = () =>{
        if(loginuser?.group?.length !== 0 || loginuser?.group !== null ||loginuser?.group !== undefined ){
            loginuser?.group?.map((group:GroupBasicSchema)=>(
                group.id === id? setIsJoined(true):null
            ));
        }
    }
    
    return (
        <>
           <div className={styles.group_home_container}>
                <div className={styles.group_home_body_top}>
                    <div  className={styles.group_home_body_top_groupinfo}>
                        <GroupInfo/>
                    </div>
                </div>
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
