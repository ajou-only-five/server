export default Object.freeze({
    /**
     * @param { Number } userId 유저
     * @param { Number } requesteeId 친구 요청 받은 사람
     * @param { Number } createAt 생성 날짜
     */
    createFollowRequest: `
        INSERT INTO FOLLOW_REQUEST 
        VALUES (follow_request_pk_seq.NEXTVAL, :2, :3, :4)
        RETURNING id into :id
        `,
    /**
     * @param { Number } userId 친구 요청 보낸 사람
     * @param { Number } targetUserId 친구 요청 받은 사람
     */
    deleteFollowRequest: `
        DELETE FROM FOLLOW_REQUEST 
        WHERE requester_id = :userId AND requestee_id = :targetUserId
        `,
    /**
     * @param { Number } userId 친구 요청 받은 사람
     * @param { Number } targetUserId 친구 요청 보낸 사람
     */
    deleteFollowRequested: `
        DELETE FROM FOLLOW_REQUEST 
        WHERE requester_id = :targetUserId AND requestee_id = :userId
        `,
});