import { Avatar, Button, TextField } from '@material-ui/core';
import React, { useState } from 'react'
import Modal from "react-modal";
// import ImageTrimming from './ImageTrimming';
import styles from "../../pages/home/styles/Home.module.css";
import { useRecoilValue, useSetRecoilState } from 'recoil';
import { LoginUserInfo } from '../../../types/UserTypes';
import { putUpdateUserInfo } from '../../../../lib/api/UserApi';
import { isImageTrimmingModalOpenState, trimedImageState } from '../../../../states/ImageTrimmingState';
import ImageTrimming from '../../../features/ImageTrimming';
import { isGroupEditModalOpenState, selectedGroupState } from '../../../../states/GroupState';
import { putUpdateGroupInfo } from '../../../../lib/api/GroupApi';
import { GroupHomeSchema } from '../../../types/GroupTypes';

const modalStyle={
    overlay: {
        background: 'rgba(0, 0, 0, 0.2)',
        zIndex:8,
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
const GroupEdit:React.FC = () => {
    const [title,setTitle]=useState("");
    const [text,setText]=useState("");
    const [password,setPassword]=useState("");
    const trimedImage = useRecoilValue(trimedImageState)
    const setSelectedGroupInfo = useSetRecoilState(selectedGroupState);
    const groupInfo = useRecoilValue(selectedGroupState)
    const setIsGroupEditModalOpenState = useSetRecoilState(isGroupEditModalOpenState);
    const setIsImageTrimmingModalOpen = useSetRecoilState(isImageTrimmingModalOpenState);
    const setTrimedImage = useSetRecoilState(trimedImageState)
    const isGroupEditModalOpen =  useRecoilValue(isGroupEditModalOpenState)
    
    const updateProfile = async () => {
        try {
            let updateTitle:string=title;
            let updateText:string=text;
            let updatePassword:string=password;
            if(updateTitle==="" && groupInfo?.title !== null && groupInfo?.title !== undefined){updateTitle=groupInfo?.title}
            if(updateText==="" && groupInfo?.text !== null && groupInfo?.text !== undefined){updateText=groupInfo?.text}
            if(updateText===null){updateText=""}
            if(updatePassword==="" && groupInfo?.password !== null && groupInfo?.password !== undefined){updatePassword=groupInfo?.password}
            if(updatePassword===null){updatePassword=""}
            // 更新データ送信
            const res = await putUpdateGroupInfo(groupInfo?.id, updateTitle,updateText,updatePassword,trimedImage)
            setSelectedGroupInfo(res)
            setTrimedImage(null)
            setIsGroupEditModalOpenState(false)
        } catch (error) {
            console.log(error)
        }
        
    };

    const createImageURL = (data:File) =>{
        const imageURL = window.URL.createObjectURL(data);
        return imageURL
    }

    return (
        <Modal
            isOpen={isGroupEditModalOpen}
            onRequestClose={async () => {
                setTrimedImage(null)
                setIsGroupEditModalOpenState(false)
            }}
            style={modalStyle}
            ariaHideApp={false}
        >
            <div>
                <h2>グループを編集</h2>
                <div>
                    <Button onClick={()=>{setIsImageTrimmingModalOpen(true)}}>
                    {
                            groupInfo?.image !== null && trimedImage === null?
                                <Avatar alt="who?" src={groupInfo?.image} style={{height:'70px',width:'70px'}}/>
                            :
                                trimedImage !== null?
                                    <Avatar alt="who?" src={createImageURL(trimedImage)} style={{height:'70px',width:'70px'}}/>
                                :
                                    <Avatar alt="who?" src={""} style={{height:'70px',width:'70px'}}/>
                        }
                    </Button>
                    <ImageTrimming/>
                    <div>
                        <TextField placeholder="グループ名" type="text" defaultValue={groupInfo?.title} label="タイトル"
                            onChange={(e) => {
                                if(e.target.value.length<=20){
                                    setTitle(e.target.value)}
                                }
                            }/>
                    </div>
                </div>
                <br />
                <TextField placeholder="紹介文" type="text" defaultValue={groupInfo?.text} multiline fullWidth label="紹介文"
                    onChange={(event) => {
                        if(event.target.value.length<=200){
                            setText(event.target.value)
                        }
                    }}/>
                <br/>
                <br/>
                <TextField placeholder="パスワード" type="text" defaultValue={groupInfo?.password} multiline fullWidth label="パスワード"
                    onChange={(event) => {
                        if(event.target.value.length<=200){
                            setPassword(event.target.value)
                        }
                    }}/>
                
                <div className={styles.profile_btn_container}>
                    <div className={styles.profile_btn}>
                        <Button
                            variant="contained"
                            color="primary"
                            type="submit"
                            onClick={updateProfile}
                        >
                            更新
                        </Button>
                    </div>
                </div>
            </div> 
        </Modal>
    )
}

export default GroupEdit
