import { Button, CircularProgress, TextField } from '@material-ui/core';
import React, { useLayoutEffect, useState } from 'react'
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import styles from "./styles/Game.module.css";
import { loginUserTotalRecordState } from '../../../../states/UserState';
import { useRecoilValue } from 'recoil';
import { GameGradeProfileBasicSchema, GameGradeProfileSchema } from '../../../types/ProfileTypes';
import RecordCard from './RecordCard';


const PersonalRecordContainer:React.FC<{gameGrades:GameGradeProfileBasicSchema[]}> = ({gameGrades}) => {
    
    return (
        <div className={styles.match_record_table}>
            <div className={styles.table_container}>
                <Table className={styles.table} size="small" aria-label="a dense table">
                    <TableHead>
                        <TableRow>
                            <TableCell style={{ position: 'sticky', left: 0, backgroundColor: '#fafafa' }}><div className={styles.results_table_p}>     </div></TableCell>
                            <TableCell><i className={styles.results_table_p}>合計スコア</i></TableCell>
                            <TableCell><i className={styles.results_table_p}>対局数</i></TableCell>
                            <TableCell><i className={styles.results_table_p}>平均順位</i></TableCell>
                            <TableCell><i className={styles.results_table_p}>1位回数</i></TableCell>
                            <TableCell><i className={styles.results_table_p}>2位回数</i></TableCell>
                            <TableCell><i className={styles.results_table_p}>3位回数</i></TableCell>
                            <TableCell><i className={styles.results_table_p}>4位回数</i></TableCell>
                            <TableCell><i className={styles.results_table_p}>平均スコア</i></TableCell>
                            <TableCell><i className={styles.results_table_p}>トップ率</i></TableCell>
                            <TableCell><i className={styles.results_table_p}>ラス率</i></TableCell>
                            <TableCell><i className={styles.results_table_p}>連対率</i></TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                    {
                        gameGrades !== null 
                        ?
                            gameGrades.map((grade:GameGradeProfileBasicSchema)=>(
                                grade.game_count!==0? <RecordCard  {...grade}/>:null
                            ))
                        :null 
                    }
                    </TableBody>
                </Table>
            </div>
        </div>
    )
}

export default PersonalRecordContainer
