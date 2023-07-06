import React,{useEffect,useState }  from 'react'

import styles from "./styles/Group.module.css";
import { Button, CircularProgress, makeStyles, TextField,} from '@material-ui/core';
import { useSetRecoilState } from 'recoil';
import { recentlyGamesState, selectedGroupState } from '../../../../states/GroupState';
import { getRecentlyGames, getSelectedGroupInfo } from '../../../../lib/api/GroupApi';
import { useParams } from 'react-router-dom';
import { GameResultSchema } from '../../../types/GameTypes';
import GroupMenu from './GroupMenu';
import GroupInfo from './GroupInfo';
import RecentlyGameContainer from './RecentlyGames';
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
    const setSelectedGroupInfo = useSetRecoilState(selectedGroupState)
    const setRecentlyGames = useSetRecoilState(recentlyGamesState)
    useEffect(() => {
        const fetchLoader = async () => {
          if (id !== undefined) {
            const selectedGroupInfo = await getSelectedGroupInfo(id);
            setSelectedGroupInfo(selectedGroupInfo);
            const recentlyGamesRes = await getRecentlyGames(id);
            setRecentlyGames(recentlyGamesRes);
          }
        };
        fetchLoader();
      }, [id]);
      
    return (
        <>
           <div className={styles.group_home_container}>
                <div className={styles.group_home_body_top}>
                    <div  className={styles.group_home_body_top_groupinfo}>
                        <GroupInfo/>
                    </div>
                </div>
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
        </>
    )
}

export default GroupHome
