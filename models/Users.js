const mongoose = require('mongoose');

mongoose.connect('mongodb://cloudfirebase:cloudfirebase123@ds163905.mlab.com:63905/cloudfirebase', { useNewUrlParser: true });

const db = mongoose.connection;

db.on('error', console.error.bind(console, 'connection error:'));

db.once('open', function() {
    console.log('User table Connection successful :D')
});

const UsersSchema = mongoose.Schema({
    name: String,
    userName: String,
    email: String,
    password: String,
});

module.exports = mongoose.model('Users', UsersSchema);
