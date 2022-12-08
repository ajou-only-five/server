import oracledb from 'oracledb';

import oracleDbHelper from '../db/index.js';
import { TypeChecker, HashUtils } from '../utils/index.js';
import UserQuery from '../query/user.js';

/**
 * The user services for CRUD.
 * 
 * @typedef { Object } UserServices
 */
export default Object.freeze({
    /**
     * @namedparam
     * @param { Object } data - 유저 객체
     * @property { String } account - data.account, 유저 계정
     * @property { String } password - data.password, 유저 비밀번호
     * @property { String } nickname - data.nickname, 유저 닉네임
     * @property { String } profile - data.profile, 유저 프로필
     * @property { Number } disclosure - data.disclosure, 유저 정보 공개 범위
     * 
     * @return { Object } 
     * @property { Boolean } status
     * 
     * @description
     * ```js
     * // 유저 생성이 정상적으로 완료되고, 해당 정보가 DB에 저장 됐을 경우
     * { status : true} 
     * 
     * // parameter 타입이 맞지 않을 경우
     * // 유저 생성이 완료되지 않았을 경우
     * // 해당 정보가 DB에 저장되지 않았을 경우
     * { status : false }
     * ```
     */
    createUser: async ({ account, password, nickname, profile, disclosure }) => {
        const typeCheckData = [
            [account, password, nickname, profile, disclosure],
            ['string', 'string', 'string', 'string', 'number']
        ];

        const typeCheckResult = TypeChecker.typeCheckAll({ objectList: typeCheckData[0], typeList: typeCheckData[1] });

        if (typeCheckResult) {
            return { status: false };
        }

        let _hashedPassword = null;

        try {
            _hashedPassword = await HashUtils.hashPassword(password);
        } catch (e) {
            console.log(e);
            return { status: false };
        }

        if (_hashedPassword === null) {
            return { status: false };
        }

        const bind = [
            account,
            _hashedPassword,
            nickname,
            profile,
            disclosure,
            new Date(Date.now()),
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
            const result = await oracleDbHelper.connection.execute(UserQuery.createUser, bind, option);
            const data = {
                userId: result.outBinds[0][0]
            };
            return { status: true, data: data };
        } catch (e) {
            console.log(e);
            return { status: false };
        }
    },
    /**
     * @namedparam
     * @param { Object } data - 유저 데이터
     * @property { String } account - data.account, 유저 계정
     * 
     * @return { Object } 
     * @property { Boolean } status
     * @property { Array<any> } data
     * 
     * @description 
     * 유저를 1명 찾을 때 사용하는 함수입니다.
     * ```js
     * // 유저를 찾았을 때
     * { 
     *      status : true,
     *      data: [
     *          0, // id
     *          "testAccount", // account
     *          "test@123", // password
     *          "testNickname", // nickname
     *          "testProfile", // profile
     *          0, // disclosure
     *          16908743092814, // create_at, timestamp 형식
     *          16908743092814 // update_at, timestamp 형식
     *      ]
     * } 
     * 
     * // parameter 타입이 맞지 않을 경우
     * // 유저 검색이 완료되지 않았을 경우
     * // 해당 정보가 DB에 저장되지 않았을 경우
     * { status : false }
     * ```
     */
    findUserByAccount: async ({ account }) => {
        if (!TypeChecker.isString(account)) {
            return { status: false };
        }

        const bind = [
            account,
        ];

        const option = {
            autoCommit: true
        };

        try {
            const result = await oracleDbHelper.connection.execute(UserQuery.findUserByAccount, bind, option);
            return { status: true, data: result.rows};
        } catch (e) {
            console.log(e);
            return { status: false };
        }
    },
    /**
     * @namedparam
     * @param { Object } data - 유저 데이터
     * @property { String } nickname - data.nickname, 유저 닉네임
     * 
     * @return { Object } 
     * @property { Boolean } status
     * @property { Array<any> } data
     * 
     * @description
     * 유저를 1명 찾을 때 사용하는 함수입니다.
     * ```js
     * // 유저를 찾았을 때
     * { 
     *      status : true,
     *      data: [
     *          0, // id
     *          "testAccount", // account
     *          "test@123", // password
     *          "testNickname", // nickname
     *          "testProfile", // profile
     *          0, // disclosure
     *          16908743092814, // create_at, timestamp 형식
     *          16908743092814 // update_at, timestamp 형식
     *      ]
     * } 
     * 
     * // parameter 타입이 맞지 않을 경우
     * // 유저 검색이 완료되지 않았을 경우
     * // 해당 정보가 DB에 저장되지 않았을 경우
     * { status : false }
     * ```
     */
    findUserByNickname: async ({ nickname }) => {
        if (!TypeChecker.isString(nickname)) {
            return { status: false };
        }

        const bind = [
            nickname,
        ];

        try {
            const result = await oracleDbHelper.connection.execute(UserQuery.findUserByAccount, bind);
            return { status: true, data: result.rows };
        } catch (e) {
            console.log(e);
            return { status: false };
        }
    },
    /**
     * @namedparam
     * @param { Object } data - 유저 데이터
     * @property { String } nickname - data.nickname, 유저 닉네임
     * 
     * @return { Object } 
     * @property { Boolean } status
     * @property { Array<Array<any>> } data
     * 
     * @description
     * 유저를 여러 명 찾을 때 사용하는 함수입니다. 친구 목록을 검색할 때 쓰시면 됩니다.
     * 
     * ```js
     * // 해당 닉네임을 포함하고 있는 모든 유저 목록
     * { 
     *      status : true,
     *      data: [
     *          [
     *              0, // id
     *              "testAccount", // account
     *              "test@123", // password
     *              "testNickname", // nickname
     *              "testProfile", // profile
     *              0, // disclosure
     *              16908743092814, // create_at, timestamp 형식
     *              16908743092814 // update_at, timestamp 형식
     *          ],
     *          [
     *              1, // id
     *              "testAccount2", // account
     *              "test@123", // password
     *              "testNickname2", // nickname
     *              "testProfile", // profile
     *              0, // disclosure
     *              16908743092814, // create_at, timestamp 형식
     *              16908743092814 // update_at, timestamp 형식
     *          ],
     *      ]
     * } 
     * 
     * // parameter 타입이 맞지 않을 경우
     * // 유저 검색이 완료되지 않았을 경우
     * // 해당 정보가 DB에 저장되지 않았을 경우
     * { status : false }
     * ```
     */
    searchUserByNickname: async ({ nickname }) => {
        if (!TypeChecker.isString(nickname)) {
            return { status: false };
        }

        const bind = {
            nickname: nickname
        };

        try {
            const result = await oracleDbHelper.connection.execute(UserQuery.searchUsersByNickname(bind));
            return { status: true, data: result.rows };
        } catch (e) {
            console.log(e);
            return { status: false };
        }
    },
    /**
     * @namedparam
     * @param { Object } data - 유저 데이터
     * @property { String } nickname - data.nickname, 유저 닉네임
     * @property { Number } start - data.start, 시작 index
     * @property { Number } end - data.end, 마지막 index
     * 
     * @return { Object } 
     * @property { Boolean } status
     * @property { Array<Array<any>> } data
     * 
     * @description
     * 해당 닉네임을 포함하고 있는 유저 목록 중, 일부분만 가져오고 싶을 때 사용합니다.
     * 주의해야할 점은 시작 index는 1부터 입력하셔야 합니다. 0이 아닙니다.
     * 
     * ```js
     * // 해당 닉네임을 포함하고 있는 유저 목록 중, 1번부터 2번 유저까지 가져올 때
     * { 
     *      status : true,
     *      data: [
     *          [
     *              0, // id
     *              "testAccount", // account
     *              "test@123", // password
     *              "testNickname", // nickname
     *              "testProfile", // profile
     *              0, // disclosure
     *              16908743092814, // create_at, timestamp 형식
     *              16908743092814 // update_at, timestamp 형식
     *          ],
     *          [
     *              1, // id
     *              "testAccount2", // account
     *              "test@123", // password
     *              "testNickname2", // nickname
     *              "testProfile", // profile
     *              0, // disclosure
     *              16908743092814, // create_at, timestamp 형식
     *              16908743092814 // update_at, timestamp 형식
     *          ],
     *      ]
     * } 
     * 
     * // parameter 타입이 맞지 않을 경우
     * // 유저 검색이 완료되지 않았을 경우
     * // 해당 정보가 DB에 저장되지 않았을 경우
     * { status : false }
     * ```
     */
    searchUserByNicknameBetween: async ({ nickname, start, end }) => {
        const typeCheckData = [
            [nickname, start, end, profile, disclosure],
            ['string', 'number', 'number']
        ];

        const typeCheckResult = TypeChecker.typeCheckAll({ objectList: typeCheckData[0], typeList: typeCheckData[1] });

        if (typeCheckResult) {
            return { status: false };
        }

        const bind = {
            nickname: nickname,
            start: start,
            end: end
        };

        try {
            const result = await oracleDbHelper.connection.execute(UserQuery.searchUsersByNicknameBetween(bind));
            return { status: true, data: result.rows };
        } catch (e) {
            console.log(e);
            return { status: false };
        }
    },
    /**
     * @namedparam
     * @param { Object } data - 유저 데이터
     * @property { String } account - data.account, 유저 계정
     * @property { String } password - data.password, 유저 닉네임
     * 
     * @return { Object } 
     * @property { Boolean } status
     * 
     * @description
     * 해당 계정을 가지고 있는 유저의 비밀번호를 업데이트 합니다.
     * 
     * ```js
     * // 해당 유저의 정보를 업데이트 하고, 해당 정보를 DB에 저장했을 경우
     * { status : true }
     * 
     * // parameter 타입이 맞지 않을 경우
     * // 유저 업데이트가 완료되지 않았을 경우
     * // 해당 정보가 DB에 저장되지 않았을 경우
     * { status : false }
     * ```
     */
    updatePasswordByAccount: async ({ account, password }) => {
        const typeCheckData = [
            [account, password],
            ['string', 'string']
        ];

        const typeCheckResult = TypeChecker.typeCheckAll({ objectList: typeCheckData[0], typeList: typeCheckData[1] });

        if (typeCheckResult) {
            return { status: false };
        }

        let _hashedPassword = null;

        try {
            _hashedPassword = await HashUtils.hashPassword(password);
        } catch (e) {
            console.log(e);
            return { status: false };
        }

        if (_hashedPassword === null) {
            return { status: false };
        }

        const bind = [
            _hashedPassword,
            new Date(Date.now()),
            account,
        ];

        const option = {
            autoCommit: true
        };

        try {
            const result = await oracleDbHelper.connection.execute(UserQuery.updatePasswordByAccount, bind, option);
            return { status: true, data: result };
        } catch (e) {
            console.log(e);
            return { status: false };
        }
    },
    /**
     * @namedparam
     * @param { Object } data - 유저 데이터
     * @property { String } account - data.account, 유저 계정
     * @property { String } nickname - data.nickname, 유저 닉네임
     * 
     * @return { Object } 
     * @property { Boolean } status
     * 
     * @description
     * 해당 계정을 가지고 있는 유저의 닉네임을 업데이트 합니다.
     * 
     * ```js
     * // 해당 유저의 정보를 업데이트 하고, 해당 정보를 DB에 저장했을 경우
     * { status : true }
     * 
     * // parameter 타입이 맞지 않을 경우
     * // 유저 업데이트가 완료되지 않았을 경우
     * // 해당 정보가 DB에 저장되지 않았을 경우
     * { status : false }
     * ```
     */
    updateNicknameByAccount: async ({ account, nickname }) => {
        const typeCheckData = [
            [account, nickname],
            ['string', 'string']
        ];

        const typeCheckResult = TypeChecker.typeCheckAll({ objectList: typeCheckData[0], typeList: typeCheckData[1] });

        if (typeCheckResult) {
            return { status: false };
        }

        const bind = [
            nickname,
            new Date(Date.now()),
            account,
        ];

        const option = {
            autoCommit: true
        };

        try {
            const result = await oracleDbHelper.connection.execute(UserQuery.updateNicknameByAccount, bind, option);
            return { status: true, data: result };
        } catch (e) {
            console.log(e);
            return { status: false };
        }
    },
    /**
     * @namedparam
     * @param { Object } data - 유저 데이터
     * @property { String } account - data.account, 유저 계정
     * @property { String } profile - data.profile, 유저 프로필
     * 
     * @return { Object } 
     * @property { Boolean } status
     * 
     * @description
     * 해당 계정을 가지고 있는 유저의 프로필을 업데이트 합니다.
     * 
     * ```js
     * // 해당 유저의 정보를 업데이트 하고, 해당 정보를 DB에 저장했을 경우
     * { status : true }
     * 
     * // parameter 타입이 맞지 않을 경우
     * // 유저 업데이트가 완료되지 않았을 경우
     * // 해당 정보가 DB에 저장되지 않았을 경우
     * { status : false }
     * ```
     */
    updateProfileByAccount: async ({ account, profile }) => {
        const typeCheckData = [
            [account, profile],
            ['string', 'string']
        ];

        const typeCheckResult = TypeChecker.typeCheckAll({ objectList: typeCheckData[0], typeList: typeCheckData[1] });

        if (typeCheckResult) {
            return { status: false };
        }

        const bind = [
            nickname,
            profile,
            disclosure,
            new Date(Date.now()),
            account,
        ];

        const option = {
            autoCommit: true
        };

        try {
            const result = await oracleDbHelper.connection.execute(UserQuery.updateUserByAccount, bind, option);
            await oracleDbHelper.connection.commit();
            return { status: true, data: result };
        } catch (e) {
            console.log(e);
            return { status: false };
        }
    },
    /**
     * @namedparam
     * @param { Object } data - 유저 데이터
     * @property { String } account - data.account, 유저 계정
     * @property { Number } disclosure - data.disclosure, 유저 프로필
     * 
     * @return { Object } 
     * @property { Boolean } status
     * 
     * @description
     * 해당 계정을 가지고 있는 유저의 공개범위를 업데이트 합니다.
     * 
     * ```js
     * // 해당 유저의 정보를 업데이트 하고, 해당 정보를 DB에 저장했을 경우
     * { status : true }
     * 
     * // parameter 타입이 맞지 않을 경우
     * // 유저 업데이트가 완료되지 않았을 경우
     * // 해당 정보가 DB에 저장되지 않았을 경우
     * { status : false }
     * ```
     */
    updateDisclosureByAccount: async ({ account, disclosure }) => {
        const typeCheckData = [
            [account, disclosure],
            ['string', 'string']
        ];

        const typeCheckResult = TypeChecker.typeCheckAll({ objectList: typeCheckData[0], typeList: typeCheckData[1] });

        if (typeCheckResult) {
            return { status: false };
        }

        const bind = [
            disclosure,
            new Date(Date.now()),
            account,
        ];

        const option = {
            autoCommit: true
        };

        try {
            const result = await oracleDbHelper.connection.execute(UserQuery.updateDisclosureByAccount, bind, option);
            await oracleDbHelper.connection.commit();
            return { status: true, data: result };
        } catch (e) {
            console.log(e);
            return { status: false };
        }
    },
    /**
     * @namedparam
     * @param { Object } data - 유저 데이터
     * @property { String } account - data.account, 유저 계정
     * 
     * @return { Object } 
     * @property { Boolean } status
     * 
     * @description
     * 
     * 해당 계정을 가지고 있는 유저의 정보를 삭제 합니다.
     * 
     * ```js
     * // 해당 유저의 정보를 삭제 하고, 해당 정보를 DB에 저장했을 경우
     * { status : true }
     * 
     * // parameter 타입이 맞지 않을 경우
     * // 유저 삭제가 완료되지 않았을 경우
     * // 해당 정보가 DB에 저장되지 않았을 경우
     * { status : false }
     * ```
     */
    deleteUserByAccount: async ({ account }) => {
        if (!TypeChecker.isString(account)) {
            return { status: false };
        }

        const bind = [
            account
        ];

        const option = {
            autoCommit: true
        };

        try {
            const result = await oracleDbHelper.connection.execute(UserQuery.deleteUserByAccount, bind, option);
            return { status: true, data: result };
        } catch (e) {
            console.log(e);
            return { status: false };
        }
    },
    /**
     * @namedparam
     * @param { Object } data - 유저 데이터
     * @property { String } nickname - data.nickname, 유저 닉네임
     * 
     * @return { Object } 
     * @property { Boolean } status
     * 
     * @description
     * 
     * 해당 계정을 가지고 있는 유저의 정보를 삭제 합니다.
     * 
     * ```js
     * // 해당 유저의 정보를 삭제 하고, 해당 정보를 DB에 저장했을 경우
     * { status : true }
     * 
     * // parameter 타입이 맞지 않을 경우
     * // 유저 삭제가 완료되지 않았을 경우
     * // 해당 정보가 DB에 저장되지 않았을 경우
     * { status : false }
     * ```
     */
    deleteUserByNickname: async ({ nickname }) => {
        if (!TypeChecker.isString(nickname)) {
            return { status: false };
        }

        const bind = [
            nickname,
        ];

        const option = {
            autoCommit: true
        };

        try {
            const result = await oracleDbHelper.connection.execute(UserQuery.deleteUserByNickname, bind, option);
            return { status: true, data: result };
        } catch (e) {
            console.log(e);
            return { status: false };
        }
    },
});