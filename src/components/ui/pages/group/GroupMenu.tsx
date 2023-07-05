import React,{useEffect,useState }  from 'react'

import styles from "./styles/Group.module.css";
import { Button, CircularProgress, makeStyles, TextField,} from '@material-ui/core';
import groupImage from '../../../../assets/img/zunda.jpg';
import { useRecoilValue } from 'recoil';
import { selectedGroupState } from '../../../../states/GroupState';

const GroupMenu:React.FC = () => {
    return (
        <>
           <div>
                <div className={styles.group_home_menu}>
                    <div className={styles.grouphome_btn} onClick={()=>{window.scrollTo(0, 0);}}>
                        <h3 className={styles.hgrouphome_menu_btn_h3}>対局 </h3>
                    </div>
                    <br/>
                    <div className={styles.grouphome_btn} onClick={()=>{window.scrollTo(0, 0);}}>
                        <h3 className={styles.hgrouphome_menu_btn_h3}>メンバー</h3>
                    </div>
                    <br/>
                    <div className={styles.grouphome_btn} onClick={()=>{window.scrollTo(0, 0);}}>
                        <h3 className={styles.hgrouphome_menu_btn_h3}>対局記録</h3>
                    </div>
                    <br/>
                    <div className={styles.grouphome_btn} onClick={()=>{}}>
                        <h3 className={styles.hgrouphome_menu_btn_h3}> 予定 </h3>
                    </div>
                </div>
            </div>
        </>
    )
}

export default GroupMenu
