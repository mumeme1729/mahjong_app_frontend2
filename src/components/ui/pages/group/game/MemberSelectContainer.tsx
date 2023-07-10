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
import GameMemberCard from './GameMemberCard';


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

    const recordScore = async () => {
        let ranklist: {id: number, score: number}[] = []
        let sum = 0;
        let allScoresEntered = true;
      
        selectedMembers.forEach(member => {
          if (member.score !== null) {
            sum += member.score;
          } else {
            console.log(member);
            allScoresEntered = false;
          }
        });
      
        if (allScoresEntered && sum === 100000) {
          console.log(selectedMembers.map((member, index) => `${index + 1}:${member.score}`).join(" "));
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
            >
                <h2>対局結果</h2>
                {/* {startLoad && <CircularProgress/>} */}
                {selectedMembers.length===4?
                    <div>
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
                    {/* <p>合計:{score1.score+score2.score+score3.score+score4.score}</p>
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
                        {/* <label>
                            <input
                            type="radio"
                            value="10-30"
                            onChange={(e)=>{setUma(e.target.value)}}
                            checked={uma === '10-30'}
                            />
                            10-30
                        </label> 
                    </div> */}
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
            </Modal>
            
        </>

    )
}

export default MemberSelectContainer
