export default Object.freeze({
    createUser: `INSERT INTO USERS VALUES (user_pk_seq.NEXTVAL, :2, :3, :4, :5, :6, :7, :8)`,
    findUserByAccount: `SELECT * FROM USERS WHERE account = :account ORDER BY nickname`,
    findUserByNickname: `SELECT * FROM USERS WHERE nickname = :nickname ORDER BY nickname`,
    searchUsersByNickname: ({nickname}) => `SELECT * FROM USERS WHERE nickname LIKE '%${nickname}%' ORDER BY nickname`,
    searchUsersByNicknameBetween: ({nickname, start, end}) => `SELECT id, account, nickname, profile, disclosure FROM (SELECT ROWNUM AS NUM, id, account, nickname, profile, disclosure FROM USERS WHERE nickname LIKE '%${nickname}%') WHERE NUM BETWEEN ${start} AND ${end}`,
    updatePasswordByAccount: `UPDATE USERS SET password = :password, update_at = :update_at WHERE account = :account`, 
    updateNicknameByAccount: `UPDATE USERS SET nickname = :nickname, update_at = :update_at WHERE account = :account`, 
    updateProfileByAccount: `UPDATE USERS SET profile = :profile, update_at = :update_at WHERE account = :account`,
    updateDisclosureByAccount: `UPDATE USERS SET disclosure = :disclosure, update_at = :update_at WHERE account = :account`,
    deleteUserByAccount: `DELETE FROM USERS WHERE account = :account`, 
    deleteUserByNickname: `DELETE FROM USERS WHERE nickname = :nickname`, 
});