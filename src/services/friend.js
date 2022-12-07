import oracledb from 'oracledb';
import oracleDbHelper from '../db/index.js';
import { TypeChecker } from '../utils/index.js';
import FriendQuery from '../query/friend.js';

export default {
    /**
     * @namedparam
     * @param { Object } data
     * @property { Number } userId_1 - data.userId_1, 친구 1
     * @property { Number } userId_2 - data.userId_2, 친구 2
     * 
     * @return { Object } 
     * @property { Boolean } status
     * @property { Number } friendId
     * 
     * @description
     * ```js
     * // 친구 생성이 정상적으로 완료되고, 해당 정보가 DB에 저장 됐을 경우
     * { 
     *  status : true, 
     *  data: {
     *          friendId: 0
     *      }
     * } 
     * 
     * // parameter 타입이 맞지 않을 경우
     * // 친구 생성이 완료되지 않았을 경우
     * // 해당 정보가 DB에 저장되지 않았을 경우
     * { status : false }
     * ```
     */
    createFriend: async ({ userId_1, userId_2 }) => {
        const typeCheckData = [
            [userId_1, userId_2],
            ['number', 'number'],
        ];

        const typeCheckResult = TypeChecker.typeCheckAll({ objectList: typeCheckData[0], typeList: typeCheckData[1] });

        if (!typeCheckResult) {
            return false;
        }

        const bind = [
            userId_1,
            userId_2,
            Date.now(),
            {
                dir: oracledb.BIND_OUT,
                type: oracledb.NUMBER
            }
        ];

        const option = {
            autoCommit: true
        };

        try {
            const result = await oracleDbHelper.connection.execute(FriendQuery.createFriend, bind, option);
            const data = {
                titleId: result.outBinds[0][0]
            };
            return { status: true, data: data };
        } catch (e) {
            console.log(e);
            return { status: false };
        }
    },
    /**
     * @namedparam
     * @param { Object } data
     * @property { Number } userId - data.userId, 현재 유저 index
     * 
     * @return { Object } 
     * @property { Boolean } status
     * @property { Array<User> } data
     * 
     * @description
     * ```js
     * // 친구 검색이 완료 되었을 경우
     * { 
     *  status : true, 
     *  data: []
     * } 
     * 
     * // parameter 타입이 맞지 않을 경우
     * // 친구 검색이 완료되지 않았을 경우
     * // 해당 정보가 DB에 저장되지 않았을 경우
     * { status : false }
     * ```
     */
     searchFriendByUserId: async ({ userId }) => {
        if(!TypeChecker.isNumber(userId)) {
            return { status: false };
        }

        const bind = [
            userId
        ];

        const option = {
            autoCommit: true
        };

        try {
            const result = await oracleDbHelper.connection.execute(FriendQuery.searchFriendByUserId, bind, option);
            return { status: true, data: result.rows };
        } catch (e) {
            console.log(e);
            return { status: false };
        }
    },
    /**
    * @namedparam
    * @param { Object } data
    * @property { Number } userId_1 - data.userId_1, 친구 1
    * @property { Number } userId_2 - data.userId_2, 친구 2
    * 
    * @return { Object } 
    * @property { Boolean } status
    * @property { Number } friendId
    * 
    * @description
    * ```js
    * // 친구 삭제가 정상적으로 완료되고, 해당 정보가 DB에 저장 됐을 경우
    * { 
    *  status : true, 
    *  data: {
    *          friendId: 0
    *      }
    * } 
    * 
    * // parameter 타입이 맞지 않을 경우
    * // 친구 삭제가 완료되지 않았을 경우
    * // 해당 정보가 DB에 저장되지 않았을 경우
    * { status : false }
    * ```
    */
    deleteFriendRequest: async ({ userId_1, userId_2 }) => {
        const typeCheckData = [
            [userId_1, userId_2],
            ['number', 'number'],
        ];
        const typeCheckResult = TypeChecker.typeCheckAll({ objectList: typeCheckData[0], typeList: typeCheckData[1] });

        if (!typeCheckResult) {
            return false;
        }

        const bind = [
            userId_1,
            userId_2
        ];

        const option = {
            autoCommit: true
        };

        try {
            const result = await oracleDbHelper.connection.execute(FriendQuery.deleteFriend, bind, option);
            return { status: true };
        } catch (e) {
            console.log(e);
            return { status: false };
        }
    },
}