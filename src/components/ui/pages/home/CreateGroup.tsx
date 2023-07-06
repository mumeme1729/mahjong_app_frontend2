import { IconButton, TextField } from '@material-ui/core'
import React,{useState} from 'react'
import Modal from "react-modal";
import {Button} from "@material-ui/core";
import PhotoIcon from '@material-ui/icons/Photo';
// import { File } from "../../../types";
import { Navigate } from 'react-router-dom';
import styles from "./styles/Home.module.css";
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

const CreateGroup:React.FC = () => {
    const [openModal,setOpenModal]=useState<boolean>(false);
    const [groupName,setGroupName]=useState("")
    const [text,setText]=useState("")
    const [password,setPassword]=useState("")
    const [image, setImage] = useState<File | null>(null);
    let url="";
    const handlerEditPicture = () => {
        const fileInput = document.getElementById("imageInput");
        fileInput?.click();
    };

    if(image!==null){
    var binaryData = [];
    binaryData.push(image);
    url=window.URL.createObjectURL(new Blob(binaryData, {type: "image/*"}))
    }
    return (
        <>
            <div className={styles.create_group_container}>
                <div>
                    <Button variant="contained" color="primary" onClick={()=>setOpenModal(true)}>グループを作る</Button>
                </div>
            </div>
            <Modal
                isOpen={openModal}
                onRequestClose={()=>{
                    setOpenModal(false);
                    url="";
                    setImage(null);
                }}
                style={modalStyle}
                ariaHideApp={false}
            >
                <form >
                    <h2>グループ作成</h2>
                    <br />
                    <TextField
                        placeholder="グループ名"
                        helperText={`${groupName.length}/30`}
                        type="text"
                        onChange={(e) => {
                            if(e.target.value.length<=30){
                                setGroupName(e.target.value)
                            }
                        }}
                    />
                    <br/>
                    <TextField
                        placeholder="紹介文"
                        type="text"
                        helperText={`${text.length}/200`}
                        onChange={(e) => {
                            if(e.target.value.length<=200){
                                setText(e.target.value)
                            }
                        }}
                    />
                    <br/>
                    <TextField
                        placeholder="パスワード"
                        type="text"
                        onChange={(e) => setPassword(e.target.value)}
                    />
                    <input
                        type="file"
                        id="imageInput"
                        hidden={true}
                        onChange={(e) => setImage(e.target.files![0])}
                    />
                    <br />
                    <IconButton onClick={handlerEditPicture}>
                        <PhotoIcon />
                    </IconButton>
                    <div>
                        {url!==""?<img src={url} height="90px" alt="same_img"/>:null}
                    </div>
                    <br />
                    <Button
                        disabled={!(groupName &&groupName.length<=30)}
                        variant="contained"
                        color="primary"
                        onClick={()=>{}}
                    >
                        作成
                    </Button>
                </form>
            </Modal>
        </>
    )
}

export default CreateGroup
