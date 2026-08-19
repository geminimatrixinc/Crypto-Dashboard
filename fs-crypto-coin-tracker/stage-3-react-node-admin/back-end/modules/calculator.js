// Consistent coding style with other modules

const addNumbers = (a, b) => {
    return a + b;
};

const subtractNumbers = (a, b) => {
    return a - b;
};

const multiplyNumbers = (a, b) => {
    return a * b;
};

const divideNumbers = (a, b) => {
    if (b === 0) {
        throw new Error("Cannot divide by zero");
    }
    return a / b;
};

module.exports = {
    addNumbers,
    subtractNumbers,
    multiplyNumbers,
    divideNumbers
};