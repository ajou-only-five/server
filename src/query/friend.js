export default Object.freeze({
    /**
     * @param { Number } userId_1 친구 1
     * @param { Number } userId_2 친구 2
     * @param { Number } createAt 생성 날짜
     */
    createFriend: `
        INSERT INTO FRIEND
        VALUES (friend_pk_seq.NEXTVAL, :2, :3, :4)
        RETURNING id into :id
        `,
    /**
     * @param { Number } userId 친구
     */
    searchFriendByUserId: `
        SELECT U.id, U.account, U.nickname, U.profile, U.disclosure 
        FROM USERS U, (
            SELECT *
            FROM FRIEND
            WHERE user_id_1 = :userId OR user_id_2 = :userId
        ) F
        WHERE (F.user_id_1 = :userId AND U.id IN F.user_id_2) OR (F.user_id_2 = :userId AND U.id IN F.user_id_1)
        ORDER BY nickname ASC, id ASC
        `,
    /**
     * @param { Number } userId_1 친구 1
     * @param { Number } userId_2 친구 2
     */
    deleteFriend: `
        DELETE FROM FRIEND 
        WHERE (userId_1 = :userId_1 AND userId_2 = :userId_2) 
        OR (userId_1 = :userId_2 AND userId_2 = :userId_1)
        `,
});