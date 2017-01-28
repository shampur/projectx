/**
 * Created by cshampur on 1/28/17.
 */

module.exports = function(errMsg, status){
    var error = new Error();
    error.message = errMsg;
    error.status = status;
    return error;
}
