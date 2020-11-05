const { Buffer } = require('buffer');

function getImgBuffer(base64){

    const base64str = base64.replace(/^data:image\/\w+;based,/,'')
    var strImage = strToReplace.replace(/^data:image\/[a-z]+;base64,/, "");
    return Bufffer.from(base64str,'base64');
}

module.exports = getImgBuffer;