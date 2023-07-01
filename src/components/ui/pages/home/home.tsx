import React,{ useEffect, useState} from 'react'
import { useRecoilValue, useSetRecoilState } from 'recoil';
import loginUserState from '../../../../states/User';
import { getLoginUserinfo } from '../../../../lib/api/userApi';
import { LoginUserInfo } from '../../../types/auth/user_types';
import authState from '../../../../states/Auth';
import { GroupBasicSchema } from '../../../types/auth/group_types';
import { group } from 'console';
// import { useHistory } from 'react-router-dom';
// import { AppDispatch } from "../../../../app/store";
// import { fetchAsyncGetMyProf,selectLoginUserProfile } from '../../../stores/auth/authSlice';
// import { fetchAsyncGetBelongToGroup, selectBelongToGroup } from '../../../stores/home/homeSlice';
// import BelongToGroupList from './BelongToGroupList';
// import styles from "./Home.module.css";
// import Search from './Search';

const Home:React.FC = () => {
    const setLoginUserInfo = useSetRecoilState(loginUserState);
    const [loginUserGroup, setLoginUserGroup] = useState<GroupBasicSchema[]|null|undefined>(null);
    // const [loginUser, setLoginUser] = useState<LoginUserInfo|null>(null)
    const loginUser = useRecoilValue(loginUserState)

    useEffect(()=>{
        const fetchLoader = async ()=>{
            try {
                const loginUserInfo = await getLoginUserinfo()
                console.log(loginUserInfo)
                setLoginUserInfo(loginUserInfo)
            } catch (error) {
                console.log(error)
            }
        }
       fetchLoader()
    },[]);

    return (
        <div>
            {/* <Search/>
            <div className={styles.home_container}>
                {belongtogroup.length!==0 && belongtogroup[0].id!==0?
                <div className={styles.home_grouplist_container}>
                    {belongtogroup.map((group)=>( 
                        group.profile.map((prof)=>(
                            prof.is_active &&prof.userProfile===loginUserProfile.userProfile && <BelongToGroupList key={group.id} {...group}/>
                        ))
                    ))}
                </div>
                :<>参加しているグループはありません</>}
            </div> */}
            <div>
                ホーム
            </div>
            <div>
                {loginUser?.group?.map((group:GroupBasicSchema)=>(
                    <>
                        <p>
                            {group.title}
                        </p>
                        <p>
                            {group.text}
                        </p>
                        <p>
                            {group.id}
                        </p>
                    </>   
                ))}
            </div>
        </div>
    )
}

export default Home
