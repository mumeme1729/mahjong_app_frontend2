import { Avatar, TextField,} from '@material-ui/core';
import React,{useEffect,useState} from 'react'
import { useNavigate, useParams } from 'react-router-dom';
import styles from "../styles/Group.module.css";
import { Button } from '@material-ui/core';
import Modal from "react-modal";
import dayjs, { Dayjs } from 'dayjs';
import { useRecoilValue } from 'recoil';
import { ProfilesState } from '../../../../../states/ProfilesState';
import MemberCard from './MemberCard';
import { ProfileBasicSchema } from '../../../../types/ProfileTypes';
import GameMemberCard from './GameMemberCard';
import { GameResultCreateSchema } from '../../../../types/GameTypes';
import { postCreateGame } from '../../../../../lib/api/GameApi';
import { DemoContainer } from '@mui/x-date-pickers/internals/demo';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { DateTimePicker } from '@mui/x-date-pickers/DateTimePicker';

const modalStyle={
    overlay: {
        background: 'rgba(0, 0, 0, 0.2)',
        zIndex:2,
      },
    content: {
        
        top: "50%",
      left: "50%",
      backgroundColor: 'white',
      width: 300,
      height: 450,
      transform: "translate(-50%, -50%)",
      },
};

const MemberSelectContainer:React.FC = () => {
    const navigate = useNavigate();
    const {id} = useParams();
    const groupMemberProfiles = useRecoilValue(ProfilesState);
    const [openModal,setOpenModal]=useState(false);
    const posList = ["東", "南", "西", "北"]
    const [uma, setUma] = useState('5-10');
    const now = new Date();
    const formattedDate = `${now.getFullYear()}-${(now.getMonth()+1).toString().padStart(2, '0')}-${now.getDate().toString().padStart(2, '0')}T${now.getHours().toString().padStart(2, '0')}:${now.getMinutes().toString().padStart(2, '0')}`;
    const [date, setDate] = useState<Dayjs | null>(dayjs(formattedDate));

    // const handleDateChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    //     setDate(event.target.value);
    // };

    type ProfileWithPosition = ProfileBasicSchema & {
        position: string;
        score: number | null;
    };
    const [selectedMembers, setSelectedMembers] = useState<ProfileWithPosition[]>([]);

    
    const selectMember = (profile:ProfileBasicSchema) => {
        const alreadySelected = selectedMembers.findIndex(member => member.id === profile.id);
    
        if (alreadySelected !== -1) {
            setSelectedMembers(prev => prev.filter((_, index) => index !== alreadySelected)
            .map((item, index) => ({...item, position: posList[index], score: 0 })));
        } else if (selectedMembers.length < 4) {
            setSelectedMembers(prev => [...prev, { ...profile, position: posList[prev.length], score: 0 }]);
        } else {
            alert('4人以上選択することはできません。');
        }
    }

    const getPosition = (profileId:string|null) => {
        const member = selectedMembers.find(member => member.id === profileId);
        return member ? member.position : null;
    }

    const setScore = (id: string|null, score: number) => {
        setSelectedMembers(prev => 
            prev.map(member => member.id === id ? { ...member, score } : member)
        );
    };

    function calcScor(member:ProfileWithPosition, index: number){
        let ranklist: GameResultCreateSchema = {
            rank: 0,
            score: 0,
            score_origin: 0,
            profile: ''
        };
        // 五捨六入結果
        let calcscore:number=0 
        if(member.score !== null){
            if(member?.score>=0){
                let cscore=(member?.score+400)/1000;
                cscore=Math.floor(cscore);
                calcscore=cscore-30;
            }else{
                let cscore=(member?.score-400)/1000;
                cscore=Math.ceil(cscore);
                calcscore=cscore-30;
            }
        }
        if(uma=="0"){
            if(index===1){calcscore=calcscore+20;}
            if(index===2){calcscore=calcscore;}
            if(index===3){calcscore=calcscore;}
            if(index===4){calcscore=calcscore};
        }else if(uma==="5-10"){
            if(index===1){calcscore=calcscore+20+10;}
            if(index===2){calcscore=calcscore+5;}
            if(index===3){calcscore=calcscore-5;}
            if(index===4){calcscore=calcscore-10};
        }else if(uma==="10-20"){
            if(index===1){calcscore=calcscore+20+20;}
            if(index===2){calcscore=calcscore+10;}
            if(index===3){calcscore=calcscore-10;}
            if(index===4){calcscore=calcscore-20};
        }else if(uma==="10-30"){
            if(index===1){calcscore=calcscore+20+30;}
            if(index===2){calcscore=calcscore+10;}
            if(index===3){calcscore=calcscore-10;}
            if(index===4){calcscore=calcscore-30};
        }

        ranklist["rank"] = index;
        ranklist["score"] = calcscore;
        ranklist["score_origin"] = member.score!== null ? member.score : 0;
        ranklist["profile"] = member.id !== null ? member.id : "";
        return ranklist;
    }
    const sortedMembers = [...selectedMembers].sort((a, b) => {
        if (a.score === null) return -1; // もしaのscoreがnullの場合、bを先に並べる
        if (b.score === null) return 1; // もしbのscoreがnullの場合、aを先に並べる
        return b.score - a.score; // scoreが大きい順に並べる
      });

    const recordScore = async () => {
        // ソート
        try {
            let sum = 0;
            let allScoresEntered = true;
            selectedMembers.forEach(member => {
            if (member.score !== null) {
                sum += member.score;
            } else {
                allScoresEntered = false;
            }
            });
        
            if (allScoresEntered && sum === 100000) {
                    // Gameを作成する
                let request_body:{is_sanma:boolean, group_id:string,date:string,game_results:GameResultCreateSchema[]} ={
                    is_sanma: false,
                    group_id: id!==undefined ? id : '',
                    date: date !== null ? date.format('YYYY/MM/DD HH:mm:ss') : '',
                    game_results: []
                }
                // ソート
                sortedMembers.map((member, index) => (
                    request_body["game_results"].push(calcScor(member, index+1))
                ));
                console.log(`時刻情報 => ${date}`)
                await postCreateGame(request_body)
                setOpenModal(false);
                navigate(`/group/${id}`)
            }
        } catch (error) {
            alert(error)   
        }
      }

    
    return (
        <>  
            <div className={styles.member_main_container}>
                <div className={styles.member_main_body}>
                    <div className={styles.page_title_select_member}>
                        <h2 className={styles.group_title_h2}>対局者を選択</h2>
                        <p>東→南→西→北の席順で選択してください</p>
                    </div>
                    <div className={styles.member_main_container}>
                        <div className={styles.member_container}>    
                        {groupMemberProfiles?.map((profile)=>(
                            profile.is_active &&
                            <MemberCard {...profile} selectMember={() => selectMember(profile)} position={getPosition(profile?.id)} />
                        ))}
                        </div>
                    </div>
                </div>
            </div>
            <div className={styles.game_start_btn}>
                <Button
                    disabled={selectedMembers.length!==4}
                    variant="contained"
                    color="primary"
                    onClick={()=>{setOpenModal(true);}}
                >
                    対局開始
                </Button>
            </div>
            <Modal
                isOpen={openModal}
                onRequestClose={()=>{
                    setOpenModal(false);
                }}
                style={modalStyle}
                ariaHideApp={false}
            >   <div className={styles.gameResultModal}>
                    <h2>対局結果</h2>
                    {/* {startLoad && <CircularProgress/>} */}
                    {selectedMembers.length===4?
                        <div>
                            <div>
                                <LocalizationProvider dateAdapter={AdapterDayjs}>
                                    <DemoContainer components={['DateTimePicker', 'DateTimePicker']}>
                                        <DateTimePicker
                                        label="Controlled picker"
                                        value={date}
                                        onChange={(newValue) => setDate(newValue)}
                                        />
                                    </DemoContainer>
                                </LocalizationProvider>
                            </div>
                            {
                                selectedMembers.map(member => 
                                    <GameMemberCard 
                                        key={member.id} 
                                        setScore={(score) => setScore(member.id, score)} 
                                        {...member} 
                                    />
                                )
                            }
                        </div>
                    :
                        <div> 
                        </div>
                    }
                    <div>
                        <div>合計:{ selectedMembers.reduce((sum, member) => sum + (member.score || 0), 0)}</div>
                        <div className={styles.match_radio_box_container}>
                            <span>ウマ：</span>
                            <label>
                                <input
                                type="radio"
                                value="0"
                                onChange={(e)=>{setUma(e.target.value)}}
                                checked={uma === '0'}
                                />
                                0
                            </label>
                            <label>
                                <input
                                type="radio"
                                value="5-10"
                                onChange={(e)=>{setUma(e.target.value)}}
                                checked={uma === '5-10'}
                                />
                                5-10
                            </label>
                            <label>
                                <input
                                type="radio"
                                value="10-20"
                                onChange={(e)=>{setUma(e.target.value)}}
                                checked={uma === '10-20'}
                                />
                                10-20
                            </label>
                            <label>
                                <input
                                type="radio"
                                value="10-30"
                                onChange={(e)=>{setUma(e.target.value)}}
                                checked={uma === '10-30'}
                                />
                                10-30
                            </label> 
                        </div>
                        <div className={styles.game_start_btn}>
                            <Button
                                disabled={
                                    selectedMembers.reduce((sum, member) => sum + (member.score || 0), 0) !== 100000
                                }
                                variant="contained"
                                color="primary"
                                onClick={recordScore}
                            >
                                記録
                            </Button>
                        </div>
                    </div>
                </div>
            </Modal>
            
        </>

    )
}

export default MemberSelectContainer
