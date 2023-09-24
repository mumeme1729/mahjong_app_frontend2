import React,{useEffect,useState }  from 'react'

import gameResultStyles from "../../../../assets/css/GameResultTable.module.css"
import { Button, CircularProgress, makeStyles, TextField,} from '@material-ui/core';

import GameResultContainer from './GameResultContainer';
import { GameResultSchema } from '../../../types/GameTypes';
import GamesTableagenation from './GamesTablePagenation';

const GamesTable:React.FC<GameResultSchema> = (gameResult) => {
    
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
                <GamesTableagenation {...gameResult}/>
                {/* {Object.keys(gameResult).map((key)=>(
                    <div  key={key}>
                        <GameResultContainer  gameresults={gameResult[key]} id={key}/>
                    </div>
                ))} */}
            </div>
        </>
    )
}

export default GamesTable
