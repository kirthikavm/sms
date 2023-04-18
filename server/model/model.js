const mongoose = require('mongoose');
var schema = mongoose.Schema({
    questiontype:{
        type : String
       },
    qstatus:{
        type : String
    },
    questionname:{
        type: String
    },
    shortdes:{
        type: String
    },
    longquestion:{
        type: String
    },
    ansType:{
        type:String
    },
    tagname:{
        type:String
    },
    answerid:{
        type:String
    },
    txtans:{
        type:String
    },
    lstinput:{
        type:String
    },
    optinput:{
        type:String
    }

});
const questiondb = mongoose.model('question',schema);
module.exports=questiondb;