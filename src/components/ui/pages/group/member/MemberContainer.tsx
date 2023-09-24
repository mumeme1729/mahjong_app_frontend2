import { Avatar, Button } from '@material-ui/core';
import React, { useEffect } from 'react'
import { useNavigate, useParams } from 'react-router-dom';
import styles from "../styles/Group.module.css";
import { useRecoilValue } from 'recoil';
import { ProfilesState } from '../../../../../states/ProfilesState';
import {getRankColorClass} from '../../../../../utils/common/func';



const GroupMember:React.FC = () => {
    const navigate = useNavigate();
    const setGroupMemberProfiles = useRecoilValue(ProfilesState);
    const {id} = useParams();

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
                                    <Button onClick={()=>{navigate(`${profile.id}`);}}>
                                        <div>
                                            <div className={styles.member_avater}>
                                                {profile.image!==null?
                                                    <Avatar alt="who?" src={profile.image} style={{height:'70px',width:'70px'}}/>
                                                :<Avatar alt="who?" src={""} style={{height:'70px',width:'70px'}}/>}
                                            </div>
                                            <div>
                                                <div  className={styles.member_nick_name}>{profile?.nick_name}</div>
                                                <div  className={`${styles.member_rate} ${getRankColorClass(profile.rank_name)}`}>{profile?.rank_name}</div>
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
