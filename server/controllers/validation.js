exports.emailValidate = email => {
    const re = /^[a-zA-Z0-9]+([\.\-\_]?[a-zA-Z0-9]+)*@[a-zA-Z0-9]+([\.\-]?[a-zA-Z0-9]+)*(\.[a-zA-Z0-9]{2,3})$/;
    const valid = re.exec(email);
    return valid;
};

exports.nonEmptyValidate = item => {
    const re = /^(?!\s*$)/;
    const valid = re.exec(item);
    return valid;
};
