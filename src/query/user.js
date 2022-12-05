export default {
    createUser: `INSERT INTO USERS VALUES (user_pk_seq.NEXTVAL, :2, :3, :4, :5, :6, :7, :8)`,
    findUserByAccount: `SELECT * FROM USERS WHERE account = :account`,
    findUserByNickname: `SELECT * FROM USERS WHERE nickname = :nickname`,
    updateUserByAccount: `UPDATE USERS SET nickname = :nickname, profile = :profile, disclosure = :disclosure, update_at = :update_at WHERE account = :account`, 
    updateUserByNickname: `UPDATE USERS SET nickname = :nickname, profile = :profile, disclosure = :disclosure, update_at = :update_at WHERE nickname = :nickname`, 
    deleteUserByAccount: `DELETE FROM USERS WHERE account = :account`, 
    deleteUserByNickname: `DELETE FROM USERS WHERE nickname = :nickname`, 
};