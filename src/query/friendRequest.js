export default Object.freeze({
    /**
     * @param { Number } followerId 친구 요청 보낸 사람
     * @param { Number } followeeId 친구 요청 받은 사람
     * @param { Number } createAt 생성 날짜
     */
    createFriendRequest: `
        INSERT INTO FRIEND_REQUEST 
        VALUES (friend_request_pk_seq.NEXTVAL, :2, :3, :4)
        RETURNING id into :id
        `,
    /**
     * @param { Number } followerId 친구 요청 보낸 사람
     * @param { Number } followeeId 친구 요청 받은 사람
     */
    deleteFriendRequest: `
        DELETE FROM FRIEND_REQUEST 
        WHERE followerId = :followerId AND followeeId = :followeeId
        `,
});