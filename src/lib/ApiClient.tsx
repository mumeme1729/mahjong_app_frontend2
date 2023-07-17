import axios, { AxiosError, AxiosRequestConfig, AxiosResponse } from "axios";
import {authState} from '../states/AuthState';
import {RecoilRoot, useRecoilValue, useSetRecoilState} from "recoil"
import { firebaseAuth } from '../firebase';
import { useEffect } from "react";

const apiClient = axios.create({
    baseURL: "http://localhost:8000/"
});

export function ApiClientProvider({children}: {children: React.ReactElement[]| React.ReactElement}){
    useEffect(()=>{
        const requestInterceptors = apiClient.interceptors.request.use(async(config) => {
            const currentUser = firebaseAuth.currentUser;
            const idToken = await currentUser?.getIdToken()
            if (idToken && config.headers !== undefined) {
                config.headers.Authorization = `Bearer ${idToken}`
                console.log(idToken)
            }
            return config
        },(error) => {
            // リクエスト送信前のエラーハンドリングを記述
            return Promise.reject(error);
          })
        // レスポンス インターセプター
        const responseInterceptor = apiClient.interceptors.response.use(
            (response) => {
                return response
            },
            (error) => {
            switch (error.response?.status) {
                case 401:
                    return apiClient(error?.config);
                break
                default:
                break
            }
            return Promise.reject(error)
            }
        )
    return () => {
        apiClient.interceptors.request.eject(requestInterceptors)
        apiClient.interceptors.response.eject(responseInterceptor)
    }
    },[])

    return (<>{children}</>)
}



export default apiClient;