import oracledb from 'oracledb';
import oracleDbHelper from '../db/index.js';
import { TypeChecker } from '../utils/index.js';
import OnlyFiveQuery from '../query/onlyFive.js';

export default Object.freeze({
    /**
     * @namedparam
     * @param { Object } data
     * @property { Number } userId - data.userId, 유저 id
     * 
     * @return { Object } 
     * @property { Boolean } status
     * @property { Array<Object> } data
     * 
     * @description
     * ```js
     * // 차트 목록이 조회 됐을 경우
     * { 
     *  status : true, 
     *  data: {
     *      user_id
     *      friend_id
     *      account
     *      nickname
     *      profile
     *      disclosure
     *      item_num
     *  }
     * } 
     * 
     * // parameter 타입이 맞지 않을 경우
     * // 친구 생성이 완료되지 않았을 경우
     * // 해당 정보가 DB에 저장되지 않았을 경우
     * { status : false }
     * ```
     */
    searchOnlyFiveByUserId: async ({ userId }) => {
        if(!TypeChecker.isInteger(userId)) {
            return { status: false };
        }

        const bind = [
            userId
        ];

        const option = { outFormat: oracledb.OUT_FORMAT_OBJECT };

        try {
            const result = await oracleDbHelper.connection.execute(OnlyFiveQuery.searchOnlyFiveByUserId, bind, option);
            return { status: true, data: result.rows };
        } catch (e) {
            console.log(e);
            return { status: false };
        }
    },
});