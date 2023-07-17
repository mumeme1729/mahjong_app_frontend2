import { Avatar, TextField,} from '@material-ui/core';
import React from 'react'
import styles from "../styles/Group.module.css";
import { ProfileBasicSchema } from '../../../../types/ProfileTypes';


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
