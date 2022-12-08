import oracledb from 'oracledb';
import oracleDbHelper from '../db/index.js';
import { TypeChecker } from '../utils/index.js';
import FriendRequestedQuery from '../query/friendRequest.js';

export default Object.freeze({
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

        if (typeCheckResult) {
            return false;
        }

        const bind = [
            followerId,
            followeeId,
            new Date(Date.now()),
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
     * @property { Number } userId - data.userId, 현재 유저 index
     * 
     * @return { Object } 
     * @property { Boolean } status
     * @property { Array<User> } data
     * 
     * @description
     * ```js
     * // 현재 유저가 친구 추가 요청한 유저 목록 검색이 완료 되었을 경우
     * { 
     *  status : true, 
     *  data: []
     * } 
     * 
     * // parameter 타입이 맞지 않을 경우
     * // 현재 유저가 친구 추가 요청한 유저 목록 검색이 완료 되지 않았을 경우
     * { status : false }
     * ```
     */
     searchFriendRequestByUserId: async ({ userId }) => {
        if(!TypeChecker.isNumber(userId)) {
            return { status: false };
        }

        const bind = [
            userId
        ];

        try {
            const result = await oracleDbHelper.connection.execute(FriendRequestedQuery.searchFriendRequestByUserId, bind);
            return { status: true, data: result.rows };
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
     * // 현재 유저에게 친구 추가 요청한 유저 목록 검색이 완료 되었을 경우
     * { 
     *  status : true, 
     *  data: []
     * } 
     * 
     * // parameter 타입이 맞지 않을 경우
     * // 현재 유저에게 친구 추가 요청한 유저 목록 검색이 완료 되지 않았을 경우
     * { status : false }
     * ```
     */
     searchFriendRequestedByUserId: async ({ userId }) => {
        if(!TypeChecker.isNumber(userId)) {
            return { status: false };
        }

        const bind = [
            userId
        ];

        try {
            const result = await oracleDbHelper.connection.execute(FriendRequestedQuery.searchFriendRequestedByUserId, bind);
            return { status: true, data: result.rows };
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

        if (typeCheckResult) {
            return false;
        }

        const bind = [
            followerId,
            followeeId
        ];

        const option = {
            autoCommit: true
        };

        try {
            const result = await oracleDbHelper.connection.execute(FriendRequestedQuery.deleteFriendRequest, bind, option);
            return { status: true };
        } catch (e) {
            console.log(e);
            return { status: false };
        }
    },
});