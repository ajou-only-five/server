import oracledb from 'oracledb';
import oracleDbHelper from '../db/index.js';
import { TypeChecker } from '../utils/index.js';
import FriendRequestedQuery from '../query/friendRequest';

export default {
    /**
     * @namedparam
     * @param { Object } data
     * @property { Number } followerId - data.followerId, 친구 요청 보낸 사람
     * @property { Number } followeeId - data.followeeId, 친구 요청 받은 사람
     * 
     * @return { Object } 
     * @property { Boolean } status
     * @property { Number } friendRequestId
     * 
     * @description
     * ```js
     * // 친구 요청 생성이 정상적으로 완료되고, 해당 정보가 DB에 저장 됐을 경우
     * { 
     *  status : true, 
     *  data: {
     *          friendRequestId: 0
     *      }
     * } 
     * 
     * // parameter 타입이 맞지 않을 경우
     * // 친구 요청 생성이 완료되지 않았을 경우
     * // 해당 정보가 DB에 저장되지 않았을 경우
     * { status : false }
     * ```
     */
    createFriendRequest: async ({ followerId, followeeId }) => {
        const typeCheckData = [
            [followerId, followeeId],
            ['number', 'number'],
        ];

        const typeCheckResult = TypeChecker.typeCheckAll({ objectList: typeCheckData[0], typeList: typeCheckData[1] });

        if (!typeCheckResult) {
            return false;
        }

        const bind = [
            followerId,
            followeeId,
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
            const result = await oracleDbHelper.connection.execute(FriendRequestedQuery.createFriendRequest, bind, option);
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
    * @property { Number } followerId - data.followerId, 친구 요청 보낸 사람
    * @property { Number } followeeId - data.followeeId, 친구 요청 받은 사람
    * 
    * @return { Object } 
    * @property { Boolean } status
    * @property { Number } friendRequestId
    * 
    * @description
    * ```js
    * // 친구 요청 삭제가 정상적으로 완료되고, 해당 정보가 DB에 저장 됐을 경우
    * { 
    *  status : true, 
    *  data: {
    *          friendRequestId: 0
    *      }
    * } 
    * 
    * // parameter 타입이 맞지 않을 경우
    * // 친구 요청 삭제가 완료되지 않았을 경우
    * // 해당 정보가 DB에 저장되지 않았을 경우
    * { status : false }
    * ```
    */
    deleteFriendRequest: async ({ followerId, followeeId }) => {
        const typeCheckData = [
            [followerId, followeeId],
            ['number', 'number'],
        ];

        const typeCheckResult = TypeChecker.typeCheckAll({ objectList: typeCheckData[0], typeList: typeCheckData[1] });

        if (!typeCheckResult) {
            return false;
        }

        const bind = [
            followerId,
            followeeId,
            {
                dir: oracledb.BIND_OUT,
                type: oracledb.NUMBER
            }
        ];

        const option = {
            autoCommit: true
        };

        try {
            const result = await oracleDbHelper.connection.execute(FriendRequestedQuery.deleteFriendRequest, bind, option);
            const data = {
                titleId: result.outBinds[0][0]
            };
            return { status: true, data: data };
        } catch (e) {
            console.log(e);
            return { status: false };
        }
    },
}