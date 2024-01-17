const validateText = (text) => {
    let textWithoutSpaces = text.replace(/\s/g, '');
    if (textWithoutSpaces.length === 0) {
        return false;
    }else{
        return true;
    }
}

const validateArray = (array) => {
    if (array.length === 0) {
        return false;
    }else{
        return true;
    }
}

const validateNumber = (number) => {
    if (number <= 0) {
        return false;
    }else{
        return true;
    }
}

const validateInputNumber = (value) => {
    const regex = /^[0-9]+$/;
    if (regex.test(value)) {
        return true;
    }
    return false;
}

export {validateText, validateArray, validateNumber, validateInputNumber};