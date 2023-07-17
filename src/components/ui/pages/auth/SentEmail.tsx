import React, {  useState, useEffect } from 'react'
import styles from './styles/Auth.module.css';


const SentEmail:React.FC = () => {
    return (
        <>
            <div className={styles.auth_container}>
                <p>認証メールを送信いたしました</p>
                <p>メールをご確認ください</p>
            </div>
        </>
    )
}

export default SentEmail


