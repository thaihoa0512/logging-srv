module.exports = validate;
const GOOD = 0;
const ERROR = 1;
 function validate(name, value,minLength,maxLength,byPassError, res, next) {
    if (!value || value.trim().length < minLength ||value.trim().length > maxLength || value == "undefined") {
        // custom application error
        if (byPassError != "Y"){
            let msg = name +' is required and from  ' +minLength + " to " + maxLength + " input value is: ["+value+"]";
            console.log("return msg :" + msg);
            return res.status(422).json({
                message: msg
            }) 
        }
        return ERROR;
    }

   return GOOD;
}