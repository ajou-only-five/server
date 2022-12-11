export default Object.freeze({
    /**
     * @param { Number } userId 유저 id
     */
    searchOnlyFiveByUserId: `
        SELECT friend_id as id, account, nickname, profile, disclosure, item_num
        FROM ONLY_FIVE 
        WHERE user_id = :user_id 
        ORDER BY item_num
        `,
});