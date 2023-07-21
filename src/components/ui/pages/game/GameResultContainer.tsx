
import React, { useState } from 'react'
import TableCell from '@material-ui/core/TableCell';
import gameResultStyles from "../../../../assets/css/GameResultTable.module.css"
import { Avatar, Button,TableRow, TextField } from '@material-ui/core';
import Modal from "react-modal";
import { GamesResultBasicSchema } from '../../../types/GameTypes';

const GameResultsContainer:React.FC<{gameresults:GamesResultBasicSchema[]}> = ({gameresults}) => {
    // 1対局ごとの対局テーブル

    function modIsoDateString(isoTimeString:string){
        // ISO形式の時刻情報を yyyy年mm月dd日hh時MM分の形式に変換する
        let rateinfo:{rate_id:number,group_id:number,user_id:number,rate:number}[]=[];
        const dateTimeRegex = /^(\d{4})-(\d{2})-(\d{2})T(\d{2}):(\d{2})/;
        const [, year, month, day, hours, minutes] = isoTimeString.match(dateTimeRegex) || [];
        let dateString = `${year}年${month}月${day}日${hours}時${minutes}分`
        return dateString
    }
    // const isoTimeString = "2023-06-30T12:30:45.123Z";
    // const dateTimeRegex = /^(\d{4})-(\d{2})-(\d{2})T(\d{2}):(\d{2})/;
    // const [, year, month, day, hours, minutes] = isoTimeString.match(dateTimeRegex) || [];
    

    return (
        <>
            <div key={gameresults[0].id+gameresults[0].created_at} onClick={()=>{}} className={gameResultStyles.gameresult_container}>
                <div className={gameResultStyles.gameresult_created_date}>
                    <div className={gameResultStyles.gameresult_date_string}>
                        {modIsoDateString(gameresults[0].created_at)}
                    </div>
                </div>
                <div className={gameResultStyles.gameresult_info_container}>
                {gameresults.map((result)=>(
                    <div key={result.id+result.rank} className={gameResultStyles.gameresult_info_body}>
                        {/* <div className={gameResultStyles.results_table_p}>{result.rank}位</div> */}
                        <div className={gameResultStyles.results_table_p}>{result.nick_name}</div>
                        {result.score>=0?
                            <div className={gameResultStyles.results_table_p_blue}>{result.score}</div>
                        :<div className={gameResultStyles.results_table_p_red}>{result.score}</div>}
                    </div> 
                ))}
                </div>
            </div>
        </>
    )
}

export default GameResultsContainer
