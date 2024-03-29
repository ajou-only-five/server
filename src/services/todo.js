import oracledb from 'oracledb';
import oracleDbHelper from '../db/index.js';
import { TypeChecker } from '../utils/index.js';
import TodoQuery from '../query/todo.js';

export default {
    /**
     * @namedparam
     * @param { Object } data
     * @property { Number } userId - data.userId, 유저 index
     * @property { String } title - data.title, todo 제목
     * @property { String } color - data.color, todo 색깔
     * 
     * @return { Object } 
     * @property { Boolean } status
     * @property { Number } titleId
     * 
     * @description
     * ```js
     * // 제목 생성이 정상적으로 완료되고, 해당 정보가 DB에 저장 됐을 경우
     * { status : true} 
     * 
     * // parameter 타입이 맞지 않을 경우
     * // 제목 생성이 완료되지 않았을 경우
     * // 해당 정보가 DB에 저장되지 않았을 경우
     * { status : false }
     * ```
     */
    createTodoTitle: async ({ userId, title, color }) => {
        const typeCheckData = [
            [userId, title, color],
            ['number', 'string', 'string'],
        ];

        const typeCheckResult = TypeChecker.typeCheckAll({ objectList: typeCheckData[0], typeList: typeCheckData[1] });

        if (typeCheckResult) {
            return false;
        }

        const bind = [
            userId,
            title,
            color,
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
            const result = await oracleDbHelper.connection.execute(TodoQuery.createTodoTitle, bind, option);
            const data = {
                titleId: result.outBinds[0][0],
                title: title,
                color: color
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
     * @property { Number } titleId - data.titleId, todo title index
     * @property { String } content - data.content, todo 내용
     * @property { Date? } startAt - data.startAt, todo 시작 시간
     * @property { Date? } endAt - data.endAt, todo 종료 시간
     * 
     * @return { Object } 
     * @property { Boolean } status
     * @property { Number } itemId
     * 
     * @description
     * ```js
     * // todo item 생성이 정상적으로 완료되고, 해당 정보가 DB에 저장 됐을 경우
     * { status : true} 
     * 
     * // parameter 타입이 맞지 않을 경우
     * // todo item 생성이 완료되지 않았을 경우
     * // 해당 정보가 DB에 저장되지 않았을 경우
     * { status : false }
     * ```
     */
    createTodoItem: async ({ titleId, content, startAt, endAt }) => {
        let isStartAtNull = null;
        let isEndAtNull = null;

        const typeCheckData = [
            [titleId, content],
            ['number', 'string'],
        ];

        const typeCheckResult = TypeChecker.typeCheckAll({ objectList: typeCheckData[0], typeList: typeCheckData[1] });

        if (typeCheckResult) {
            return false;
        }

        if (startAt === undefined || startAt === null) {
            isStartAtNull = true;
        } else {
            isStartAtNull = false;
        }

        if (endAt === undefined || endAt === null) {
            isEndAtNull = true;
        } else {
            isEndAtNull = false;
        }

        if (!isStartAtNull && !TypeChecker.isDate(startAt)) {
            return { status: false };
        }

        if (!isEndAtNull && !TypeChecker.isDate(endAt)) {
            return { status: false };
        }

        let _startAt = null;
        let _endAt = null;

        if (isStartAtNull) {
            _startAt = new Date(Date.now());
        } else {
            _startAt = startAt;
        }

        if (isEndAtNull) {
            _endAt = _startAt;
        } else {
            _endAt = endAt;
        }

        const bind = [
            titleId,
            content,
            _startAt,
            _endAt,
            0,
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
            const result = await oracleDbHelper.connection.execute(TodoQuery.createTodoItem, bind, option);

            const data = {
                contentId: result.outBinds[0][0],
                content: content,
                startAt: _startAt,
                endAt: _endAt,
                isChecked: 0
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
    * @property { Number } titleId - data.titleId, todo title index
    * 
    * @return { Object } 
    * @property { Boolean } status
    * @property { Object } data
    * 
    * @description
    * ```js
    * // todo title이 정상적으로 검색되고, 해당 정보가 DB에 저장 됐을 경우
    * { status : true, data: titleObject } 
    * 
    * // parameter 타입이 맞지 않을 경우
    * // todo title 검색이 완료되지 않았을 경우
    * // 해당 정보가 DB에 저장되지 않았을 경우
    * { status : false }
    * ```
    */
    findTodoTitle: async ({ titleId }) => {
        if (!TypeChecker.isNumber(titleId)) {
            return { status: false };
        }

        const bind = [
            titleId
        ];

        try {
            const result = await oracleDbHelper.connection.execute(TodoQuery.findTodoTitle, bind);

            return { status: true, data: result.rows[0] };
        } catch (e) {
            console.log(e);
            return { status: false };
        }
    },
    /**
     * @namedparam
     * @param { Object } data
     * @property { Number } itemId - data.itemId, todo title index
     * 
     * @return { Object } 
     * @property { Boolean } status
     * @property { Object } data
     * 
     * @description
     * ```js
     * // todo item이 정상적으로 검색되고, 해당 정보가 DB에 저장 됐을 경우
     * { status : true, data: titleObject } 
     * 
     * // parameter 타입이 맞지 않을 경우
     * // todo item 검색이 완료되지 않았을 경우
     * // 해당 정보가 DB에 저장되지 않았을 경우
     * { status : false }
     * ```
     */
    findTodoItem: async ({ itemId }) => {
        if (!TypeChecker.isNumber(itemId)) {
            return { status: false };
        }

        const bind = [
            itemId
        ];

        try {
            const result = await oracleDbHelper.connection.execute(TodoQuery.findTodoItem, bind);

            return { status: true, data: result.rows[0] };
        } catch (e) {
            console.log(e);
            return { status: false };
        }
    },
    /**
     * @namedparam
     * @param { Object } data
     * @property { Number } userId - data.titleId, todo title index
     * @property { Number } year - data.year, todo 내용
     * @property { Number } month - data.month, todo 시작 시간
     * 
     * @return { Object } 
     * @property { Boolean } status
     * @property { Array<Array< Todo >> }
     * 
     * @description
     * ```js
     * // todo item 생성이 정상적으로 완료되고, 해당 정보가 DB에 저장 됐을 경우
     * { status : true} 
     * 
     * // parameter 타입이 맞지 않을 경우
     * // todo item 생성이 완료되지 않았을 경우
     * // 해당 정보가 DB에 저장되지 않았을 경우
     * { status : false }
     * ```
     */
    searchTodoListInMonth: async ({ userId, year, month }) => {
        const startAt = new Date(year, month - 1);
        const endAt = new Date(year, month, 1);

        const bind = {
            userId: userId,
            startAt: startAt,
            endAt: endAt,
        };

        const option = {
            outFormat: oracledb.OUT_FORMAT_OBJECT
        };

        try {
            const result = await oracleDbHelper.connection.execute(TodoQuery.searchTodoListInMonth, bind, option);

            return { status: true, data: result.implicitResults[0] };
        } catch (e) {
            console.log(e);
            return { status: false };
        }
    },
    /**
     * @namedparam
     * @param { Object } data
     * @property { String } title - data.title, todo title
     * @property { String } color - data.color, todo color
     * @property { Number } titleId - data.titleId, todo title index
     * 
     * @return { Object } 
     * @property { Boolean } status
     * 
     * @description
     * ```js
     * // todo title이 정상적으로 업데이트 되고, 해당 정보가 DB에 저장 됐을 경우
     * { status : true} 
     * 
     * // parameter 타입이 맞지 않을 경우
     * // todo title 업데이트가 완료되지 않았을 경우
     * // 해당 정보가 DB에 저장되지 않았을 경우
     * { status : false }
     * ```
     */
    updateTodoTitleByTitleId: async ({ title, color, titleId }) => {
        const typeCheckData = [
            [titleId, title, color],
            ['number', 'string', 'string'],
        ];

        const typeCheckResult = TypeChecker.typeCheckAll({ objectList: typeCheckData[0], typeList: typeCheckData[1] });

        if (typeCheckResult) {
            return false;
        }

        const bind = [
            title,
            color,
            new Date(Date.now()),
            titleId
        ];

        const option = {
            autoCommit: true
        };

        try {
            const result = await oracleDbHelper.connection.execute(TodoQuery.updateTodoTitle, bind, option);
            await oracleDbHelper.connection.commit();
            return { status: true, data: result };
        } catch (e) {
            console.log(e);
            return { status: false };
        }
    },
    /**
     * @namedparam
     * @param { Object } data
     * @property { String } content - data.content, todo 내용
     * @property { Date? } startAt - data.startAt, todo 시작 시간
     * @property { Date? } endAt - data.endAt, todo 종료 시간
     * @property { Number } isChecked - data.isChcked, todo 완료 여부
     * @property { Number } itemId - data.itemId, todo item id
     * 
     * @return { Object } 
     * @property { Boolean } status
     * 
     * @description
     * ```js
     * // todo item 업데이트가 정상적으로 완료되고, 해당 정보가 DB에 저장 됐을 경우
     * { status : true} 
     * 
     * // parameter 타입이 맞지 않을 경우
     * // todo item 업데이트가 완료되지 않았을 경우
     * // 해당 정보가 DB에 저장되지 않았을 경우
     * { status : false }
     * ```
     */
    updateTodoItemByItemId: async ({ content, startAt, endAt, isChecked, contentId }) => {
        let isStartAtNull = null;
        let isEndAtNull = null;

        const typeCheckData = [
            [content, isChecked, contentId],
            ['string', 'number', 'number'],
        ];

        const typeCheckResult = TypeChecker.typeCheckAll({ objectList: typeCheckData[0], typeList: typeCheckData[1] });

        if (typeCheckResult) {
            return false;
        }

        if (!isStartAtNull && !TypeChecker.isDate(startAt)) {
            return { status: false };
        }

        if (!isEndAtNull && !TypeChecker.isDate(endAt)) {
            return { status: false };
        }

        let _startAt = null;
        let _endAt = null;

        if (isStartAtNull) {
            _startAt = new Date(Date.now());
        } else {
            _startAt = startAt;
        }

        if (isEndAtNull) {
            _endAt = _startAt;
        } else {
            _endAt = endAt;
        }

        const option = {
            autoCommit: true
        };

        if(isChecked) {
            const bind = [
                content,
                _startAt,
                _endAt,
                isChecked,
                new Date(Date.now()),
                new Date(Date.now()),
                contentId,
            ];

            try {
                const result = await oracleDbHelper.connection.execute(TodoQuery.updateTodoItemWithCheckedAt, bind, option);
                return { status: true, data: result };
            } catch (e) {
                console.log(e);
                return { status: false };
            }
        }

        const bind = [
            content,
            _startAt,
            _endAt,
            isChecked,
            new Date(Date.now()),
            // null,
            contentId,
        ];

        try {
            const result = await oracleDbHelper.connection.execute(TodoQuery.updateTodoItemWithoutCheckedAt, bind, option);
            return { status: true, data: result };
        } catch (e) {
            console.log(e);
            return { status: false };
        }
    },
    /**
    * @namedparam
    * @param { Object } data
    * @property { Number } titleId - data.titleId, todo title id
    * 
    * @return { Object } 
    * @property { Boolean } status
    * 
    * @description
    * ```js
    * // todo title가 정상적으로 삭제되고, 해당 정보가 DB에 저장 됐을 경우
    * { status : true} 
    * 
    * // parameter 타입이 맞지 않을 경우
    * // todo title이 삭제되지 않았을 경우
    * // 해당 정보가 DB에 저장되지 않았을 경우
    * { status : false }
    * ```
    */
    deleteTodoTitle: async ({ titleId }) => {
        if (!TypeChecker.isNumber(titleId)) {
            return { status: false };
        }

        const bind = [
            titleId,
        ];

        const option = {
            autoCommit: true
        };

        try {
            const result = await oracleDbHelper.connection.execute(TodoQuery.deleteTodoTitle, bind, option);
            return { status: true, data: result };
        } catch (e) {
            console.log(e);
            return { status: false };
        }
    },
    /**
    * @namedparam
    * @param { Object } data
    * @property { Number } itemId - data.itemId, todo title id
    * 
    * @return { Object } 
    * @property { Boolean } status
    * 
    * @description
    * ```js
    * // todo item이 정상적으로 삭제되고, 해당 정보가 DB에 저장 됐을 경우
    * { status : true} 
    * 
    * // parameter 타입이 맞지 않을 경우
    * // todo item이 삭제되지 않았을 경우
    * // 해당 정보가 DB에 저장되지 않았을 경우
    * { status : false }
    * ```
    */
    deleteTodoItem: async ({ contentId }) => {
        if (!TypeChecker.isNumber(contentId)) {
            return { status: false };
        }

        const bind = [
            contentId,
        ];

        const option = {
            autoCommit: true
        };

        try {
            const result = await oracleDbHelper.connection.execute(TodoQuery.deleteTodoItem, bind, option);
            return { status: true, data: result };
        } catch (e) {
            console.log(e);
            return { status: false };
        }
    },
}