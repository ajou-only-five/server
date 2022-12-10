export default Object.freeze({
    /**
     * @param { Number } userId 유저
     */
    searchOnlyFiveByUserId: `
        SELECT * 
        FROM ONLY_FIVE 
        WHERE user_id = :user_id 
        ORDER BY item_num
        `,
});