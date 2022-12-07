export default Object.freeze({
    /**
     * @param { Number } userId
     * @param { String } title
     * @param { String } color 컬러 헥사 코드 문자열
     * @param { Number } createAt 타임스탬프 
     * @param { Number } updateAt 타임스탬프
     */
    createTodoTitle: `
        INSERT INTO TODO_TITLE 
        VALUES (todo_title_pk_seq.NEXTVAL, :userId, :title, :color, :createAt, :updateAt)
        RETURNING id into :id
        `,
    /**
     * @param { Number } titleId
     * @param { String } content
     * @param { Number? } startAt
     * @param { Number? } endAt
     * @param { Number } isChecked 0 : false, 1 : true
     * @param { Number } createAt
     * @param { Number } updateAt
     */
    createTodoItem: `INSERT INTO TODO_ITEM(id, title_id, content, start_at, end_at, is_checked, create_at, update_at) 
    VALUES (todo_item_pk_seq.NEXTVAL, :titleId, :content, :startAt, :endAt, :isChecked, :createAt, :updateAt)
    RETURNING id into :id`,
    /**
     * @param { Number } titleId
     */
    findTodoItem : `SELECT * FROM TODO_ITEM WHERE id = :itemId`,
    /**
     * @param { Number } userId
     * @param { Number } userId
     * @param { Number } monthStartAt timestamp
     * @param { Number } monthEndAt timestamp
     * @param { Number } monthStartAt timestamp
     * @param { Number } monthEndAt timestamp
     */
    searchTodoListInMonth :`
        SELECT TI.title_id, TI.id as item_id, TT.title, TI.content, TI.start_at, TI.end_at, TI.is_checked, TI.create_at
        FROM TODO_TITLE TT, TODO_ITEM TI 
        WHERE TT.user_id = :1 
        AND TT.id = TI.title_id 
        AND TI.title_id IN (SELECT id FROM TODO_TITLE WHERE user_id = :2) 
        AND ((TI.start_at BETWEEN :3 AND :4) 
        OR (TI.end_at BETWEEN :5 AND :6))
    `,
    /**
     * @param { String } title
     * @param { String } color
     * @param { Number } updateAt
     * @param { Number } titleId
     */
    updateTodoTitle: `UPDATE TODO_TITLE SET title=:title, color=:color, update_at=:updateAt WHERE id=:titleId`,
    /**
     * @param { String } content
     * @param { Number? } startAt
     * @param { Number? } endAt
     * @param { Number } isChecked
     * @param { Number } updateAt
     * @param { Number? } checkedAt
     * @param { Number } itemId
     */
    updateTodoItemWithCheckedAt: `UPDATE TODO_ITEM SET content=:content, start_at=:startAt, end_at=:endAt, is_checked=:isChecked, update_at=:updateAt, checked_at=:checkedAt WHERE id=:itemId`,
    /**
     * @param { String } content
     * @param { Number? } startAt
     * @param { Number? } endAt
     * @param { Number } isChecked
     * @param { Number } updateAt
     * @param { Number } itemId
     */
    updateTodoItemWithoutCheckedAt: `UPDATE TODO_ITEM SET content=:content, start_at=:startAt, end_at=:endAt, is_checked=:isChecked, update_at=:updateAt WHERE id=:itemId`,
    /**
     * @param { Number } titleId
     */
    deleteTodoTitle: `
        DECLARE
            BEGIN
                DELETE FROM TODO_TITLE WHERE id=:title_id;
                DELETE FROM TODO_ITEM WHERE title_id=:title_id;
            END;
    `,
    /**
     * @param { Number } itemId
     */
    deleteTodoItem: `DELETE FROM TODO_ITEM WHERE id=:item_id`,
});