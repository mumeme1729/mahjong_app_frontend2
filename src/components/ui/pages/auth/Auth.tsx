import React, {  useState, useEffect } from 'react'
import SignUp from './SignUp';
import Login from './Login';
import styles from './styles/Auth.module.css';
import { firebaseAuth } from '../../../../firebase';
import { signInWithEmailAndPassword, onAuthStateChanged } from 'firebase/auth';
import { useNavigate } from "react-router-dom";
import Home from '../home/Home';


const Auth:React.FC = () => {
    // const location = useLocation();
    const [isOpenSignIn, setIsOpenSignIn] = useState(true);
    const navigate = useNavigate();

    useEffect(() => {
        onAuthStateChanged(firebaseAuth, (currentUser) => {
          // if(currentUser && currentUser.emailVerified){
          if(currentUser && currentUser.emailVerified){
            navigate("/")
          }
        });
      }, []);

    return (
        <>
            <div className={styles.auth_container}>
                <div className={styles.auth_body}>
                    <div className={styles.auth_body_header_img}>
                        <div className={styles.auth_body_header}>
                            <br/>
                            <br/>
                            <h1 className={styles.auth_title_h1}>闘牌記 β版</h1>
                            <br/>
                            <p className={styles.auth_title_p}>グループごとに麻雀の成績を管理</p>
                        </div>
                        <div className={styles.auth_login_signup_container}>
                            <div className={styles.auth_login_signup}>
                                {isOpenSignIn
                                ?<>
                                    {/* サインイン  */}
                                    <Login/>
                                    <div className="">
                                        <div className={styles.switch_login_signup_btn_container}>
                                            <span className={styles.switch_login_signup_btn}>パスワードをお忘れですか？</span>
                                        </div>
                                    </div>
                                </>
                                :<> 
                                    {/* サインアップ */}
                                    <SignUp/>
                                </>}
                                <div className={styles.switch_login_signup_btn_container}>
                                    <span className={styles.switch_login_signup_btn} onClick={async () => {
                                                setIsOpenSignIn(!isOpenSignIn)
                                    }}>
                                        {isOpenSignIn
                                            ?<>
                                                アカウントをお持ちでない方はこちら
                                            </>
                                            :<> 
                                                アカウントをお持ちの方はこちら
                                            </>}
                                    </span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Auth


