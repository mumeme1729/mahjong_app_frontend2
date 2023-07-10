import { Avatar, TextField,} from '@material-ui/core';
import React,{useEffect,useState} from 'react'
import { useNavigate, useParams } from 'react-router-dom';
import styles from "../styles/Group.module.css";
import { Button } from '@material-ui/core';
import Modal from "react-modal";
import { useRecoilValue } from 'recoil';
import { ProfilesState } from '../../../../../states/ProfilesState';
import MemberCard from './MemberCard';
import { ProfileBasicSchema } from '../../../../types/ProfileTypes';


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
      height: 450,
      transform: "translate(-50%, -50%)",
      },
};

type GameMemberCardProps = {
    setScore: (score: number) => void;
    position: string|null;
  } & ProfileBasicSchema

const GameMemberCard:React.FC<GameMemberCardProps> = ({setScore, position, ...profile}) => {
    
    
    return (
        <>  
            <div className={styles.gameresults_input_panel}>
                <div className={styles.gameresults_input_panel_player}>
                    <div className={styles.gameresults_input_panel_direction}>
                        {position}:
                    </div>
                    <div>
                        {profile.image!=="" && profile.image !== null?
                            <Avatar alt="who?" src={profile.image} style={{height:'40px',width:'40px'}}/>
                        :null}
                    </div>
                    <div className={styles.gameresults_input_panel_nickname}>
                        <p className={styles.game_nickname}>{profile.nick_name}</p>
                    </div>
                </div>
                <div className={styles.gameresults_input_panel_input_field}>
                    <TextField
                        placeholder="点数"
                        type="number"
                        fullWidth
                        onChange={(e) => setScore(parseInt(e.target.value))}
                    />
                </div>
            </div>
            
        </>

    )
}

export default GameMemberCard
