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

const typeCheckAll = ({objectList, typeList}) => {
    if(!Array.isArray(objectList)) {
        return false;
    }

    if(!Array.isArray(typeList)) {
        return false;
    }

    if(objectList.length !== typeList.length) {
        return false;
    }

    for(let index = 0; index < objectList.length; index++) {
        if(getType(objectList[index]) !== typeList[index]) {
            return false;
        }
    }

    return true;
};

export default Object.freeze({
    getType: getType,
    isString: isString,
    isNumber: isNumber,
    typeCheckAll: typeCheckAll
});