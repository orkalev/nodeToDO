var configValues = require('./config');

//Return the connection string for mongoDB.
module.exports = {
    getDbconnectionString: function(){
        return  `mongodb+srv://${configValues.uname}:${configValues.pwd}@nodetodosample.uuwbbck.mongodb.net/?retryWrites=true&w=majority`
    }
}

