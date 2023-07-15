import { Button, CircularProgress, TextField } from '@material-ui/core';
import React, { useLayoutEffect, useState } from 'react'
import TableCell from '@material-ui/core/TableCell';
import TableRow from '@material-ui/core/TableRow';
import styles from "./styles/Game.module.css";
import gameResultStyles from "../../../../assets/css/GameResultTable.module.css"
import { GameGradeProfileBasicSchema } from '../../../types/ProfileTypes';


const RecordCard:React.FC<GameGradeProfileBasicSchema> = (grade) => {
    
    return (
            <TableRow>
                <TableCell style={{ position: 'sticky', left: 0, backgroundColor: '#fafafa'}}><div className={styles.results_table_p}>{grade?.nick_name}</div></TableCell>
                <TableCell>
                    {grade?.total_score !== undefined && grade?.total_score>=0?
                        <div className={gameResultStyles.results_table_p_blue}>{grade?.total_score}</div>
                    :<div className={gameResultStyles.results_table_p_red}>{grade?.total_score}</div>}
                </TableCell>
                <TableCell><div className={styles.results_table_p}>{grade?.game_count}</div></TableCell>
                <TableCell><div className={styles.results_table_p}>{grade?.rank_average.toFixed(1)}</div></TableCell>
                <TableCell><div className={styles.results_table_p}>{grade?.rank1}</div></TableCell>
                <TableCell><div className={styles.results_table_p}>{grade?.rank2}</div></TableCell>
                <TableCell><div className={styles.results_table_p}>{grade?.rank3}</div></TableCell>
                <TableCell><div className={styles.results_table_p}>{grade?.rank4}</div></TableCell>
                <TableCell><div className={styles.results_table_p}>{grade?.score_average.toFixed(1)}</div></TableCell>
                <TableCell><div className={styles.results_table_p}>{grade?.top_rate.toFixed(1)}</div></TableCell>
                <TableCell><div className={styles.results_table_p}>{grade?.last_rate.toFixed(1)}</div></TableCell>
                <TableCell><div className={styles.results_table_p}>{grade?.winning_rate.toFixed(1)}</div></TableCell>
            </TableRow>
    )

    

}

export default RecordCard
