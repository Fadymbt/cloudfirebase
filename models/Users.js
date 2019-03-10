const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost:27017/Cloud1', { useNewUrlParser: true });

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
