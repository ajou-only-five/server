export const DBStatusEnum = {
    success: {
        code: 200,
        message: "SQL execution is succeed."
    },
    parameterTypeError: {
        code: 400,
        message: "Invalid parameter type.",
    },
    parameterLengthError: {
        code: 401,
        message: "The lengths of the both, columns and data, are not matched."
    },
    notInitialized: {
        code: 500,
        message: "DB is not initialized."
    },
    executeError: {
        code: 501,
        message: "SQL error."
    }
};

Object.freeze(DBStatusEnum);
