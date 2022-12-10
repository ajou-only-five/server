export default Object.freeze({
    /**
     * @param { Number } userId 유저 ID
     * @param { Number } followerId 팔로워 ID
     */
    createFollow: `
        DELETE FROM FOLLOW_REQUEST 
        WHERE requester_id = :followerId
        AND requested_id = :userId;
        INSERT INTO FOLLOW
        VALUES (follow_pk_seq.NEXTVAL, :followerId, :userId, sysdate)
        RETURNING follwer_id into :id
        `,
    /**
     * @param { Number } userId 유저 ID
     * @param { Number } friendId 친구 ID 
     */
    deleteFriend: `
        DELETE FROM FRIEND 
        WHERE (follower_id = :followerId AND followee_id = :userId) 
        OR (follower_id = :userId AND followee_id = :followee_id)
        `,
});