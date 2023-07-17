import { Avatar, TextField,} from '@material-ui/core';
import React from 'react'
import styles from "../styles/Group.module.css";
import { Button } from '@material-ui/core';
import { ProfileBasicSchema } from '../../../../types/ProfileTypes';
import { getRankColorClass } from '../../../../../utils/common/func';

type MemberCardProps = {
    selectMember: (profile: ProfileBasicSchema) => void;
    position: string|null;
  } & ProfileBasicSchema 
const MemberCard:React.FC<MemberCardProps> = ({ selectMember, position,...profile }) => {
    return (
        <>  
                <div key={profile.id} onClick={()=>{selectMember(profile)}} className={styles.game_user_btn}>
                    <div className={styles.member_body}>
                        <div>
                            <div className={styles.member_avater}>
                                {profile.image!=="" && profile.image !== null?
                                <Avatar alt="who?" src={profile.image} style={{height:'70px',width:'70px'}}/>
                                :null}
                            </div>
                            <div>
                                <div  className={styles.member_nick_name}>{profile?.nick_name}</div>
                                <div  className={`${styles.member_rate} ${getRankColorClass(profile?.rank_name)}`}>{profile?.rank_name}</div>
                                {position && <p>{position}</p>}
                            </div>
                        </div>
                    </div>
                </div> 
        </>
    )
}

export default MemberCard
