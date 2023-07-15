import React,{ useEffect, useState} from 'react'
import styles from "./styles/Game.module.css";
import { useParams } from 'react-router-dom';
import { useRecoilValue } from 'recoil';
import { ProfilesState } from '../../../../states/ProfilesState';
import dayjs, { Dayjs } from 'dayjs';
import { getAllProfilesGameGrade, getGamesSpecifiedPeriod } from '../../../../lib/api/GroupApi';
import { GameGradeProfileSchema } from '../../../types/ProfileTypes';
import PersonalRecordContainer from './PersonalRecordContainer';
import { DemoContainer } from '@mui/x-date-pickers/internals/demo';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { DateTimePicker } from '@mui/x-date-pickers/DateTimePicker';
import { MobileDateTimePicker } from '@mui/x-date-pickers';
import { GameResultSchema } from '../../../types/GameTypes';
import GamesTable from './GamesTable';
import Button from '@material-ui/core/Button';
import TotallingModal from './TotallingModal';


const GameRecordContainer:React.FC = () => {
    const {id} = useParams();
    const groupMemberProfiles = useRecoilValue(ProfilesState);
    const now = new Date();
    const formattedDate = `${now.getFullYear()}-${(now.getMonth()+1).toString().padStart(2, '0')}-${now.getDate().toString().padStart(2, '0')}T${now.getHours().toString().padStart(2, '0')}:${now.getMinutes().toString().padStart(2, '0')}`;
    const [date_until, setDateUntil] = useState<Dayjs>(dayjs(formattedDate));
    const [date_from, setDateFrom] = useState<Dayjs|null>(null);
    const [gameGrades, setGameGrades] = useState<GameGradeProfileSchema>(null)
    const [gameResults, setGameResults] = useState<GameResultSchema|null>(null)

    useEffect(()=>{
        const fetchLoader = async ()=>{
            try {
                const ids = groupMemberProfiles?.map(profile => profile.id);
                if (ids !== null && ids !== undefined && id !== undefined){
                    let res = await getAllProfilesGameGrade(false, ids, date_from !== null? date_from.format('YYYY/MM/DD HH:mm:ss'):null ,date_until?.format('YYYY/MM/DD HH:mm:ss'))
                    console.log(res);
                    setGameGrades(res);
                    let gameResultsRes = await getGamesSpecifiedPeriod(id,date_from !== null? date_from.format('YYYY/MM/DD HH:mm:ss'):null ,date_until?.format('YYYY/MM/DD HH:mm:ss') )
                    console.log(gameResultsRes);
                    setGameResults(gameResultsRes);
                }
                
            } catch (error) {
                console.log(error)
            }
        }
       fetchLoader()
    },[id, date_until, date_from]);

    return (
        <>
            <div className={styles.title_container}>
                <div className={styles.title_font}>対局記録</div>
            </div>
            {
                gameGrades !== null
                ?<>
                    <div className={styles.date_picker_container}>
                        <LocalizationProvider dateAdapter={AdapterDayjs}>
                            <DemoContainer components={['MobileDateTimePicker']}>
                                <DateTimePicker
                                    label="いつから"
                                    value={date_from}
                                    onChange={(newValue) => {if(newValue !== null)setDateFrom(newValue)}}
                                    ampm={false}
                                    className={styles.date_picker_size}
                                    format='YYYY/MM/DD HH:mm'
                                />
                                <DateTimePicker
                                    label="いつまで"
                                    value={date_until}
                                    onChange={(newValue) => {if(newValue !== null)setDateUntil(newValue)}}
                                    ampm={false}
                                    className={styles.date_picker_size}
                                    format='YYYY/MM/DD HH:mm'
                                />
                            </DemoContainer>
                        </LocalizationProvider>
                    </div>
                    <TotallingModal {...gameResults}/>
                    <div className={styles.personal_record_container}>
                        <PersonalRecordContainer gameGrades={gameGrades}/>
                    </div>
                    <div>
                        <GamesTable {...gameResults}/>
                    </div>
                 </>
                :<div>読み込み中</div>
            }

            
        </>
    )
}

export default GameRecordContainer
