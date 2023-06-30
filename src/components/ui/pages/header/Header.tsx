import React,{useEffect, useState} from 'react'
import { Link, useLocation,useParams} from 'react-router-dom';
import styles from "./styles/Header.module.css";
import { useRecoilValue, useSetRecoilState } from 'recoil';
import authState from '../../../../states/Auth';
import { useNavigate } from "react-router-dom";
import HeaderDrawer from './HeaderDrawer';


const Header:React.FC = () => {
    return (
        <>
            <div className={styles.header_container}>
                <div className={styles.header_body}>
                    <div className={styles.header_body_left}>
                        <HeaderDrawer/>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Header
