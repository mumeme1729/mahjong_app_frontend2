import React,{useEffect,useState }  from 'react'

import styles from "./styles/Group.module.css";
import gameResultRableStyles from "../../../../assets/css/GameResultTable.module.css"
import { Button, CircularProgress, makeStyles, TextField,} from '@material-ui/core';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';

// import Modal from "react-modal";
import groupImage from '../../../../assets/img/zunda.jpg';
import { useRecoilValue } from 'recoil';
import { recentlyGamesState, selectedGroupState } from '../../../../states/GroupState';
import GameResultContainer from '../game/GameResultContainer';

const GroupInfo:React.FC = () => {
    const recentlyGame = useRecoilValue(recentlyGamesState);
    return (
        <>
            <Table className={gameResultRableStyles.table} size="small" aria-label="a dense table" >
                <TableHead>
                    <TableRow>
                        <TableCell><p className={gameResultRableStyles.results_table_p}>日付</p></TableCell>
                        <TableCell><p className={gameResultRableStyles.results_table_p}>1位</p></TableCell>
                        <TableCell><p className={gameResultRableStyles.results_table_p}>2位</p></TableCell>
                        <TableCell><p className={gameResultRableStyles.results_table_p}>3位</p></TableCell>
                        <TableCell><p className={gameResultRableStyles.results_table_p}>4位</p></TableCell>
                    </TableRow>
                </TableHead>
                {Object.keys(recentlyGame).map((key)=>(
                <TableBody  key={key} className={gameResultRableStyles.gameresult_container}>
                    <GameResultContainer  gameresults={recentlyGame[key]}/>
                </TableBody>
                ))}
            </Table>
        </>
    )
}

export default GroupInfo
