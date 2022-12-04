export default {
    createUser: `INSERT INTO USERS VALUES (user_pk_seq.NEXTVAL, :2, :3, :4, :5, :6, :7, :8)`,
    findUserByAccount: `SELECT * FROM USERS WHERE account = :account ORDER BY nickname`,
    findUserByNickname: `SELECT * FROM USERS WHERE nickname = :nickname ORDER BY nickname`,
    searchUsersByNickname: ({nickname}) => `SELECT * FROM USERS WHERE nickname LIKE '%${nickname}%' ORDER BY nickname`,
    searchUsersByNicknameBetween: ({nickname, start, end}) => `SELECT id, account, nickname, profile, disclosure FROM (SELECT ROWNUM AS NUM, id, account, nickname, profile, disclosure FROM USERS WHERE nickname LIKE '%${nickname}%') WHERE NUM BETWEEN ${start} AND ${end}`,
    updateUserByAccount: `UPDATE USERS SET nickname = :nickname, profile = :profile, disclosure = :disclosure, update_at = :update_at WHERE account = :account`, 
    updateUserByNickname: `UPDATE USERS SET nickname = :nickname, profile = :profile, disclosure = :disclosure, update_at = :update_at WHERE nickname = :nickname`, 
    deleteUserByAccount: `DELETE FROM USERS WHERE account = :account`, 
    deleteUserByNickname: `DELETE FROM USERS WHERE nickname = :nickname`, 
};