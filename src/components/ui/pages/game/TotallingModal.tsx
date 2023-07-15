import React,{ useEffect, useState} from 'react'
import styles from "../../../../assets/css/GameResultTable.module.css"
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Button from '@material-ui/core/Button';
import Modal from "react-modal";
import { GameGradeProfileBasicSchema } from '../../../types/ProfileTypes';
import { GameResultSchema } from '../../../types/GameTypes';

const modalStyle={
    overlay: {
        background: 'rgba(0, 0, 0, 0.2)',
        zIndex:4,
      },
    content: {  
      top: "50%",
      left: "50%",
      backgroundColor: 'white',
      width: 260,
      height: 420,
      transform: "translate(-50%, -50%)",
      },
};

function aggregateScores(gameResult: GameResultSchema): Record<string, number> {
    const result: Record<string, number> = {};
    
    Object.values(gameResult).forEach(array => {
      array.forEach((item) => {
        if(item.nick_name !== null){
            if ( result[item.nick_name]) {
                result[item.nick_name] += item.score;
              } else {
                result[item.nick_name] = item.score;
              }
        }
      });
    });
  
    return result;
  }
const TotallingModal:React.FC<GameResultSchema> = (gameResult) => {
    const [isopentotal,setOpenModal]=useState(false);
    const totalScores = aggregateScores(gameResult);
    return (
        <>
            <div className={styles.match_total}>
                <Button variant="outlined" color="secondary" onClick={()=>{setOpenModal(true)}}>集計</Button>
            </div>
            <Modal
                isOpen={isopentotal}
                onRequestClose={()=>{
                    setOpenModal(false)
                }}
                style={modalStyle}
                ariaHideApp={false}
            >
                <h3>集計結果</h3>
                <div>
                    <div className={styles.match_recode_table}>
                        <div>
                            <Table size="small" aria-label="a dense table">
                                <TableHead>
                                <TableRow>
                                    <TableCell><i className={styles.results_table_p}>名前</i></TableCell>
                                    <TableCell><i className={styles.results_table_p}>集計</i></TableCell>
                                </TableRow>
                                </TableHead>
                                <TableBody>
                                {
                                    totalScores !== null 
                                    ?
                                    Object.keys(totalScores).map((key)=>(
                                        <TableRow key={key}>
                                            <TableCell component="th" scope="row"><i className={styles.results_table_p}>{key}</i></TableCell>
                                            <TableCell>
                                                {totalScores[key]>=0?
                                                    <i className={styles.results_table_p_blue}>{((totalScores[key]*0.5)*100)%100===50 ? (totalScores[key]*0.5)*100 : (totalScores[key]*0.5)*100 }</i>
                                                :
                                                    <i className={styles.results_table_p_red}>{((totalScores[key]*0.5)*100)%100===-50 ? (totalScores[key]*0.5)*100 : (totalScores[key]*0.5)*100}</i>}
                                            </TableCell>
                                            </TableRow>
                                    ))
                                        // gameGrades.map((grade:GameGradeProfileBasicSchema)=>(
                                            // <TableRow key={grade.id}>
                                            // <TableCell component="th" scope="row"><i className={styles.results_table_p}>{grade.nick_name}</i></TableCell>
                                            // <TableCell>
                                            //     {grade.total_score>=0?
                                            //         <i className={styles.results_table_p_blue}>{((grade.total_score*0.5)*100)%100===50 ? (grade.total_score*0.5)*100 : (grade.total_score*0.5)*100 }</i>
                                            //     :
                                            //         <i className={styles.results_table_p_red}>{((grade.total_score*0.5)*100)%100===-50 ? (grade.total_score*0.5)*100 : (grade.total_score*0.5)*100}</i>}
                                            // </TableCell>
                                            
                                            // </TableRow>
                                        // ))
                                    :null 
                                }
                                    
                                </TableBody>
                            </Table>
                        </div>
                    </div>
                </div>
            </Modal>   
        </>
    )
}

export default TotallingModal
