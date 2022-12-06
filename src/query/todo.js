export default Object.freeze({
    createTodoTitle:
        `DECLARE
            USER_ID NUMBER(10);
            BEGIN
                SELECT id INTO USER_ID FROM USERS WHERE nickname = :1;
                INSERT INTO TODO_TITLE VALUES (todo_title_pk_seq.NEXTVAL, USER_ID, :2, :3, :4);
            END;`,
    findTodoByNicknameWithStartAndEnd: ({ nickname, start, end }) => ``,
    searchUsersByNickname: ({ nickname }) => `SELECT * FROM USERS WHERE nickname LIKE '%${nickname}%' ORDER BY nickname`,
    searchUsersByNicknameBetween: ({ nickname, start, end }) => `SELECT id, account, nickname, profile, disclosure FROM (SELECT ROWNUM AS NUM, id, account, nickname, profile, disclosure FROM USERS WHERE nickname LIKE '%${nickname}%') WHERE NUM BETWEEN ${start} AND ${end}`,
    updateUserByAccount: `UPDATE USERS SET nickname = :nickname, profile = :profile, disclosure = :disclosure, update_at = :update_at WHERE account = :account`,
    updateUserByNickname: `UPDATE USERS SET nickname = :nickname, profile = :profile, disclosure = :disclosure, update_at = :update_at WHERE nickname = :nickname`,
    deleteUserByAccount: `DELETE FROM USERS WHERE account = :account`,
    deleteUserByNickname: `DELETE FROM USERS WHERE nickname = :nickname`,
});


`DECLARE
            USER_ID NUMBER(10);
            BEGIN
                SELECT id INTO USER_ID FROM USERS WHERE nickname = :1;
                SELECT * FROM USERS WHERE nickname LIKE '%${nickname}%' ORDER BY nickname;
            END;`