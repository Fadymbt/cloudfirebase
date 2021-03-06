const mongoose = require('mongoose');

mongoose.connect('mongodb+srv://fadymbt:fadymbt@cloudfirebase-neyas.mongodb.net/test?retryWrites=true', { useNewUrlParser: true });

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
