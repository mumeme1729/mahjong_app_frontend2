import React,{useState, useEffect} from 'react'
import { Formik } from "formik";
import {Button,TextField} from "@material-ui/core";
import * as Yup from "yup";
import styles from './styles/Auth.module.css';
import { firebaseAuth } from '../../../../firebase';
import { useSetRecoilState } from 'recoil';
import authState from '../../../../states/Auth';
import { signInWithEmailAndPassword, onAuthStateChanged } from 'firebase/auth';
import { useNavigate } from "react-router-dom";

const modalStyle={
    overlay: {
        background: 'rgba(0, 0, 0, 0.2)',
        zIndex:4,
      },
    content: {  
      top: "50%",
      left: "50%",
      backgroundColor: 'white',
      width: 260,
      height: 180,
      transform: "translate(-50%, -50%)",
      },
};
const Login:React.FC = () => {
    const setAuth = useSetRecoilState(authState);
    const [falseLogin,setfalseLogin]=useState(false);
    const [loginErrorMessage, setLoginErrorMessage]=useState("ログインに失敗しました");
    const [isloginloading,setIsLoginLoading]=useState(false);
    const navigate = useNavigate();

    return (

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
                        if (auth.user) {
                            setAuth(auth.user);
                            navigate("/");
                            // if(auth.user.emailVerified){
                            //     setAuth(auth.user);
                            //     navigate("/");
                            // } else{
                            //     setLoginErrorMessage("メールアドレス認証が行われておりません")
                            //     setfalseLogin(true);
                            // }
                        }
                    } catch (error) {
                        
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
                    <div className="auth_login_main_container">
                        {/* <div className="css_styles.auth_progress">
                            {isLoadingAuth && <CircularProgress />}
                        </div> */}
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
                )}
            </Formik>
        </div>
    )
}

export default Login
