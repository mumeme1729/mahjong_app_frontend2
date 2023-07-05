import { Avatar, Button, TextField } from '@material-ui/core';
import React, { useState } from 'react'
import Modal from "react-modal";
// import ImageTrimming from './ImageTrimming';
import styles from "./styles/Home.module.css";
import { useRecoilValue, useSetRecoilState } from 'recoil';
import { loginUserState } from '../../../../states/UserState';
import { isProfileModalOpenState } from '../../../../states/HomeState';
import { LoginUserInfo } from '../../../types/UserTypes';
import { putUpdateUserInfo } from '../../../../lib/api/UserApi';

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
const Profile:React.FC = () => {
    const [name,setName]=useState("");
    const [text,setText]=useState("");
    const loginuser = useRecoilValue(loginUserState);
    const setLoginUserInfo = useSetRecoilState(loginUserState);
    const setIsProfileModalOpen = useSetRecoilState(isProfileModalOpenState)
    const isProfileModalOpen =  useRecoilValue(isProfileModalOpenState)
    
    const updateProfile = async () => {
        try {
            let updateName:string=name;
            let updateText:string=text;
            if(updateName==="" && loginuser?.nick_name !== null && loginuser?.nick_name !== undefined){updateName=loginuser?.nick_name}
            if(updateText==="" && loginuser?.introduction !== null && loginuser?.introduction !== undefined){updateText=loginuser?.introduction}
            if(updateText===null){updateText=""}
            // 更新データ送信
            console.log(`UserInfoUpdate = ${updateName} ${updateText}`)
            const res = await putUpdateUserInfo(updateName, updateText)

            const updated_data:LoginUserInfo = {
                image:loginuser?.image,
                nick_name:updateName,
                introduction:updateText,
                group:loginuser?.group
            }
            setLoginUserInfo(updated_data)
            setIsProfileModalOpen(false)
        } catch (error) {
            console.log(error)
        }
        
    };

    return (
        <Modal
            isOpen={isProfileModalOpen}
            onRequestClose={async () => {
                setIsProfileModalOpen(false)
            }}
            style={modalStyle}
            ariaHideApp={false}
        >
            <div>
                <h2>プロフィールを編集</h2>
                <div>
                    <Button onClick={()=>{}}>
                    {
                            loginuser?.image !== null?
                                <Avatar alt="who?" src={loginuser?.image} style={{height:'70px',width:'70px'}}/>
                            :
                                <Avatar alt="who?" src={""} style={{height:'70px',width:'70px'}}/>
                        }
                    </Button>
                    {/* <ImageTrimming/> */}
                    <div>
                        <TextField placeholder="名前" type="text" defaultValue={loginuser?.nick_name} label="名前"
                            onChange={(e) => {
                                if(e.target.value.length<=20){
                                    setName(e.target.value)}
                                }
                            }/>
                    </div>
                </div>
                <br />
                <TextField placeholder="自己紹介" type="text" defaultValue={loginuser?.introduction} multiline fullWidth label="自己紹介"
                    onChange={(event) => {
                        if(event.target.value.length<=200){
                            setText(event.target.value)
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
                            プロフィール更新
                        </Button>
                    </div>
                </div>
            </div> 
        </Modal>
    )
}

export default Profile
