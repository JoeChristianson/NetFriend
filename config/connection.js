const {connect, connection} = require("mongoose");

const connectionString = process.env.MONGODB_URI ||
"mongodb://localhost:27017/netfriend_db";

connect(connectionString, {
    useNewUrlParser: true,
    userUnifiedTopology:true
})

module.exports = connection