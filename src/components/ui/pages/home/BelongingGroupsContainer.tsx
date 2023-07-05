import { Button,  } from '@material-ui/core';
import React from 'react';
import styles from "./styles/Home.module.css";
import { GroupBasicSchema } from '../../../types/GroupTypes';
import { useRecoilValue } from 'recoil';
import {loginUserState} from '../../../../states/UserState';
import GroupCard from './GroupCard';

const BelongGroupContainer:React.FC = () => {
    const loginUser = useRecoilValue(loginUserState)
    return (
        <>
           <div>
                {   loginUser?.group?.length !== 0
                ?
                    loginUser?.group?.map((group:GroupBasicSchema)=>(
                    <div className={styles.groups_container} key={group.id}>
                        <GroupCard {...group}/>
                    </div>
                    ))
                : <p>グループに参加していません</p>  
                }
            </div>
        </>
    )
}

export default BelongGroupContainer
