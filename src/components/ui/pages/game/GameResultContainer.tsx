
import React, { useState } from 'react'
import TableCell from '@material-ui/core/TableCell';
import styles from "./styles/Game.module.css";
import { Avatar, Button,TableRow, TextField } from '@material-ui/core';
import Modal from "react-modal";
import { GamesResultBasicSchema } from '../../../types/GameTypes';

const GameResultsContainer:React.FC<{gameresults:GamesResultBasicSchema[]}> = ({gameresults}) => {
    return (
        <>
            <div>
                <TableRow key={gameresults[0].id+gameresults[0].created_at} onClick={()=>{
                    }} className={styles.gameresult_container}>
                    <TableCell  >{gameresults[0].created_at}</TableCell>
                    {gameresults.map((result)=>(
                        <TableCell component="th" scope="row" key={result.id} >
                            <p className={styles.results_table_p}>NO NAME</p>
                            <p className={styles.results_table_p}>{result.score} </p>
                        </TableCell> 
                    ))}
                </TableRow>
            </div>
        </>
    )
}

export default GameResultsContainer
