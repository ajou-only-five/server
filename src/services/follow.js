import oracledb from 'oracledb';
import oracleDbHelper from '../db/index.js';
import { TypeChecker } from '../utils/index.js';
import FollowQuery from '../query/follow.js';

export default Object.freeze({
    /**
     * @namedparam
     * @param { Object } data
     * @property { Number } userId - data.userId, 유저 id
     * @property { Number } followerId - data.followerId, 팔로워 id
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
    createFollow: async ({ userId, followerId }) => {
        const typeCheckData = [
            [userId, followerId],
            ['number', 'number'],
        ];

        const typeCheckResult = TypeChecker.typeCheckAll({ objectList: typeCheckData[0], typeList: typeCheckData[1] });

        if (typeCheckResult) {
            return false;
        }

        const bind = [
            followerId,
            userId,
            {
                dir: oracledb.BIND_OUT,
                type: oracledb.NUMBER
            },
            {
                dir: oracledb.BIND_OUT,
                type: oracledb.NUMBER
            },
            {
                dir: oracledb.BIND_OUT,
                type: oracledb.NUMBER
            },
            {
                dir: oracledb.BIND_OUT,
                type: oracledb.NUMBER
            }
        ]

        const option = {
            autoCommit: true
        };

        console.log(followerId, userId);
        try {
            const result = await oracleDbHelper.connection.execute(FollowQuery.createFollow, bind, option);
            console.log(result);
            return { status: true};
        } catch (e) {
            console.log(e);
            return { status: false };
        }
    },
    /**
    * @namedparam
    * @param { Object } data
    * @property { Number } userId - data.userId, 친구 1
    * @property { Number } friendId - data.friendId, 친구 2
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
    deleteFriend: async ({ userId, friendId }) => {
        const typeCheckData = [
            [userId, friendId],
            ['number', 'number'],
        ];
        const typeCheckResult = TypeChecker.typeCheckAll({ objectList: typeCheckData[0], typeList: typeCheckData[1] });

        if (typeCheckResult) {
            return false;
        }

        const bind = [
            userId,
            friendId
        ];

        const option = {
            autoCommit: true
        };

        try {
            const result = await oracleDbHelper.connection.execute(FollowQuery.deleteFriend, bind, option);
            return { status: true };
        } catch (e) {
            console.log(e);
            return { status: false };
        }
    },
});