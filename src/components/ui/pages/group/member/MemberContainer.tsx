import { Avatar, Button } from '@material-ui/core';
import React, { useEffect } from 'react'
import { useNavigate, useParams } from 'react-router-dom';
import styles from "../styles/Group.module.css";
import { useRecoilValue } from 'recoil';
import { ProfilesState } from '../../../../../states/ProfilesState';

const GroupMember:React.FC = () => {
    const navigate = useNavigate();
    const setGroupMemberProfiles = useRecoilValue(ProfilesState);
    
    return (
        <div>
            <div className={styles.member_main_container}>
            <div className={styles.member_main_body}>
                <div className={styles.page_title_group_member}>
                    <h2 className={styles.group_title_h2}>グループメンバー</h2> 
                </div>
                <div className={styles.member_container}> 
                    {setGroupMemberProfiles?.map((profile)=>(
                        profile.is_active &&
                            <div key={profile.id}>
                                <div className={styles.member_body}>
                                    <Button onClick={()=>{}}>
                                        <div>
                                            <div className={styles.member_avater}>
                                                {profile.image!==null?
                                                    <Avatar alt="who?" src={profile.image} style={{height:'80px',width:'80px'}}/>
                                                :null}
                                            </div>
                                            <div>
                                                <div  className={styles.member_nick_name}>{profile?.nick_name}</div>
                                                <div  className={styles.member_rate}>{profile?.rate4}</div>
                                            </div>
                                        </div>
                                    </Button>
                                </div>
                            </div>
                    ))}
                </div>
                </div>
            </div>
        </div>
    )
}

export default GroupMember
