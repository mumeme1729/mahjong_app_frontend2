import React,{useEffect,useState }  from 'react'
import gameResultStyles from "../../../../assets/css/GameResultTable.module.css"
import { useRecoilValue } from 'recoil';
import { recentlyGamesState, selectedGroupState } from '../../../../states/GroupState';
import GameResultContainer from '../game/GameResultContainer';

const RecentlyGameContainer:React.FC = () => {
    const recentlyGame = useRecoilValue(recentlyGamesState);
    return (
        <>
            <div className={gameResultStyles.table}>
                <div  className={gameResultStyles.gameresult_container}>
                    <div className={gameResultStyles.gameresult_info_container}>
                        <div className={gameResultStyles.gameresult_info_body}>
                            <div className={gameResultStyles.results_table_p}>1位</div>
                        </div>
                        <div className={gameResultStyles.gameresult_info_body}>
                            <div className={gameResultStyles.results_table_p}>2位</div>
                        </div>
                        <div className={gameResultStyles.gameresult_info_body}>
                            <div className={gameResultStyles.results_table_p}>3位</div>
                        </div>
                        <div className={gameResultStyles.gameresult_info_body}>
                            <div className={gameResultStyles.results_table_p}>4位</div>
                        </div>
                    </div>
                </div>
                {Object.keys(recentlyGame).map((key)=>(
                    <div  key={key}>
                        <GameResultContainer  gameresults={recentlyGame[key]} id={key}/>
                    </div>
                ))}
            </div>
        </>
    )
}

export default RecentlyGameContainer
