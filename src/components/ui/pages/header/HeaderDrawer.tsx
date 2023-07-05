import React,{useEffect, useState} from 'react'
import { firebaseAuth } from '../../../../firebase';
import { signOut } from 'firebase/auth';
import { Drawer} from '@material-ui/core';
import { useNavigate } from "react-router-dom";
import styles from "./styles/Header.module.css";
import MenuIcon from '@material-ui/icons/Menu';
import PersonIcon from '@material-ui/icons/Person';
import HomeIcon from '@material-ui/icons/Home';
import GroupIcon from '@material-ui/icons/Group';
import AccountBoxIcon from '@material-ui/icons/AccountBox';
import MenuBookIcon from '@material-ui/icons/MenuBook';
import CreateIcon from '@material-ui/icons/Create';

const HeaderDrawer:React.FC = () => {
    const [isOpenMenu,setOpenMenu]=useState(false);
    const navigate = useNavigate();

    const logout = async () => {
        setOpenMenu(false)
        await signOut(firebaseAuth);
        navigate("/login");
      }
    return(
        <>
            <div onClick={()=>setOpenMenu(true)}>
                <MenuIcon fontSize="large"/>
            </div>
            <Drawer
                anchor="top"
                open={isOpenMenu}
                onClose={() => {
                    setOpenMenu(false)
                }}
            >
                <div className={styles.drawer}>
                    <div className={styles.navmune_profile_nickname}>
                        <p className={styles.header_nickname}>{"テストニックネーム"}</p>  
                    </div>
                    <p className={styles.header_p_underbar}>_______________________________</p>
                    <div className={styles.header_navbar_menu} onClick={()=>{}}>
                        <PersonIcon/><h4 className={styles.header_navbar_menu_title}>プロフィール</h4>
                    </div>
                    <div className={styles.header_navbar_menu} onClick={()=>{}}>
                        <HomeIcon/><h4 className={styles.header_navbar_menu_title}>ホーム</h4>
                    </div>
                    <div className={styles.header_navbar_menu} onClick={logout}>
                        <HomeIcon/><h4 className={styles.header_navbar_menu_title}>ログアウト</h4>
                    </div>
                    {/* {location.pathname.includes('/group') || location.pathname.includes('/game') || location.pathname.includes('/member') || location.pathname.includes('/matchrecord')?
                    <>
                        <div className={styles.header_navbar_menu} onClick={()=>{window.scrollTo(0, 0);setOpenMenu(false)}}>
                            <GroupIcon/><h4 className={styles.header_navbar_menu_title}>グループ</h4>
                        </div>
                        <div className={styles.header_navbar_menu} onClick={()=>{window.scrollTo(0, 0);setOpenMenu(false)}}>
                            <CreateIcon/><h4 className={styles.header_navbar_menu_title}>対局</h4>
                        </div>
                        <div className={styles.header_navbar_menu} onClick={()=>{window.scrollTo(0, 0);setOpenMenu(false)}}>
                            <AccountBoxIcon/><h4 className={styles.header_navbar_menu_title}>メンバー</h4>
                        </div>
                        <div className={styles.header_navbar_menu}onClick={()=>{window.scrollTo(0, 0);setOpenMenu(false)}}>
                            <MenuBookIcon/><h4 className={styles.header_navbar_menu_title}>記録</h4>
                        </div>
                    </>
                    :null} */}
                </div>
            </Drawer>
        </>
    )
}

export default HeaderDrawer