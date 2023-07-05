import React,{useEffect,useState }  from 'react'

import styles from "./styles/Group.module.css";
import { Button, CircularProgress, makeStyles, TextField,} from '@material-ui/core';
// import Table from '@material-ui/core/Table';
// import TableBody from '@material-ui/core/TableBody';
// import TableCell from '@material-ui/core/TableCell';
// import TableHead from '@material-ui/core/TableHead';
// import TableRow from '@material-ui/core/TableRow';

// import Modal from "react-modal";
import groupImage from '../../../../assets/img/zunda.jpg';
import { useRecoilValue } from 'recoil';
import { selectedGroupState } from '../../../../states/GroupState';

const GroupInfo:React.FC = () => {
    const group = useRecoilValue(selectedGroupState);
    return (
        <>
           <div className={styles.groupinfo_container}>
                <div className={styles.groupinfo_body_left}>
                    <div>
                        {group?.image!==null?
                            <img src={group?.image} className={styles.groupinfo_img} alt="group_img"/>
                        :   <img src={groupImage} className={styles.groupinfo_img} alt="group_img"/>
                        }
                    </div>
                </div>
                <div className={styles.groupinfo_body_right}>
                    <div className={styles.groupinfo_title}>
                        <div className={styles.groupinfo_title_h2}>{group?.title}</div>
                    </div>
                    <div className={styles.groupinfo_text}>
                        <div>{group?.text}</div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default GroupInfo
