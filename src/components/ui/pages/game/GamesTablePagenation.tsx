import React, { useState } from 'react';
import GameResultContainer from './GameResultContainer';
import { GameResultSchema } from '../../../types/GameTypes';
import gameResultStyles from "../../../../assets/css/GameResultTable.module.css"

const GamesTableagenation:React.FC<GameResultSchema> = (gameResult) => {
    // 1ページあたりの項目数
    const itemsPerPage = 8;
    
    // 現在のページ（0から始まる）
    const [currentPage, setCurrentPage] = useState(0);

    // 開始位置と終了位置を計算
    const startIndex = currentPage * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;

    return (
        <div>
            {/* 配列をスライスして表示 */}
            {Object.keys(gameResult).slice(startIndex, endIndex).map((key) => (
                <div key={key}>
                    <GameResultContainer gameresults={gameResult[key]} id={key} />
                </div>
            ))}

            {/* ページネーションのボタン */}
            <div className={gameResultStyles.pagenation}>
                <button className={gameResultStyles.pagenationButton} disabled={currentPage === 0} onClick={() => setCurrentPage(currentPage - 1)}>
                    前のページ
                </button>
                <button className={gameResultStyles.pagenationButton} disabled={startIndex + itemsPerPage >= Object.keys(gameResult).length} onClick={() => setCurrentPage(currentPage + 1)}>
                    次のページ
                </button>
            </div>
        </div>
    );
}

export default GamesTableagenation