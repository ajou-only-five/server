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
    findTodoTitle: `SELECT * FROM TODO_ITEM WHERE id = :itemId`,
    /**
     * @param { Number } itemId
     */
    findTodoItem: `SELECT * FROM TODO_ITEM WHERE id = :itemId`,
    /**
     * @param { Number } userId
     * @param { Number } monthStartAt timestamp
     * @param { Number } monthEndAt timestamp
     */
    searchTodoListInMonth: `
        DECLARE
        rc sys_refcursor;
        is_empty NUMBER(1);
        BEGIN
            SELECT CASE WHEN R.length > 0 THEN 1
            ELSE 0 END AS is_empty
            INTO is_empty
            FROM (
                SELECT COUNT(*) AS length
                FROM TODO_TITLE TT, TODO_ITEM TI 
                WHERE TT.user_id = :userId
                AND TT.id = TI.title_id 
                AND TI.title_id IN (SELECT id FROM TODO_TITLE WHERE user_id = :userId) 
                AND (
                    (TI.start_at BETWEEN :startAt AND :endAt) 
                    OR (TI.end_at BETWEEN :startAt AND :endAt)
                )
                ORDER BY TI.start_at ASC, TI.create_at ASC
            ) R;
            
            IF is_empty = 1 THEN
                OPEN rc FOR SELECT 
                CASE WHEN EI.title_id = NEI.title_id THEN EI.title_id
                ELSE NEI.title_id END AS title_id,
                CASE WHEN EI.title_id = NEI.title_id THEN EI.content_id
                ELSE NULL END AS content_id,
                CASE WHEN EI.title_id = NEI.title_id THEN EI.title
                ELSE NEI.title END AS title,
                CASE WHEN EI.title_id = NEI.title_id THEN EI.color
                ELSE NEI.color END AS color,
                CASE WHEN EI.title_id = NEI.title_id THEN EI.content
                ELSE NULL END AS content,
                CASE WHEN EI.title_id = NEI.title_id THEN EI.start_at
                ELSE NULL END AS start_at,
                CASE WHEN EI.title_id = NEI.title_id THEN EI.end_at
                ELSE NULL END AS end_at,
                CASE WHEN EI.title_id = NEI.title_id THEN EI.is_checked
                ELSE NULL END AS is_checked,
                CASE WHEN EI.title_id = NEI.title_id THEN EI.create_at
                ELSE NEI.create_at END AS create_at
                FROM (
                    SELECT TI.title_id, TI.id as content_id, TT.title, TT.color, TI.content, TI.start_at, TI.end_at, TI.is_checked, TT.create_at
                    FROM TODO_TITLE TT, TODO_ITEM TI 
                    WHERE TT.user_id = :userId
                    AND TT.id = TI.title_id 
                    AND TI.title_id IN (SELECT id FROM TODO_TITLE WHERE user_id = :userId) 
                    AND (
                        (TI.start_at BETWEEN :startAt AND :endAt) 
                        OR (TI.end_at BETWEEN :startAt AND :endAt)
                    )
                    ORDER BY TI.start_at ASC, TI.create_at ASC
                ) EI,
                (
                    SELECT id AS title_id, title, color, create_at
                    FROM TODO_TITLE
                    WHERE user_id = :userId
                ) NEI
                ORDER BY create_at ASC;

                dbms_sql.return_result(rc);
            ELSE
                OPEN rc FOR SELECT id AS title_id, title, color
                FROM TODO_TITLE
                WHERE user_id = :userId;

                dbms_sql.return_result(rc);
            END IF;
        END;
    `,

    // `
    //     SELECT TI.title_id, TI.id as content_id, TT.title, TI.content, TI.start_at, TI.end_at, TI.is_checked, TI.create_at
    //     FROM TODO_TITLE TT, TODO_ITEM TI 
    //     WHERE TT.user_id = :1 
    //     AND TT.id = TI.title_id 
    //     AND TI.title_id IN (SELECT id FROM TODO_TITLE WHERE user_id = :2) 
    //     AND ((TI.start_at BETWEEN :3 AND :4) 
    //     OR (TI.end_at BETWEEN :5 AND :6))
    //     ORDER BY TI.start_at ASC, create_at ASC
    // `,
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