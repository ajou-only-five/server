export default Object.freeze({
    /**
     * @param { Number } userId 유저 ID
     * @param { Number } followerId 팔로워 ID
     */
    createFollow: `
    BEGIN 
        CREATE_FRIEND(:targetUserId, :userId, :deleteTargerUserId, :deleteUserId, :followTargetUserId, :followUserId); 
    END;
        `,
    /**
     * @param { Number } userId 유저 ID
     * @param { Number } friendId 친구 ID 
     */
    deleteFriend: `
        DELETE FROM FOLLOW 
        WHERE (follower_id = :friendId AND followee_id = :userId) 
        OR (follower_id = :userId AND followee_id = :friendId)
        `,
});