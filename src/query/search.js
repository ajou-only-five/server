export default Object.freeze({
    /**
     * @param { Number } userId 본인
     */
    searchFriendByUserId: `
     SELECT U.id, U.account, U.nickname, U.profile, U.disclosure, 0 as relation
     FROM USERS U, (
         SELECT *
         FROM FOLLOW
         WHERE follower_id = :userId OR followee_id = :userId
     ) F
     WHERE (F.follower_id = :userId AND U.id IN F.followee_id) OR (F.followee_id = :userId AND U.id IN F.follower_id)
     ORDER BY nickname ASC, id ASC
     `,
    /**
    * @param { Number } userId 본인
    * @param { Number } start 시작 범위
    * @param { Number } end 종료 범위
    */
    searchFriendByUserIdBetween: `
    SELECT id, account, nickname, profile, disclosure, 0 as relation
    FROM (
        SELECT ROWNUM AS NUM, id, account, nickname, profile, disclosure 
        FROM (
            SELECT U.id, U.account, U.nickname, U.profile, U.disclosure 
            FROM USERS U, (
                SELECT *
                FROM FOLLOW
                WHERE follower_id = :user_id OR followee_id = :user_id
            ) F
            WHERE (F.follower_id = :user_id AND U.id IN F.followee_id) OR (F.followee_id = :user_id AND U.id IN F.follower_id)
            ORDER BY U.nickname ASC
        )
    ) WHERE NUM BETWEEN :start AND :end;
    `,
    /**
   * @param { Number } userId 본인
   * @param { String } nickname 검색하는 닉네임
   */
    searchFriendByUserIdAndNickname: (nickname) => `
        SELECT id, account, nickname, profile, disclosure, 0 as relation
        FROM (
            SELECT U.id, U.account, U.nickname, U.profile, U.disclosure 
            FROM USERS U, (
                SELECT *
                FROM FOLLOW
                WHERE follower_id = :user_id OR followee_id = :user_id
            ) F
            WHERE (F.follower_id = :user_id AND U.id IN F.followee_id) 
            OR (F.followee_id = :user_id AND U.id IN F.follower_id)
            ORDER BY U.nickname ASC
        ) WHERE nickname LIKE '%${nickname}%'
    `,
    /**
    * @param { Number } userId 본인
    * @param { String } nickname 검색하는 닉네임
    * @param { Number } start 시작 범위
    * @param { Number } end 종료 범위
    */
    searchFriendByUserIdAndNicknameBetween: (nickname) => `
    SELECT id, account, nickname, profile, disclosure, 0 as relation
    FROM (
        SELECT ROWNUM AS NUM, id, account, nickname, profile, disclosure 
        FROM (
            SELECT U.id, U.account, U.nickname, U.profile, U.disclosure 
            FROM USERS U, (
                SELECT *
                FROM FRIEND
                WHERE user_id_1 = :user_id OR user_id_2 = :user_id
            ) F
            WHERE (F.user_id_1 = :user_id AND U.id IN F.user_id_2) 
            OR (F.user_id_2 = :user_id AND U.id IN F.user_id_1)
            ORDER BY U.nickname ASC
        ) WHERE nickname LIKE '%${nickname}%'
    ) WHERE NUM BETWEEN :start AND :end;
    `,
    /**
     * @param { Number } userId 유저 아이디
     */
    searchFriendRequestByUserId: `
     SELECT U.id, U.account, U.nickname, U.profile, U.disclosure, 1 as relation
     FROM USERS U, (
         SELECT requestee_id
         FROM FOLLOW_REQUEST
         WHERE requester_id = :userId
     ) F
     WHERE U.id = F.requestee_id
     ORDER BY nickname ASC, id ASC
     `,
    /**
    * @param { Number } userId 본인
    * @param { Number } start 시작 범위
    * @param { Number } end 종료 범위
    */
    searchFriendRequestByUserIdBetween: `
    SELECT id, account, nickname, profile, disclosure, 1 as relation
    FROM (
        SELECT ROWNUM AS NUM, id, account, nickname, profile, disclosure 
        FROM  ( SELECT U.id, U.account, U.nickname, U.profile, U.disclosure 
     FROM USERS U, (
         SELECT requestee_id
         FROM FOLLOW_REQUEST
         WHERE requester_id = :user_id
     ) F
     WHERE U.id = F.requestee_id
     ORDER BY U.nickname ASC, id ASC
     )
     ) WHERE NUM BETWEEN :start AND :end;
     `,
    /**
  * @param { Number } userId 본인
  * @param { String } nickname 검색하려는 닉네임

  */
    searchFriendRequestByUserIdAndNickname: (nickname) => `
        SELECT id, account, nickname, profile, disclosure, 1 as relation 
        FROM  ( 
            SELECT U.id, U.account, U.nickname, U.profile, U.disclosure 
            FROM USERS U, (
                SELECT requestee_id
                FROM FOLLOW_REQUEST
                WHERE requester_id = :user_id
            ) F
            WHERE U.id = F.requestee_id
            ORDER BY U.nickname ASC, id ASC
        ) WHERE nickname LIKE '%${nickname}%';
     `,
    /**
   * @param { Number } userId 본인
   * @param { String } nickname 검색하려는 닉네임
   * @param { Number } start 시작 범위
   * @param { Number } end 종료 범위
   */
    searchFriendRequestByUserIdAndNicknameBetween: (nickname) => `
    SELECT id, account, nickname, profile, disclosure, 1 as relation 
    FROM (
        SELECT ROWNUM AS NUM, id, account, nickname, profile, disclosure 
        FROM  ( 
            SELECT U.id, U.account, U.nickname, U.profile, U.disclosure 
            FROM USERS U, (
                SELECT requestee_id
                FROM FOLLOW_REQUEST
                WHERE requester_id = :user_id
            ) F
            WHERE U.id = F.requestee_id
            ORDER BY U.nickname ASC, id ASC
        ) WHERE nickname LIKE '%${nickname}%'
     ) WHERE NUM BETWEEN :start AND :end;
     `,
    /**
    * @param { Number } userId 유저 아이디
    */
    searchFriendRequestedByUserId: `
    SELECT U.id, U.account, U.nickname, U.profile, U.disclosure, 2 as relation
    FROM USERS U, (
        SELECT requester_id
        FROM FOLLOW_REQUEST
        WHERE requestee_id = :userId
    ) F
    WHERE U.id = F.requester_id
    ORDER BY nickname ASC, id ASC
    `,
    /**
    * @param { Number } userId 본인
    * @param { Number } start 시작 범위
    * @param { Number } end 종료 범위
    */
    searchFriendRequestedByUserIdBetween: `
     SELECT id, account, nickname, profile, disclosure, 2 as relation
     FROM (
         SELECT ROWNUM AS NUM, id, account, nickname, profile, disclosure 
         FROM  ( SELECT U.id, U.account, U.nickname, U.profile, U.disclosure 
      FROM USERS U, (
        SELECT requester_id
        FROM FOLLOW_REQUEST
        WHERE requestee_id = :userId
      ) F
      WHERE U.id = F.requester_id
      ORDER BY U.nickname ASC, id ASC
      )
      ) WHERE NUM BETWEEN :start AND :end;
      `,
    /**
    * @param { Number } userId 본인
    * @param { String } nickname 검색하려는 닉네임
    */
    searchFriendRequestedByUserIdAndNickname: (nickname) => `
     SELECT ROWNUM AS NUM, id, account, nickname, profile, disclosure, 2 as relation 
         FROM  ( 
            SELECT U.id, U.account, U.nickname, U.profile, U.disclosure 
            FROM USERS U, (
                SELECT requester_id
                FROM FOLLOW_REQUEST
                WHERE requestee_id = :userId
            ) F
            WHERE U.id = F.requester_id
            ORDER BY U.nickname ASC, id ASC
        ) WHERE nickname LIKE '%${nickname}%';
      `,
    /**
    * @param { Number } userId 본인
    * @param { String } nickname 검색하려는 닉네임
    * @param { Number } start 시작 범위
    * @param { Number } end 종료 범위
    */
    searchFriendRequestedByUserIdAndNicknameBetween: (nickname) => `
     SELECT id, account, nickname, profile, disclosure, 2 as relation  
     FROM (
         SELECT ROWNUM AS NUM, id, account, nickname, profile, disclosure 
         FROM  ( 
            SELECT U.id, U.account, U.nickname, U.profile, U.disclosure 
            FROM USERS U, (
                SELECT requester_id
                FROM FOLLOW_REQUEST
                WHERE requestee_id = :userId
            ) F
            WHERE U.id = F.requester_id
            ORDER BY U.nickname ASC, id ASC
        ) WHERE nickname LIKE '%${nickname}%'
      ) WHERE NUM BETWEEN :start AND :end;
      `,
    /**
    * @param { Number } userId 본인
    */
    searchNotFriendByUserId: `
        SELECT user_id, account, nickname, profile, disclosure, relation
        FROM (
            SELECT id as user_id, account, nickname, profile, disclosure,  
            CASE WHEN id IN (
                SELECT requestee_id
                FROM FOLLOW_REQUEST
                WHERE requester_id = :user_id
            ) THEN 1
            WHEN id IN (
                SELECT requester_id
                FROM FOLLOW_REQUEST
                WHERE requestee_id = :user_id
            ) THEN 2
            WHEN (
                id <> :user_id
                AND id NOT IN (
                    SELECT followee_id
                    FROM FOLLOW
                    WHERE follower_id = :user_id
                )
                AND id NOT IN (
                    SELECT follower_id
                    FROM FRIEND
                    WHERE followee_id = :user_id
                )
                AND id NOT IN (
                    SELECT requestee_id
                    FROM FOLLOW_REQUEST
                    WHERE requester_id = :user_id
                )
                AND id NOT IN (
                    SELECT requester_id
                    FROM FOLLOW_REQUEST
                    WHERE requestee_id = :user_id
                )
            ) THEN 3
            ELSE 0 END as relation
            FROM USERS
            ORDER BY relation ASC
        ) 
        WHERE relation <> 0
        `,
    /**
    * @param { Number } userId 본인
    * @param { String } nickname 검색하려는 닉네임
    */
    searchNotFriendByUserIdAndNickname: (nickname) => `
         SELECT user_id, account, nickname, profile, disclosure, relation
         FROM (
             SELECT id as user_id, account, nickname, profile, disclosure,  
             CASE WHEN id IN (
                SELECT requestee_id
                FROM FOLLOW_REQUEST
                WHERE requester_id = :user_id
            ) THEN 1
            WHEN id IN (
                SELECT requester_id
                FROM FOLLOW_REQUEST
                WHERE requestee_id = :user_id
            ) THEN 2
            WHEN (
                id <> :user_id
                AND id NOT IN (
                    SELECT followee_id
                    FROM FOLLOW
                    WHERE follower_id = :user_id
                )
                AND id NOT IN (
                    SELECT follower_id
                    FROM FOLLOW
                    WHERE followee_id = :user_id
                )
                AND id NOT IN (
                    SELECT requestee_id
                    FROM FOLLOW_REQUEST
                    WHERE requester_id = :user_id
                )
                AND id NOT IN (
                    SELECT requester_id
                    FROM FOLLOW_REQUEST
                    WHERE requestee_id = :user_id
                )
            ) THEN 3
             ELSE 0 END as relation
             FROM USERS
             WHERE nickname LIKE '%${nickname}%'
             ORDER BY relation ASC
         )
         WHERE relation <> 0
         `,
    /**
   * @param { Number } userId 본인
   * @param { Number } start 시작 범위
   * @param { Number } end 종료 범위
   */
    searchNotFriendByUserIdBetweenStartAndEnd: `
        SELECT user_id, account, nickname, profile, disclosure, relation
        FROM (
            SELECT ROWNUM as NUM, id as user_id, account, nickname, profile, U.disclosure,  
            CASE WHEN id IN (
                SELECT requestee_id
                FROM FOLLOW_REQUEST
                WHERE requester_id = :user_id
            ) THEN 1
            WHEN id IN (
                SELECT requester_id
                FROM FOLLOW_REQUEST
                WHERE requestee_id = :user_id
            ) THEN 2
            WHEN (
                id <> :user_id
                AND id NOT IN (
                    SELECT followee_id
                    FROM FOLLOW
                    WHERE follower_id = :user_id
                )
                AND id NOT IN (
                    SELECT follower_id
                    FROM FOLLOW
                    WHERE followee_id = :user_id
                )
                AND id NOT IN (
                    SELECT requestee_id
                    FROM FOLLOW_REQUEST
                    WHERE requester_id = :user_id
                )
                AND id NOT IN (
                    SELECT requester_id
                    FROM FOLLOW_REQUEST
                    WHERE requestee_id = :user_id
                )
            ) THEN 3
            ELSE 0 END as relation
            FROM USERS
            ORDER BY relation ASC
        ) 
        WHERE relation <> 0
        AND NUM BETWEEN :start AND :end
        `,
    /**
   * @param { Number } userId 본인
   * @param { String } nickname 검색하려는 닉네임
   * @param { Number } start 시작 범위
   * @param { Number } end 종료 범위
   */
    searchNotFriendByUserIdAndNicknameBetweenStartAndEnd: (nickname) => `
          SELECT user_id, account, nickname, profile, disclosure, relation
          FROM (
              SELECT id as user_id, account, nickname, profile, disclosure,  
              CASE WHEN id IN (
                SELECT requestee_id
                FROM FOLLOW_REQUEST
                WHERE requester_id = :user_id
            ) THEN 1
            WHEN id IN (
                SELECT requester_id
                FROM FOLLOW_REQUEST
                WHERE requestee_id = :user_id
            ) THEN 2
            WHEN (
                id <> :user_id
                AND id NOT IN (
                    SELECT followee_id
                    FROM FOLLOW
                    WHERE follower_id = :user_id
                )
                AND id NOT IN (
                    SELECT follower_id
                    FROM FOLLOW
                    WHERE followee_id = :user_id
                )
                AND id NOT IN (
                    SELECT requestee_id
                    FROM FOLLOW_REQUEST
                    WHERE requester_id = :user_id
                )
                AND id NOT IN (
                    SELECT requester_id
                    FROM FOLLOW_REQUEST
                    WHERE requestee_id = :user_id
                )
            ) THEN 3
              ELSE 0 END as relation
              FROM USERS
              WHERE nickname LIKE '%${nickname}%'
              ORDER BY relation ASC
          )
          WHERE relation <> 0
          AND NUM BETWEEN :start AND :end
          `
});