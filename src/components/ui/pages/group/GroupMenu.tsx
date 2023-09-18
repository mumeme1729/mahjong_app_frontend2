import React,{useEffect,useState }  from 'react'

import styles from "./styles/Group.module.css";
import { useNavigate, useParams } from 'react-router-dom';

const GroupMenu:React.FC = () => {
    const navigate = useNavigate();
    const {id} = useParams();
    return (
        <>
           <div>
                <div className={styles.group_home_menu}>
                    <div className={styles.grouphome_btn} onClick={()=>{navigate(`/group/${id}/game`); window.scrollTo(0, 0);}}>
                        <h3 className={styles.hgrouphome_menu_btn_h3}>対局 </h3>
                    </div>
                    <br/>
                    <div className={styles.grouphome_btn} onClick={()=>{navigate(`/group/${id}/member`);window.scrollTo(0, 0);}}>
                        <h3 className={styles.hgrouphome_menu_btn_h3}>メンバー</h3>
                    </div>
                    <br/>
                    <div className={styles.grouphome_btn} onClick={()=>{navigate(`/group/${id}/record`);window.scrollTo(0, 0);}}>
                        <h3 className={styles.hgrouphome_menu_btn_h3}>記録</h3>
                    </div>
                    <br/>
                    <div className={styles.grouphome_btn} onClick={()=>{}}>
                        <h3 className={styles.hgrouphome_menu_btn_h3}> 予定 </h3>
                    </div>
                    {/* <div className={styles.grouphome_btn} onClick={()=>{}}>
                        <h3 className={styles.hgrouphome_menu_btn_h3}> 設定 </h3>
                    </div> */}
                    {/* <div className={styles.grouphome_btn} onClick={()=>{}}>
                        <h3 className={styles.hgrouphome_menu_btn_h3}> 未定 </h3>
                    </div> */}
                </div>
            </div>
        </>
    )
}

export default GroupMenu
