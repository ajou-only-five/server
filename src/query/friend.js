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
     * @param { Number } userId_1 친구 1
     * @param { Number } userId_2 친구 2
     */
    deleteFriend: `
        DELETE FROM FRIEND 
        WHERE (userId_1 = :userId_1 AND userId_2 = :userId_2) 
        OR (userId_1 = :userId_2 AND userId_2 = :userId_1)
        `, 
});