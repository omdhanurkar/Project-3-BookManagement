

// ---------------------body-------------------------------------
const isValidBody = (data) => {
    if (data == undefined || data == null) return false
    if (typeof(data) ==="string" && data.trim().length == 0) return false
    return true;
};

// ---------------------------email------------------------------
const isValidEmail = (email) => {
    const regx = /^([a-z0-9_.]+@[a-z]+\.[a-z]{2,3})?$/
    return regx.test(email)
};

// -------------------------password------------------------------
const isValidPass = (pass) => {
    const regx = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,16}$/
    return regx.test(pass)
}



module.exports = {isValidBody, isValidEmail, isValidPass};