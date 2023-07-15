import { Avatar, Button } from '@material-ui/core';
import React, { useEffect, useState } from 'react'
 import styles from "../styles/Group.module.css";
import { useParams } from 'react-router-dom';
import { getPersonalRecordPerProfile } from '../../../../../lib/api/GroupApi';
import { PersonalRecordPerProfileSchema } from '../../../../types/ProfileTypes';
import { LineChart, Line, CartesianGrid, YAxis } from 'recharts';

const MemberDetail:React.FC = () => {
    const {id, profile_id} = useParams();
    const [personalRecord, setPersonalRecord] = useState<PersonalRecordPerProfileSchema>(null);
    useEffect(()=>{
        const fetchLoader = async ()=>{
            if (id !== undefined && profile_id !== undefined){
                const personalRecordResponse = await getPersonalRecordPerProfile(false, profile_id);
                console.log(personalRecordResponse);
                setPersonalRecord(personalRecordResponse)
            }
        };
        fetchLoader();
    },[]);

    
    return (
        <div>
            {
                personalRecord !== null
                ?
                <>
                    <div className={styles.membder_detail_container}>
                        <div className={styles.member_detail_profile_conainer}>
                            <div className={styles.member_detail_profile_body_left}>
                                {personalRecord.image!==null?
                                    <Avatar alt="who?" src={personalRecord.image} style={{height:'150px',width:'150px', border: '1px solid'}}/>
                                :null}
                            </div>
                            <div className={styles.member_detail_profile_body_right}>
                                <div>
                                    <div className={styles.member_detail_nick_name}>{personalRecord.nick_name}</div>
                                </div>
                                <div>
                                    <div className={styles.member_detail_rank}>{personalRecord.rank_name}</div>
                                </div>
                                {personalRecord.rate4!== null && personalRecord.rate4!==undefined && personalRecord.point!==null &&  personalRecord.point!==undefined && (
                                    <div className={styles.member_detail_progress_container}>
                                        <progress value={personalRecord.rate4} max={personalRecord.point} />
                                        <div className={styles.member_detail_progress_number}>{personalRecord.rate4}/{personalRecord.point}</div>
                                    </div>
                                )}
                            </div>
                        </div>
                        <div className={styles.member_detail_chart_conainer}>
                            <LineChart  width={440} height={120} data={personalRecord.recent_rank.reverse()} margin={{ top: 15, right: 5, bottom: 5, left: 0 }}>
                                <CartesianGrid stroke="#ccc" />
                                <YAxis type="number" ticks={[1,2,3,4]} tickSize={0} reversed domain={[1,4]}/>
                                <Line  dataKey="rank" stroke="#8884d8" strokeWidth={4}  dot={{ stroke: 'blue', strokeWidth: 3 }} isAnimationActive={false}/>
                            </LineChart>
                        </div>
                        <div className={styles.member_detail_record_container}>
                            <div className={styles.member_detail_maxmin_score_container}>
                                <div className={styles.member_detail_maxmin_score_body}>
                                    <div>最高スコア: {personalRecord.max_score_origin}</div>
                                    <div>最低スコア: {personalRecord.min_score_origin}</div>
                                </div>
                            </div>
                            <div className={styles.member_detail_grade_container}>
                                <div className={styles.member_detail_grade_body_left}>
                                    <div>対局数: {personalRecord.game_count}回</div>
                                    <div>平均順位: {personalRecord.rank_average}位</div>
                                    <div>1位回数: {personalRecord.rank1}回</div>
                                    <div>2位回数: {personalRecord.rank2}回</div>
                                    <div>3位回数: {personalRecord.rank3}回</div>
                                    <div>4位回数: {personalRecord.rank4}回</div>
                                </div>
                                <div className={styles.member_detail_grade_body_right}>
                                    <div>合計スコア: {personalRecord.total_score}</div>
                                    <div>平均スコア: {personalRecord.score_average}</div>
                                    <div>トップ率: {personalRecord.top_rate}%</div>
                                    <div>ラス率: {personalRecord.last_rate}%</div>
                                    <div>連対率: {personalRecord.winning_rate}%</div>
                                    <div>飛び率: {personalRecord.tobi_rate}%</div>
                                </div>
                            </div>
                        </div>
                    </div>
                </>
                :null
            }
        </div>
    )
}

export default MemberDetail
