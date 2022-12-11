import oracledb from 'oracledb';
import oracleDbHelper from '../db/index.js';
import { TypeChecker } from '../utils/index.js';
import FollowRequestedQuery from '../query/followRequest.js';

export default Object.freeze({
    /**
     * @namedparam
     * @param { Object } data
     * @property { Number } userId - data.userId, 친구 요청 보낸 사람
     * @property { Number } requesteeId - data.requesteeId, 친구 요청 받은 사람
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
    createFollowRequest: async ({ userId, requesteeId }) => {
        const typeCheckData = [
            [userId, requesteeId],
            ['number', 'number'],
        ];

        const typeCheckResult = TypeChecker.typeCheckAll({ objectList: typeCheckData[0], typeList: typeCheckData[1] });

        if (typeCheckResult) {
            return false;
        }

        const bind = [
            userId,
            requesteeId,
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
            const result = await oracleDbHelper.connection.execute(FollowRequestedQuery.createFollowRequest, bind, option);
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
    * @property { Number } userId - data.userId, 친구 요청 보낸 사람
    * @property { Number } targetUserId - data.targetUserId, 친구 요청 받은 사람
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
    deleteFollowRequest: async ({ userId, requesteeId }) => {
        const typeCheckData = [
            [userId, requesteeId],
            ['number', 'number'],
        ];

        const typeCheckResult = TypeChecker.typeCheckAll({ objectList: typeCheckData[0], typeList: typeCheckData[1] });

        if (typeCheckResult) {
            return false;
        }

        const bind = [
            userId,
            requesteeId
        ];

        const option = {
            autoCommit: true
        };

        try {
            const result = await oracleDbHelper.connection.execute(FollowRequestedQuery.deleteFollowRequest, bind, option);
            return { status: true };
        } catch (e) {
            console.log(e);
            return { status: false };
        }
    },
    /**
    * @namedparam
    * @param { Object } data
    * @property { Number } userId - data.userId, 친구 요청 보낸 사람
    * @property { Number } targetUserId - data.targetUserId, 친구 요청 받은 사람
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
    deleteFollowRequested: async ({ userId, requesterId }) => {
        const typeCheckData = [
            [userId, requesterId],
            ['number', 'number'],
        ];

        const typeCheckResult = TypeChecker.typeCheckAll({ objectList: typeCheckData[0], typeList: typeCheckData[1] });

        if (typeCheckResult) {
            return false;
        }

        const bind = [
            requesterId,
            userId
        ];

        const option = {
            autoCommit: true
        };

        try {
            const result = await oracleDbHelper.connection.execute(FollowRequestedQuery.deleteFollowRequested, bind, option);
            return { status: true };
        } catch (e) {
            console.log(e);
            return { status: false };
        }
    },
});