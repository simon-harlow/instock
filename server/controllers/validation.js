exports.emailValidate = email => {
    const re = /^[a-zA-Z0-9]+([\.\-\_]?[a-zA-Z0-9]+)*@[a-zA-Z0-9]+([\.\-]?[a-zA-Z0-9]+)*(\.[a-zA-Z0-9]{2,3})$/;
    const valid = re.exec(email);
    return valid;
};

exports.phoneValidate = phone => {
    const re = /^\+[0-9]\s\([0-9]{3}\)\s[0-9]{3}\-[0-9]{4}/;
    const valid = re.exec(phone);
    return valid;
}

exports.nonEmptyValidate = item => {
    const re = /^(?!\s*$)/;
    const valid = re.exec(item);
    return valid;
};
