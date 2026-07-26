const mongoose=require("mongoose");
const Schema=mongoose.Schema;

//now define the schema of the database
const userSchema=new Schema({
    email:{type:String, unique:true},//json object is paasses as a type
    password:String,
    age:Number

});
const todoSchema=new Schema({
    task:String,
    status:String,
    userID:mongoose.Schema.Types.ObjectId

});
//the schema is defined for out database
//now models has to be created for backend connectivit
//Syntax:
//const model=mongoose.model('table name',table schema)

const userModel=mongoose.model('users',userSchema);
const todoModel=mongoose.model('todos',todoSchema);

module.exports={
    userModel:userModel,
    todoModel:todoModel
};