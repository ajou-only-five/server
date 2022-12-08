const getType = (target) => {
    if (Array.isArray(target) === true) {
        return "Array";
    }

    if (isDate(target)) {
        return "Date";
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

const isInteger = (number) => {
    if(isNaN(number)) {
        return false;
    }

    return number % 1 === 0;
}

// Reference : https://stackoverflow.com/questions/643782/how-to-check-whether-an-object-is-a-date
const isDate = (object) => {
    return object && Object.prototype.toString.call(object) === "[object Date]" && !isNaN(object);
}

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
    isDate: isDate,
    isInteger: isInteger,
    typeCheckAll: typeCheckAll
});