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
     * @param { Number } userId 유저 아이디
     */
    searchFriendRequestByUserId: `
     SELECT U.id, U.account, U.nickname, U.profile, U.disclosure 
     FROM USERS U, (
         SELECT followee_id
         FROM FRIEND_REQUEST
         WHERE follower_id = :userId
     ) F
     WHERE U.id = F.followee_id
     ORDER BY nickname ASC, id ASC
     `,
    /**
    * @param { Number } userId 유저 아이디
    */
    searchFriendRequestedByUserId: `
    SELECT U.id, U.account, U.nickname, U.profile, U.disclosure 
    FROM USERS U, (
        SELECT follower_id
        FROM FRIEND_REQUEST
        WHERE followee_id = :userId
    ) F
    WHERE U.id = F.follower_id
    ORDER BY nickname ASC, id ASC
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