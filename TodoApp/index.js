const express=require("express");
const app=express();
app.use(express.json());
//done with express library
const cors=require("cors");
app.use(cors());
//done with cors
const jwt=require("jsonwebtoken");
const jwtsecret="some-secret-key";
//done with jwt library
const bcrypt=require("bcrypt");
//donw with bcrypt
const {z}=require("zod");
//done with zod for input validations
const mongoose=require("mongoose");
const {userModel,todoModel}=require("./db");
mongoose.connect("connection-url-username-password/TODO");
//done with inloading usermodel and todomodel
//done with cluster conectivity


//done with 4 api end points
app.post('/signup',async function(req,res)
{
    const requiredBody=z.object({
    email:z.string().min(5).email(),
    password:z.string().min(3).max(100),
    age:z.number().positive()
});
    const email=req.body.email;
    const password=req.body.password;
    const age=req.body.age;
    //done with fetching raw data from the request headers
    const requiredDataparsedwithsuccess=requiredBody.safeParse(req.body);
    if(!requiredDataparsedwithsuccess)
    {
        res.json({
            message:"Invalid input format"
        })
        return;//very imp you return from here
    }
    try{
        const hashedpassword=await bcrypt.hash(password,5);//simply hash for 5 salt rounds
        await userModel.create({
            email:email,
            password:hashedpassword,
            age:age

        });
        res.json({
            message:"Signed up successfully"
        })

    }catch(e)
    {
        res.json({
            message:e.message,
            
        })
    }
});
app.post('/signin',async function(req,res)
{
    const email=req.body.email;
    const password=req.body.password;
    //now i have fetched username and password from the raw body
    //i need to check whether the unhased pass is equal to anything present in db or not
    try{
        //since email is also unique so hit the db and check whether the email exists in db or not

        const usercame=await userModel.findOne({
        email:email
    });
    if(!usercame)
    {
        res.json({
            message:"User does not exists"
        });

    }
    else{
        //means user exists so now check whether the password matches or not
        const passwordcheck=await bcrypt.compare(password,usercame.password);
        if(!passwordcheck)
        {
            res.json({
            message:"Invalid Password"
        });
        }else{
            //since the password matched generate the jwt token and let the user know he is logged in
            
        const token=jwt.sign({
            id:usercame._id.toString()//***DOUBT */
        },jwtsecret);

        res.json({
            message:"Logged in Successfully",
            token:token
        });
        
            
        }
    }
    }catch(e)
    {
        res.json({
            message:"Cannot generate token"
        });

    }
   
});
//so far the basic routing for sign up and sign in is done
app.post('/postodo',function(req,res)
{

});
app.post('/getodo',function(req,res)
{

});

app.listen(3001);

