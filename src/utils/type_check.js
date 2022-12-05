const getType = (target) => {
    if (Array.isArray(target) === true) {
        return "Array";
    }

    return Object.prototype.toString.call(target).slice(8, -1);
}

const isString = (object) => {
    if (getType(object) === "String") {
        return true;
    }

    return false;
}

const isNumber = (object) => {
    if (getType(object) === "Number") {
        return true;
    }

    return false;
}

export default (function () {
    return {
        isString: isString,
        isNumber: isNumber,
    };
})();