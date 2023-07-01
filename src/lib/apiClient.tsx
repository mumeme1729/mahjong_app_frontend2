import axios, { AxiosError, AxiosRequestConfig, AxiosResponse } from "axios";
import authState from '../states/Auth';
import {RecoilRoot, useRecoilValue, useSetRecoilState} from "recoil"
import { useEffect } from "react";

const apiClient = axios.create({
    baseURL: "http://localhost:8000/"
});

export function ApiClientProvider({children}: {children: React.ReactElement[]| React.ReactElement}){
    const user = useRecoilValue(authState);
    useEffect(()=>{
        const requestInterceptors = apiClient.interceptors.request.use(async(config) => {
            // --ヘッダにアクセストークンを埋める
          if (user) {
              const idToken = await user.getIdToken()
              console.log(idToken)
              config.headers.Authorization = `Bearer ${idToken}`
          }
          return config
        })
        // クリーンアップ
    return () => {
        apiClient.interceptors.request.eject(requestInterceptors)
        // axiosClient.interceptors.response.eject(responseInterceptor)
    }
    },[user])
    return (<>{children}</>)
}



export default apiClient;