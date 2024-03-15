<div align=center>
	<img src="https://capsule-render.vercel.app/api?type=rect&color=auto&height=130&section=header&text=Only-Five-Server&fontSize=80&fontAlignY=53" />
</div>
<div align=center>
	<h3>📚 Tech Stack 📚</h3>
	<p>✨ Platforms & Languages ✨</p>
</div>
<div align="center">
    <img src="https://img.shields.io/badge/JavaScript-F7DF1E?style=flat&logo=JavaScript&logoColor=white" />
    <img src="https://img.shields.io/badge/Expresss-000000?style=flat&logo=express&logoColor=white" />
    <img src="https://img.shields.io/badge/Oracle-F80000?style=flat&logo=Oracle&logoColor=white" />
    <br/>    
    <br/>
</div>

# ajou-only-five
Only-Five 프로젝트 중 서버 프로젝트입니다.

## 프로젝트 구조
```sh
src
├── controllers # API 요청 및 응답를 RESTful하게 처리하는 것을 담당합니다. 
├── db # DB 연결을 담당합니다.
├── env # env 파일의 환경 변수를 불러오는 것을 담당합니다.
├── query # DB 쿼리를 담당합니다.
├── routers # API 요청을 각 Controller에 맞게 경로를 할당합니다.
├── services # 비즈니스 로직을 처리합니다.
├── types # 데이터 타입을 JDocs로 매핑합니다.
└── utils # 유틸성 함수를 모아놓습니다.
```

## 프로젝트 주요 기능

1. To-do 관리

+ To-do를 등록, 수정, 삭제할 수 있어요
+ To-do 공개 범위를 선택할 수 있어요

2. 친구 기능
+ 친구를 추가, 삭제할 수 있어요
+ 사용자를 검색할 수 있어요

3. 월별 To-do 랭킹 차트
+ 최대 5명까지 월별로 To-do 목록 완료 개수를 가장 많은 순으로 보여줘요

## 목표
1. 프로젝트 주요 기능을 구현해요
2. 라이브러리 없이 개발해요. 필수 라이브러리나 SDK가 아닌 이상 직접 구현해요.

### 타입 안정성
JS는 컴파일 시점에 타입 체크를 하지 않기 때문에, 다음 두 가지를 활용해 최대한 타입을 체크하고 에러를 핸들링해요

1. JDocs를 활용해 함수 별로 파라미터 타입, 리턴 타입, Exception 타입 등이 무엇인지 명확히 관리해요
2. TypeCheckUtil를 활용해 비즈니스 로직에서 타입을 먼저 체크한 뒤 로직을 작성해요

아래는 예시에요

```js
/**
     * @namedparam
     * @param { Object } data
     * @property { Number } userId - data.userId, 유저 id
     * @property { Number } followerId - data.followerId, 팔로워 id
     * 
     * @return { Object } 
     * @property { Boolean } status
     * @property { Number } friendId
     * 
     * @description
     * ```js
     * // 친구 생성이 정상적으로 완료되고, 해당 정보가 DB에 저장 됐을 경우
     * { 
     *  status : true, 
     *  data: {
     *          friendId: 0
     *      }
     * } 
     * 
     * // parameter 타입이 맞지 않을 경우
     * // 친구 생성이 완료되지 않았을 경우
     * // 해당 정보가 DB에 저장되지 않았을 경우
     * { status : false }
     * ```
     */
    createFollow: async ({ userId, followerId }) => {
        const typeCheckData = [
            [userId, followerId],
            ['number', 'number'],
        ];

        const typeCheckResult = TypeChecker.typeCheckAll({ objectList: typeCheckData[0], typeList: typeCheckData[1] });

        if (typeCheckResult) {
            return false;
        }

        const bind = [
            followerId,
            userId,
            {
                dir: oracledb.BIND_OUT,
                type: oracledb.NUMBER
            },
            {
                dir: oracledb.BIND_OUT,
                type: oracledb.NUMBER
            },
            {
                dir: oracledb.BIND_OUT,
                type: oracledb.NUMBER
            },
            {
                dir: oracledb.BIND_OUT,
                type: oracledb.NUMBER
            }
        ]

        const option = {
            autoCommit: true
        };

        try {
            const result = await oracleDbHelper.connection.execute(FollowQuery.createFollow, bind, option);
            console.log(result);
            return { status: true};
        } catch (e) {
            console.log(e);
            return { status: false };
        }
    },
```

### CORS
Express에 등록할 미들웨어 중 CORS를 직접 구현해요. 다음과 같은 기능을 구현해요.

1. allowedOrigins를 등록해요
2. 허용할 header key를 등록해요
3. 허용할 RESTful API method를 등록해요
4. HTTP 통신간 자격 증명을 활성화할 것인지 여부를 등록해요

CORS는 등록 이후 내용이 변경되면 안 되기 때문에, JavaScript의 Scope와 Closure 개념을 활용하여 private 기능을 구현했어요

```js
const myCors = ({ allowedOrigins, headers, methods, credentials }) => {
    let _allowedOrigins = null;
    let _headers = null;
    let _methods = null;
    let _credentials = null


    if (allowedOrigins === undefined) {
        allowedOrigins = [];
    }

    if (!Array.isArray(allowedOrigins)) {
        throw (new Error('allowedOrigins must be Array<string>'));
    }

    for (const origin of allowedOrigins) {
        if (!TypeChecker.isString(origin)) {
            throw (new Error('origin must be string'));
        }
    }

    if (headers === undefined) {
        headers = '';
    }

    if (!TypeChecker.isString(headers)) {
        throw (new Error('headers must be String'));
    }

    if (methods === undefined) {
        methods = '';
    }

    if (!TypeChecker.isString(methods)) {
        throw (new Error('methods must be String'));
    }

    if (credentials) {
        _credentials = true;
    } else {
        _credentials = false;
    }

    if (headers.length !== 0) {
        _headers = headers;
    }
    if (methods.length !== 0) {
        _methods = methods;
    }
    if (allowedOrigins.length !== 0) {
        _allowedOrigins = [...allowedOrigins];
    }

    const setHeader = (req, res, next) => {
        if (req.headers === undefined) {
            throw (new Error('The first parameter must be request.'));
        }

        if (res.status === undefined) {
            throw (new Error('The second parameter must be response.'));
        }

        if (req.headers.origin !== undefined) {
            let num = 0;

            for (const allowedOrigin of _allowedOrigins) {
                if (allowedOrigin.includes(req.headers.origin)) {
                    break;
                }
            }

            if (num === _allowedOrigins.length) {
                return res.status(400).send(`Not accepted origin ${req.headers.origin}`);
            }

            res.setHeader('Access-Control-Allow-Origin', req.headers.origin);
        }

        if (_headers !== null) {
            res.header('Access-Control-Allow-Headers', _headers);

        }
        if (_methods !== null) {
            res.header('Access-Control-Allow-Methods', _methods);
        }
        if (_credentials) {
            res.header('Access-Control-Allow-Credentials', true);
        } else {
            res.header('Access-Control-Allow-Credentials', false);
        }

        if (req.method === "OPTIONS") {
            return res.status(200).send("OK");
        }

        next();
    }

    return setHeader;
};

```