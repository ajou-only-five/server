import oracleDbHelper from '../db/index.js';
import TypeChecker from '../utils/index.js';
import TodoQuery from '../query/todo.js';

export default {
    /**
     * @namedparam
     * @param { Object } data - 유저 객체
     * @property { Number } userId - data.userId, 유저 index
     * @property { String } title - data.title, todo 제목
     * @property { String } color - data.color, todo 색깔
     * 
     * @return { Object } 
     * @property { Boolean } status
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
            {
                value: userId,
                expectedType: 'Number'
            },
            {
                value: title,
                expectedType: 'String'
            },
            {
                value: color,
                expectedType: 'String'
            },
        ];

        const typeCheckResult = TypeChecker.typeCheckAll(typeCheckData);

        if(!typeCheckResult) {
            return false;
        }

        const data = [
            userId,
            title,
            color,
            Date.now(),
            Date.now()
        ];

        try {
            await oracleDbHelper.connection.execute(TodoQuery.createTodoTitle, data);
            await oracleDbHelper.connection.commit();
            return { status: true };
        } catch (e) {
            console.log(e);
            return { status: false };
        }
    },
    /**
     * @namedparam
     * @param { Object } data - 유저 객체
     * @property { Number } titleId - data.titleId, todo title index
     * @property { String } content - data.content, todo 내용
     * @property { Number? } startAt - data.startAt, todo 시작 시간
     * @property { Number? } endAt - data.endAt, todo 종료 시간
     * 
     * @return { Object } 
     * @property { Boolean } status
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
            {
                value: titleId,
                expectedType: 'Number'
            },
            {
                value: content,
                expectedType: 'String'
            },
        ];

        const typeCheckResult = TypeChecker.typeCheckAll(typeCheckData);

        if(!typeCheckResult) {
            return { status: false };
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

        if (!isStartAtNull && !TypeChecker.isNumber(startAt)) {
            return { status: false };
        }

        if (!isEndAtNull && !TypeChecker.isNumber(endAt)) {
            return { status: false };
        }

        let _startAt = null;
        let _endAt = null;

        if(!isStartAtNull) {
            _startAt = startAt;
        }

        if(!isEndAtNull) {
            _endAt = endAt;
        }

        const data = [
            titleId,
            content,
            _startAt,
            _endAt,
            0,
            Date.now(),
            Date.now(),
        ];

        try {
            await oracleDbHelper.connection.execute(TodoQuery.createTodoItem, data);
            await oracleDbHelper.connection.commit();
            return { status: true };
        } catch (e) {
            console.log(e);
            return { status: false };
        }
    },
    /**
     * @namedparam
     * @param { Object } data - 유저 객체
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
            {
                value: titleId,
                expectedType: 'Number'
            },
            {
                value: title,
                expectedType: 'String'
            },
            {
                value: color,
                expectedType: 'String'
            },
        ];

        const typeCheckResult = TypeChecker.typeCheckAll(typeCheckData);

        if(!typeCheckResult) {
            return { status: false };
        }

        const data = [
            title,
            color,
            Date.now(),
            titleId
        ];

        try {
            const result = await oracleDbHelper.connection.execute(TodoQuery.updateTodoTitle, data);
            await oracleDbHelper.connection.commit();
            return { status: true, data: result };
        } catch (e) {
            console.log(e);
            return { status: false };
        }
    },
    /**
     * @namedparam
     * @param { Object } data - 유저 객체
     * @property { String } content - data.content, todo 내용
     * @property { Number? } startAt - data.startAt, todo 시작 시간
     * @property { Number? } endAt - data.endAt, todo 종료 시간
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
    updateTodoItemByItemId: async ({ content, startAt, endAt, isChecked, itemId }) => {
        let isStartAtNull = null;
        let isEndAtNull = null;

        const typeCheckData = [
            {
                value: content,
                expectedType: 'String'
            },
            {
                value: isChecked,
                expectedType: 'Number'
            },
            {
                value: itemId,
                expectedType: 'Number'
            },
        ];

        const typeCheckResult = TypeChecker.typeCheckAll(typeCheckData);

        if(!typeCheckResult) {
            return { status: false };
        }

        if (!isStartAtNull && !TypeChecker.isNumber(startAt)) {
            return { status: false };
        }

        if (!isEndAtNull && !TypeChecker.isNumber(endAt)) {
            return { status: false };
        }

        let _startAt = null;
        let _endAt = null;
        let _checkedAt = null;

        if(!isStartAtNull) {
            _startAt = startAt;
        }

        if(!isEndAtNull) {
            _endAt = endAt;
        }

        let todoItem = null;

        try {
            todoItem = await oracleDbHelper.connection.execute(TodoQuery.findTodoItem, [itemId]);
        } catch (e) {
            console.log(e);
            return { status: false };
        }

        if(todoItem.length !== 8) {
            return { status: false };
        }

        const checkedAt = todoItem[8];

        if(checkedAt === null) {
            const data = [
                content,
                _startAt,
                _endAt,
                isChecked,
                Date.now(),
                Date.now(),
                itemId,
            ];

            try {
                const result = await oracleDbHelper.connection.execute(TodoQuery.updateTodoItemWithCheckedAt, data);
                await oracleDbHelper.connection.commit();
                return { status: true, data: result };
            } catch (e) {
                console.log(e);
                return { status: false };
            }
        }

        const data = [
            content,
            _startAt,
            _endAt,
            isChecked,
            Date.now(),
            itemId,
        ];

        try {
            const result = await oracleDbHelper.connection.execute(TodoQuery.updateTodoItemWithoutCheckedAt, data);
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

        const data = [
            titleId,
        ];

        try {
            const result = await oracleDbHelper.connection.execute(TodoQuery.deleteTodoTitle, data);
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
    deleteTodoItem: async ({ itemId }) => {
        if (!TypeChecker.isNumber(itemId)) {
            return { status: false };
        }

        const data = [
            itemId,
        ];

        try {
            const result = await oracleDbHelper.connection.execute(TodoQuery.deleteTodoItem, data);
            await oracleDbHelper.connection.commit();
            return { status: true, data: result };
        } catch (e) {
            console.log(e);
            return { status: false };
        }
    },
}