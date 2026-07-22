// adding all the database logic 
const mongoose = require("mongoose");

// We reference the Schema class, we don't execute it
const Schema = mongoose.Schema; 

// defining the schema for the users table
const userschema = new Schema({
    username: { type: String, unique: true },
    password: String,
    age: Number // Use Number instead of Int32
});

const todoschema = new Schema({
    task: String,
    status: Boolean,
    userID: mongoose.Schema.Types.ObjectId // This part is perfect!
});

// now since the schema is defined i want a model on which i can top up this schema such that everytime a user comes
// or interacts with my app,the data acc to the schema gets inserted or deleted or updated in my db

// here users and todos are the collections for my db

// i need a data model
const UserModel = mongoose.model('users', userschema);
const TodoModel = mongoose.model('todos', todoschema);

// now since data models are created,the data has to be channelised through API routes
// means we need to now export the data to the backend for yk performing validations and authentications
// and thereafter we will have the data back
// so to export the data we will:
module.exports = {
    UserModel: UserModel,
    TodoModel: TodoModel
};