const { MongoClient } = require('mongodb');
const uri = "mongodb+srv://<아이디>:<패스워드>@<클러스터정보>";

module.exports = function (callback) {
    return MongoClient.connect(uri, callback);
};