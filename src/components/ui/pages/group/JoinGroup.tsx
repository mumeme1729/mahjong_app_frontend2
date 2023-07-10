import React,{useLayoutEffect,useState }  from 'react'
import { useParams } from 'react-router-dom';
import styles from "./styles/Group.module.css";
import { Button, CircularProgress, makeStyles, TextField,} from '@material-ui/core';
import Modal from "react-modal";
import { useRecoilValue } from 'recoil';
import { selectedGroupState } from '../../../../states/GroupState';
import { putJoinGroup } from '../../../../lib/api/GroupApi';

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
      height: 150,
      transform: "translate(-50%, -50%)",
      },
};

type StateSetter = (isJoind:boolean) =>void
interface PropType {
    setIsJoined: StateSetter
}
const JoinGroup:React.FC<PropType> = ({setIsJoined}) => {
    const {id} = useParams();
    const group = useRecoilValue(selectedGroupState);
    const [password,setPassword]=useState("");
    const [isopenpasswordwindow,setIsOpenPasswordWindow]=useState(false);
    const [notmatchpass,setNotMatchPass]=useState(false);
   
    //グループに参加
    const participationGroup=async()=>{
        // パスワードが設定されていない場合そのまま参加させる
        try {
            if(group?.password==="" || group?.password===null){
                if (id !== undefined) {
                    const res =  await putJoinGroup(id,"")
                    setIsJoined(true)
                }else{
                    throw new Error("Exception! group ID is null")
                }
            }else{
                setIsOpenPasswordWindow(true);
            }     
        } catch (error) {
            alert(error)
        }
       
    }
    const participationGroupWithPassword=async()=>{
        if (password === group?.password){
            if (id !== undefined) {
                const res =  await putJoinGroup(id, password)
                setIsJoined(true)
                setIsJoined(true)
                setNotMatchPass(false);
                setPassword("");
                setIsOpenPasswordWindow(false);
            }else{
                throw new Error("Exception! group ID is null")
            }
        }else{
            setNotMatchPass(true);
            setPassword("");
        }
    }

    return (
        <>
            <div className={styles.participation_btn_container}>
                <div className={styles.participation_btn_body}>
                    <Button className={styles.participation_btn} onClick={()=>{participationGroup()}}>
                        <h3 className={styles.participation_btn_h3}>グループに参加</h3>
                    </Button>
                </div>
            </div>
            <Modal
                isOpen={isopenpasswordwindow}
                onRequestClose={()=>{
                    setIsOpenPasswordWindow(false);
                }}
                style={modalStyle}
                ariaHideApp={false}
            >
                <div className={styles.group_home_modal_container}>
                    {notmatchpass && <p className={styles.results_table_p_red}>パスワードが一致しません</p>}
                    <TextField
                        placeholder="パスワード"
                        type="text"
                        defaultValue={password}
                        onChange={(e) => setPassword(e.target.value)}
                    />
                    <div className={styles.group_home_modal_btn}>
                        <Button
                            // disabled={password!==group.password}
                            variant="contained"
                            color="primary"
                            onClick={()=>{participationGroupWithPassword()}}
                        >
                            グループに参加
                        </Button>
                    </div>
                </div>
            </Modal>
        </>
    )
}

export default JoinGroup
