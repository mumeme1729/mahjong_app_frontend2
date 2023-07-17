import React, {  useState, useEffect } from 'react'
import { firebaseAuth } from '../../../../firebase';
import { useRecoilValue, useSetRecoilState } from 'recoil';
import {authState} from '../../../../states/AuthState';
import firebase from 'firebase/auth';
import { signInWithEmailAndPassword, onAuthStateChanged } from 'firebase/auth';
import { useNavigate } from "react-router-dom";
import Home from '../home/Home';
import { UserRegist } from '../../../types/AuthTypes';
import { CommonResponse } from '../../../types/CommonTypes';
import { postUserRegister } from '../../../../lib/api/AuthApi';
import { isProfileModalOpenState } from '../../../../states/HomeState';
import { Formik } from "formik";
import {Button,TextField} from "@material-ui/core";
import * as Yup from "yup";
import styles from './styles/Auth.module.css';


const VerifyEmail:React.FC = () => {
    const setIsProfileModalOpen = useSetRecoilState(isProfileModalOpenState);
    const navigate = useNavigate();
    const [isLogin, setIsLogin] = useState<boolean>(true);
    const setAuth = useSetRecoilState(authState);
    const [falseLogin,setfalseLogin]=useState(false);
    const [loginErrorMessage, setLoginErrorMessage]=useState("ログインに失敗しました");

    useEffect(() => {
        onAuthStateChanged(firebaseAuth, async (currentUser) => {
          if(currentUser && currentUser.emailVerified){
            const register_data:UserRegist = {
                firebase_uid: currentUser.uid,
                is_active:true
            }
            try {
                const registerUser:CommonResponse = await postUserRegister(register_data);
                if (registerUser.status=="ok"){
                    setIsProfileModalOpen(true);
                    navigate("/")
                }
            } catch (error) {
                alert(error)
            }
         }else{
            // ログインしていない場合
            setIsLogin(false);

         }
    });
      }, []);

    return (
        <>
            <div className={styles.auth_container}>
                <p>認証が完了しました</p>
            </div>
            {
                isLogin
                ?null
                :
                <>
                    <div>以下のフォームからログインしてください</div>
                    <div className="auth_container">
                    <Formik
                        initialErrors={{ email: "required" }}
                        initialValues={{ email: "", password: ""}}

                        onSubmit={async (values) => {
                            try {
                                const auth = await signInWithEmailAndPassword(
                                    firebaseAuth,
                                    values.email,values.password
                                )

                                if(auth.user.emailVerified){
                                    // ログイン後、会員登録を行う
                                    setAuth(auth.user);
                                    const register_data:UserRegist = {
                                        firebase_uid: auth.user.uid,
                                        is_active:true
                                    }
                                    const registerUser:CommonResponse = await postUserRegister(register_data);
                                    if (registerUser.status=="ok"){
                                        setIsProfileModalOpen(true);
                                        navigate("/")
                                    }
                                } else{
                                    setLoginErrorMessage("メールアドレス認証が行われておりません")
                                    setfalseLogin(true);
                                }

                            } catch (error) {
                                alert(error);
                            }
                        }}
                        //バリデーション
                        validationSchema={Yup.object().shape({
                        email: Yup.string()
                            .email("メールアドレスのフォーマットが不正です。")
                            .required("メールアドレスは必須です。"),
                        password: Yup.string().required("パスワードは必須です。").min(4),
                        })}
                    >
                    {({
                        handleSubmit,
                        handleChange,
                        handleBlur,
                        values,
                        errors,
                        touched,
                        isValid,
                    }) => (
                            <div className={styles.auth_login_main_container}>
                                {/* <div className="css_styles.auth_progress">
                                    {isLoadingAuth && <CircularProgress />}
                                </div> */}
                                <div className={styles.auth_login_signup}>
                                    {falseLogin?<p className={styles.login_failure_p}>{loginErrorMessage}</p>:null}
                                    <div className="">
                                        <h2 className={styles.login_signup_h2}>ログイン</h2>
                                    </div>
                                    <form onSubmit={handleSubmit}>
                                        <div >
                                            <TextField
                                                className={styles.textfield}
                                                placeholder="  email"
                                                type="input"
                                                name="email"
                                                onChange={handleChange}//formikのバリデーションを走らせる
                                                onBlur={handleBlur}//マウスが外れた時に走らせる
                                                value={values.email}
                                                fullWidth
                                            />
                                            <br />
                                            {touched.email && errors.email ? (
                                            <div >{errors.email}</div>
                                            ) : null}
                                            <br />
                                            <TextField
                                                className={styles.textfield}
                                                placeholder="  password"
                                                type="password"
                                                name="password"
                                                onChange={handleChange}
                                                onBlur={handleBlur}
                                                value={values.password}
                                                fullWidth
                                            />
                                            {touched.password && errors.password ? (
                                            <div >{errors.password}</div>
                                            ) : null}
                                            <br />
                                            <br/>
                                            <div className="">
                                                <Button variant="contained" color="primary" disabled={!isValid} type="submit">ログイン</Button>
                                            </div>
                                            
                                        </div>
                                    </form>
                                </div>
                            </div>
                        )}
                    </Formik>
                </div>
                </>
            }
        </>
    )
}

export default VerifyEmail


