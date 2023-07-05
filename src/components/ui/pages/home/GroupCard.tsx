import { Button,  } from '@material-ui/core';
import React from 'react';
import styles from "./styles/Home.module.css";
import groupImage from '../../../../assets/img/zunda.jpg';
import { GroupBasicSchema } from '../../../types/GroupTypes';
import { useSetRecoilState } from 'recoil';
import { selectedGroupState } from '../../../../states/GroupState';
import { useNavigate } from 'react-router-dom';

const GroupCard:React.FC<GroupBasicSchema> = (group) => {
    const navigate = useNavigate();
    return (
        <>
            <Button onClick={()=>{navigate(`/group/${group.id}`)}}> 
                <div className={styles.belonging_group_card_container}>
                    <div className={styles.belonging_group_body_left}>
                        {group.image!==null?
                            <img src={group.image} className={styles.belonging_group_img} alt="group_img"/>
                        :   <img src={groupImage} className={styles.belonging_group_img} alt="group_img"/>
                        }
                    </div>
                    <div className={styles.belonging_group_body_right}>
                        <div className={styles.belonging_group_title}>
                            <div className={styles.belonging_group_h3}>{group.title}</div>
                        </div>
                        <div className={styles.belonging_group_text}>
                            <div className={styles.belonging_group_p}>{group.text}</div>
                        </div>
                    </div>
                    
                </div>
            </Button>
        </>
    )
}

export default GroupCard
