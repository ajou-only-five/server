import oracledb from 'oracledb';
import oracleDbHelper from '../db/index.js';
import { TypeChecker } from '../utils/index.js';
import SearchQuery from '../query/search.js';

export default Object.freeze({
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
        if (!TypeChecker.isNumber(userId)) {
            return { status: false };
        }

        const bind = [
            userId
        ];

        try {
            const result = await oracleDbHelper.connection.execute(SearchQuery.searchFriendByUserId, bind);
            console.log(result);
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
     * @property { Number } start - data.start, 시작 범위
     * @property { Number } end - data.end, 종료 범위
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
     * { status : false }
     * ```
     */
    searchFriendByUserIdBetween: async ({ userId, start, end }) => {
        if (!TypeChecker.isNumber(userId)) {
            return { status: false };
        }

        const bind = [
            userId,
            start,
            end
        ];

        try {
            const result = await oracleDbHelper.connection.execute(SearchQuery.searchFriendByUserIdBetween, bind);
            console.log(result);
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
     * @property { String } nickname - data.nickname, 검색하는 닉네임
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
     * { status : false }
     * ```
     */
     searchFriendByUserIdAndNickname: async ({ userId, nickname }) => {
        if (!TypeChecker.isNumber(userId)) {
            return { status: false };
        }

        const bind = [
            userId,
            start,
            end
        ];

        try {
            const result = await oracleDbHelper.connection.execute(SearchQuery.searchFriendByUserIdAndNickname(nickname), bind);
            console.log(result);
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
     * @property { String } nickname - data.nickname, 검색하는 닉네임
     * @property { Number } start - data.start, 시작 범위
     * @property { Number } end - data.end, 종료 범위
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
     * { status : false }
     * ```
     */
    searchFriendByUserIdAndNicknameBetween: async ({ userId, nickname, start, end }) => {
        if (!TypeChecker.isNumber(userId)) {
            return { status: false };
        }

        const bind = [
            userId,
            start,
            end
        ];

        try {
            const result = await oracleDbHelper.connection.execute(SearchQuery.searchFriendByUserIdAndNicknameBetween(nickname), bind);
            console.log(result);
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
        if (!TypeChecker.isNumber(userId)) {
            return { status: false };
        }

        const bind = [
            userId
        ];

        try {
            const result = await oracleDbHelper.connection.execute(SearchQuery.searchFriendRequestByUserId, bind);
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
     * @property { Number } start - data.start, 시작 범위
     * @property { Number } end - data.end, 종료 범위
     * 
     * @return { Object } 
     * @property { Boolean } status
     * @property { Array<User> } data
     * 
     * @description
     * ```js
     * // 현재 유저가 친구 요청을 보낸 유저 범위 검색이 완료 되었을 경우
     * { 
     *  status : true, 
     *  data: []
     * } 
     * 
     * // parameter 타입이 맞지 않을 경우
     * // 현재 유저가 친구 요청을 보낸 유저 범위 검색이 완료되지 않았을 경우
     * { status : false }
     * ```
     */
    searchFriendRequestByUserIdBetween: async ({ userId, start, end }) => {
        if (!TypeChecker.isNumber(userId)) {
            return { status: false };
        }

        const bind = [
            userId,
            start,
            end
        ];

        try {
            const result = await oracleDbHelper.connection.execute(SearchQuery.searchFriendRequestByUserIdBetween, bind);
            console.log(result);
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
     * @property { String } nickname - data.nickname, 검색하려는 닉네임
     * 
     * @return { Object } 
     * @property { Boolean } status
     * @property { Array<User> } data
     * 
     * @description
     * ```js
     * // 현재 유저가 친구 요청을 보낸 유저 범위 검색이 완료 되었을 경우
     * { 
     *  status : true, 
     *  data: []
     * } 
     * 
     * // parameter 타입이 맞지 않을 경우
     * // 현재 유저가 친구 요청을 보낸 유저 범위 검색이 완료되지 않았을 경우
     * { status : false }
     * ```
     */
     searchFriendRequestByUserIdAndNickname: async ({ userId, nickname }) => {
        if (!TypeChecker.isNumber(userId)) {
            return { status: false };
        }

        const bind = [
            userId,
        ];

        try {
            const result = await oracleDbHelper.connection.execute(SearchQuery.searchFriendRequestByUserIdAndNickname(nickname), bind);
            console.log(result);
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
     * @property { String } nickname - data.nickname, 검색하려는 닉네임
     * @property { Number } start - data.start, 시작 범위
     * @property { Number } end - data.end, 종료 범위
     * 
     * @return { Object } 
     * @property { Boolean } status
     * @property { Array<User> } data
     * 
     * @description
     * ```js
     * // 현재 유저가 친구 요청을 보낸 유저 범위 검색이 완료 되었을 경우
     * { 
     *  status : true, 
     *  data: []
     * } 
     * 
     * // parameter 타입이 맞지 않을 경우
     * // 현재 유저가 친구 요청을 보낸 유저 범위 검색이 완료되지 않았을 경우
     * { status : false }
     * ```
     */
    searchFriendRequestByUserIdAndNicknameBetween: async ({ userId, nickname, start, end }) => {
        if (!TypeChecker.isNumber(userId)) {
            return { status: false };
        }

        const bind = [
            userId,
            start,
            end
        ];

        try {
            const result = await oracleDbHelper.connection.execute(SearchQuery.searchFriendRequestByUserIdAndNicknameBetween(nickname), bind);
            console.log(result);
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
        if (!TypeChecker.isNumber(userId)) {
            return { status: false };
        }

        const bind = [
            userId
        ];

        try {
            const result = await oracleDbHelper.connection.execute(SearchQuery.searchFriendRequestedByUserId, bind);
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
     * @property { Number } start - data.start, 시작 범위
     * @property { Number } end - data.end, 종료 범위
     * 
     * @return { Object } 
     * @property { Boolean } status
     * @property { Array<User> } data
     * 
     * @description
     * ```js
     * // 현재 유저에게 친구 요청을 보낸 유저 범위 검색이 완료 되었을 경우
     * { 
     *  status : true, 
     *  data: []
     * } 
     * 
     * // parameter 타입이 맞지 않을 경우
     * // 현재 유저에게 친구 요청을 보낸 유저 범위 검색이 완료되지 않았을 경우
     * { status : false }
     * ```
     */
    searchFriendRequestedByUserIdBetween: async ({ userId, start, end }) => {
        if (!TypeChecker.isNumber(userId)) {
            return { status: false };
        }

        const bind = [
            userId,
            start,
            end
        ];

        try {
            const result = await oracleDbHelper.connection.execute(SearchQuery.searchFriendRequestedByUserIdBetween, bind);
            console.log(result);
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
     * @property { String } nickname - data.nickname, 검색하려는 닉네임
     * 
     * @return { Object } 
     * @property { Boolean } status
     * @property { Array<User> } data
     * 
     * @description
     * ```js
     * // 현재 유저에게 친구 요청을 보낸 유저 범위 검색이 완료 되었을 경우
     * { 
     *  status : true, 
     *  data: []
     * } 
     * 
     * // parameter 타입이 맞지 않을 경우
     * // 현재 유저에게 친구 요청을 보낸 유저 범위 검색이 완료되지 않았을 경우
     * { status : false }
     * ```
     */
     searchFriendRequestedByUserIdAndNickname: async ({ userId, nickname }) => {
        if (!TypeChecker.isNumber(userId)) {
            return { status: false };
        }

        const bind = [
            userId,
        ];

        try {
            const result = await oracleDbHelper.connection.execute(SearchQuery.searchFriendRequestedByUserIdAndNickname(nickname), bind);
            console.log(result);
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
     * @property { String } nickname - data.nickname, 검색하려는 닉네임
     * @property { Number } start - data.start, 시작 범위
     * @property { Number } end - data.end, 종료 범위
     * 
     * @return { Object } 
     * @property { Boolean } status
     * @property { Array<User> } data
     * 
     * @description
     * ```js
     * // 현재 유저에게 친구 요청을 보낸 유저 범위 검색이 완료 되었을 경우
     * { 
     *  status : true, 
     *  data: []
     * } 
     * 
     * // parameter 타입이 맞지 않을 경우
     * // 현재 유저에게 친구 요청을 보낸 유저 범위 검색이 완료되지 않았을 경우
     * { status : false }
     * ```
     */
    searchFriendRequestedByUserIdAndNicknameBetween: async ({ userId, nickname, start, end }) => {
        if (!TypeChecker.isNumber(userId)) {
            return { status: false };
        }

        const bind = [
            userId,
            start,
            end
        ];

        try {
            const result = await oracleDbHelper.connection.execute(SearchQuery.searchFriendRequestedByUserIdAndNicknameBetween(nickname), bind);
            console.log(result);
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
     * // 현재 유저와 아무 사이도 아닌 유저 목록 검색이 완료 되었을 경우
     * { 
     *  status : true, 
     *  data: []
     * } 
     * 
     * // parameter 타입이 맞지 않을 경우
     * // 현재 유저와 아무 사이도 아닌 유저 목록 검색이 완료 되지 않았을 경우
     * { status : false }
     * ```
     */
    searchNotFriendAndNotRequestedByUserId: async ({ userId }) => {
        if (!TypeChecker.isNumber(userId)) {
            return { status: false };
        }

        const bind = [
            userId
        ];

        try {
            const result = await oracleDbHelper.connection.execute(SearchQuery.searchNotFriendAndNotRequestedByUserId, bind);
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
     * @property { Number } start - data.start, 시작 범위
     * @property { Number } end - data.end, 종료 범위
     * 
     * @return { Object } 
     * @property { Boolean } status
     * @property { Array<User> } data
     * 
     * @description
     * ```js
     * // 현재 유저와 아무 사이도 아닌 유저 범위 검색이 완료 되었을 경우
     * { 
     *  status : true, 
     *  data: []
     * } 
     * 
     * // parameter 타입이 맞지 않을 경우
     * // 현재 유저와 아무 사이도 아닌 유저 범위 검색이 완료되지 않았을 경우
     * { status : false }
     * ```
     */
    searchNotFriendAndNotRequestedByUserIdBetween: async ({ userId, start, end }) => {
        if (!TypeChecker.isNumber(userId)) {
            return { status: false };
        }

        const bind = [
            userId,
            start,
            end
        ];

        try {
            const result = await oracleDbHelper.connection.execute(SearchQuery.searchNotFriendAndNotRequestedByUserIdBetween, bind);
            console.log(result);
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
         * @property { String } nickname - data.nickname, 현재 유저 닉네임
         * @property { Number } start - data.start, 시작 범위
         * @property { Number } end - data.end, 종료 범위
         * 
         * @return { Object } 
         * @property { Boolean } status
         * @property { Array<User> } data
         * 
         * @description
         * ```js
         * // 현재 유저와 아무 사이도 아닌 유저 범위 검색이 완료 되었을 경우
         * { 
         *  status : true, 
         *  data: []
         * } 
         * 
         * // parameter 타입이 맞지 않을 경우
         * // 현재 유저와 아무 사이도 아닌 유저 범위 검색이 완료되지 않았을 경우
         * { status : false }
         * ```
         */
    searchNotFriendAndNotRequestedByUserIdAndNicknameBetween: async ({ userId, nickname, start, end }) => {
        if (!TypeChecker.isNumber(userId)) {
            return { status: false };
        }

        const bind = [
            userId,
            start,
            end
        ];

        try {
            const result = await oracleDbHelper.connection.execute(SearchQuery.searchNotFriendAndNotRequestedByUserIdAndNicknameBetween(nickname), bind);
            console.log(result);
            return { status: true, data: result.rows };
        } catch (e) {
            console.log(e);
            return { status: false };
        }
    },
});