import {useState} from 'react'
import { Formik } from "formik";
import {Button,TextField} from "@material-ui/core";
import * as Yup from "yup";
import Modal from "react-modal";
import styles from './styles/Auth.module.css';
import { firebaseAuth } from '../../../../firebase';
import { createUserWithEmailAndPassword, sendEmailVerification, signInWithEmailAndPassword } from 'firebase/auth';
import { useNavigate } from "react-router-dom";
import { useSetRecoilState } from 'recoil';
import { authState } from '../../../../states/AuthState';
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
const SignUp = () => {
    const [sendEmail,setSendEmail]=useState(false);
    const [successCreateAccount,setSuccessCreateAccount]=useState(false);
    const [signUpErrorMessage, setSignUpErrorMessage]=useState("このメールアドレスは既に登録されています")
    const setAuth = useSetRecoilState(authState);
    const navigate = useNavigate();

    return (
      <>
      <div className="auth_container">
          <Formik
              initialErrors={{ email: "required" }}
              initialValues={{ email: "", password: "",confirm_password:"" }}    
              onSubmit={async (values) => {
                try {
                    const res = await createUserWithEmailAndPassword(
                      firebaseAuth,
                      values.email,
                      values.password
                    );
                    // この時点でログインさせる
                    const auth = await signInWithEmailAndPassword(
                        firebaseAuth,
                        values.email,values.password
                    )

                    if (auth.user) {
                        setAuth(auth.user);
                        // if(auth.user.emailVerified){
                        //     setAuth(auth.user);
                        //     navigate("/");
                        // } else{
                        //     setLoginErrorMessage("メールアドレス認証が行われておりません")
                        //     setfalseLogin(true);
                        // }
                    }else{
                        alert("ログイン失敗")
                    }
                    const actionCodeSettings = {
                        url: 'https://groupmahjongrecord.com/varify_email' ,
                        // url: 'http://localhost:3000/varify_email'
                    }  
                    await sendEmailVerification(res.user, actionCodeSettings)
                    navigate("/sent_email")
                  } catch(error) {
                    alert(error);
                  }
              }
          }
              //バリデーション
              validationSchema={Yup.object().shape({
                  email: Yup.string()
                          .email("メールアドレスのフォーマットが不正です。")
                          .required("メールアドレスは必須です。"),
                  password: Yup.string().required("パスワードは必須です。").min(8),
                  confirm_password:Yup.string().required("確認パスワードは必須です。").oneOf([Yup.ref("password")], "Passwords must match")
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
                      {successCreateAccount
                      ?
                          <div>
                              <p className={styles.login_failure_p}>このメールアドレスは既に登録されています</p>
                          </div>:null}
                      <div className="">
                          <h2 className={styles.login_signup_h2}>アカウント作成</h2>
                      </div>
                      
                      <form onSubmit={handleSubmit}>
                          <div >
                              <TextField
                                  className={styles.textfield}
                                  placeholder="  メールアドレス"
                                  type="input"
                                  name="email"
                                  fullWidth
                                  onChange={handleChange}//formikのバリデーションを走らせる
                                  onBlur={handleBlur}//マウスが外れた時に走らせる
                                  value={values.email}
                              />
                              <br />
                              {touched.email && errors.email ? (
                                  <div >{errors.email}</div>
                                  ) : null}
                              <br />
                              <TextField
                                  className={styles.textfield}
                                  placeholder="  パスワード"
                                  type="password"
                                  name="password"
                                  fullWidth
                                  onChange={handleChange}
                                  onBlur={handleBlur}
                                  value={values.password}
                              />
                              {touched.password && errors.password ? (
                                  <div >{errors.password}</div>
                                  ) : null}
                              <br />
                              <br/>
                              <TextField
                                  className={styles.textfield}
                                  placeholder="  確認の為もう一度パスワードを入力"
                                  type="password"
                                  name="confirm_password"
                                  fullWidth
                                  onChange={handleChange}
                                  onBlur={handleBlur}
                                  value={values.confirm_password}
                              />
                              {touched.confirm_password && errors.confirm_password ? (
                                  <div >{errors.confirm_password}</div>
                                  ) : null}
                              <div className="">
                                  <br/>
                                  <Button variant="contained" color="primary" disabled={!isValid} type="submit">
                                      アカウント作成
                                  </Button>
                                  <br/>
                              </div>
                          </div>
                      </form>
                  </div>
              )}
          </Formik>
      </div>
      <Modal
              isOpen={sendEmail}
              onRequestClose={()=>{
                  setSendEmail(false);
              }}
              style={modalStyle}
              ariaHideApp={false}
          >
              <div className={styles.send_mail_container}>
              <div>
                  <p className={styles.send_mail_p}>ご登録いただいたメールアドレスに確認メールを送信しました。</p>
                  <p className={styles.send_mail_p}>メールより本登録をお願いします。</p>
              </div>
              <div>
                  <Button
                      variant="contained" color="primary"
                      onClick={()=>{setSendEmail(false)}}
                  >
                      OK
                  </Button>
              </div>
              </div>
      </Modal>
      </>
    )
}

export default SignUp


