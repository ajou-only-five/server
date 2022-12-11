export default Object.freeze({
    createUser: 
        `INSERT INTO USERS 
        VALUES (user_pk_seq.NEXTVAL, :2, :3, :4, :5, :6, :7, :8)
        RETURNING id into :id
        `,
    findUserByAccount: `SELECT id, account, password, nickname, profile, disclosure FROM USERS WHERE account = :account`,
    findUserByNickname: `SELECT nickname FROM USERS WHERE nickname = :nickname`,
    findUserByUserId: `SELECT * FROM USERS WHERE id = :userId`,
    searchUsersByNickname: ({nickname}) => `
        SELECT id, account, nickname, profile, disclosure 
        FROM USERS 
        WHERE nickname LIKE '%${nickname}%' 
        ORDER BY nickname ASC, id ASC
        `,
    searchUsersByNicknameBetween: ({nickname, start, end}) => `
        SELECT id, account, nickname, profile, disclosure 
        FROM (
            SELECT ROWNUM AS NUM, id, account, nickname, profile, disclosure 
            FROM USERS 
            WHERE nickname LIKE '%${nickname}%'
        ) WHERE NUM BETWEEN ${start} AND ${end}
        ORDER BY nickname ASC, id ASC
        `,
    updatePasswordByUserId: `UPDATE USERS SET password = :password, update_at = :update_at WHERE id = :userId`, 
    updateNicknameByUserId: `UPDATE USERS SET nickname = :nickname, update_at = :update_at WHERE id = :userId`, 
    updateProfileByUserId: `UPDATE USERS SET profile = :profile, update_at = :update_at WHERE id = :userId`, 
    updateDisclosureUserId: `UPDATE USERS SET disclosure = :disclosure, update_at = :update_at WHERE id = :userId`, 
    deleteUserByUserId: `DELETE FROM USERS WHERE id = :userId`, 
});