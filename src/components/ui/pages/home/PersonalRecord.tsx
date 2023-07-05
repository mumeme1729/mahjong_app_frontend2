import { Button, CircularProgress, TextField } from '@material-ui/core';
import React, { useLayoutEffect, useState } from 'react'
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import styles from "./styles/Home.module.css";
import { loginUserTotalRecordState } from '../../../../states/UserState';
import { useRecoilValue } from 'recoil';


const PersonalRecord:React.FC = () => {
    const loginUserTotalRecord = useRecoilValue(loginUserTotalRecordState);
    
    return (
        <div className={styles.match_record_table}>
            <div className={styles.table_container}>
                <Table className={styles.table} size="small" aria-label="a dense table">
                    <TableHead>
                        <TableRow>
                            <TableCell><div className={styles.results_table_p}>対局数</div></TableCell>
                            <TableCell><div className={styles.results_table_p}>平均順位</div></TableCell>
                            <TableCell><div className={styles.results_table_p}>1位回数</div></TableCell>
                            <TableCell><div className={styles.results_table_p}>2位回数</div></TableCell>
                            <TableCell><div className={styles.results_table_p}>3位回数</div></TableCell>
                            <TableCell><div className={styles.results_table_p}>4位回数</div></TableCell>
                            <TableCell><div className={styles.results_table_p}>合計スコア</div></TableCell>
                            <TableCell><div className={styles.results_table_p}>平均スコア</div></TableCell>
                            <TableCell><div className={styles.results_table_p}>トップ率</div></TableCell>
                            <TableCell><div className={styles.results_table_p}>ラス率</div></TableCell>
                            <TableCell><div className={styles.results_table_p}>連対率</div></TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        <TableRow>
                            <TableCell><p className={styles.results_table_p}>{loginUserTotalRecord?.game_count}</p></TableCell>
                            <TableCell><p className={styles.results_table_p}>{loginUserTotalRecord?.rank_average.toFixed(1)}</p></TableCell>
                            <TableCell><p className={styles.results_table_p}>{loginUserTotalRecord?.rank1}</p></TableCell>
                            <TableCell><p className={styles.results_table_p}>{loginUserTotalRecord?.rank2}</p></TableCell>
                            <TableCell><p className={styles.results_table_p}>{loginUserTotalRecord?.rank3}</p></TableCell>
                            <TableCell><p className={styles.results_table_p}>{loginUserTotalRecord?.rank4}</p></TableCell>
                            <TableCell>
                                {loginUserTotalRecord?.total_score !== undefined && loginUserTotalRecord?.total_score>=0?
                                    <p className={styles.results_table_p_blue}>{loginUserTotalRecord?.total_score}</p>
                                :<p className={styles.results_table_p_red}>{loginUserTotalRecord?.total_score}</p>}
                            </TableCell>
                            <TableCell><p className={styles.results_table_p}>{loginUserTotalRecord?.score_average.toFixed(1)}</p></TableCell>
                            <TableCell><p className={styles.results_table_p}>{loginUserTotalRecord?.top_rate.toFixed(1)}</p></TableCell>
                            <TableCell><p className={styles.results_table_p}>{loginUserTotalRecord?.last_rate.toFixed(1)}</p></TableCell>
                            <TableCell><p className={styles.results_table_p}>{loginUserTotalRecord?.winning_rate.toFixed(1)}</p></TableCell>
                         </TableRow>
                    </TableBody>
                </Table>
            </div>
        </div>
    )

    

}

export default PersonalRecord
