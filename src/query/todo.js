export default Object.freeze({
    /**
     * @param { Number } userId
     * @param { String } title
     * @param { String } color 컬러 헥사 코드 문자열
     * @param { Number } createAt 타임스탬프 
     * @param { Number } updateAt 타임스탬프
     */
    createTodoTitle: `INSERT INTO TODO_TITLE VALUES (todo_title_pk_seq.NEXTVAL, :userId, :title, :color, :createAt, :updateAt)`,
    /**
     * @param { Number } titleId
     * @param { String } content
     * @param { Number? } startAt
     * @param { Number? } endAt
     * @param { Number } isChecked 0 : false, 1 : true
     * @param { Number } createAt
     * @param { Number } updateAt
     * @param { Number? } checkedAt 
     */
    createTodoItem: `INSERT INTO TODO_ITEM VALUES (todo_item_pk_seq.NEXTVAL, :titleId, :content, :startAt, :endAt, :isChecked, :createAt, :updateAt)`,
    /**
     * @param { Number } titleId
     */
    findTodoItem : `SELECT * FROM TODO_ITEM WHERE id = :itemId`,
    /**
     * @param { String } title
     * @param { String } color
     * @param { Number } updateAt
     * @param { Number } titleId
     */
    updateTodoTitle: `UPDATE TODO_TITLE SET title=:title, color=:color, update_at=:updateAt WHERE id=:titleId`,
    /**
     * @param { String } content
     * @param { Number } startAt
     * @param { Number } endAt
     * @param { Number } isChecked
     * @param { Number } updateAt
     * @param { Number } checkedAt
     * @param { Number } itemId
     */
    updateTodoItemWithCheckedAt: `UPDATE TODO_ITEM SET content=:content, start_at=:startAt, end_at=:endAt, is_checked=:isChecked, update_at=:updateAt, checked_at=:checkedAt WHERE id=:itemId`,
    /**
     * @param { String } content
     * @param { Number } startAt
     * @param { Number } endAt
     * @param { Number } isChecked
     * @param { Number } updateAt
     * @param { Number } itemId
     */
    updateTodoItemWithoutCheckedAt: `UPDATE TODO_ITEM SET content=:content, start_at=:startAt, end_at=:endAt, is_checked=:isChecked, update_at=:updateAt WHERE id=:itemId`,
    /**
     * @param { Number } titleId
     */
    deleteTodoTitle: `DELETE FROM TODO_TITLE WHERE id=:title_id`,
    /**
     * @param { Number } itemId
     */
    deleteTodoItem: `DELETE FROM TODO_ITEM WHERE id=:item_id`,
});