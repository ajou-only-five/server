const getType = (target) => {
    if (Array.isArray(target) === true) {
        return "Array";
    }

    return Object.prototype.toString.call(target).slice(8, -1);
};

const isString = (object) => {
    if (getType(object) === "String") {
        return true;
    }

    return false;
};

const isNumber = (object) => {
    if (getType(object) === "Number") {
        return true;
    }

    return false;
};

const typeCheckAll = (objectArray) => {
    if(!Array.isArray(objectArray)) {
        return false;
    }

    for(const object of objectArray) {
        if(object.expectedType === undefined) {
            return false;
        }

        const type = getType(object);

        if(object.expectedType === type) {
            return true;
        }

        return false;
    }
};

export default Object.freeze({
    getType: getType,
    isString: isString,
    isNumber: isNumber,
    typeCheckAll: typeCheckAll
});