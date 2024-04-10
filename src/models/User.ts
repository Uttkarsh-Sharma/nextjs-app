import exp from "constants";
import mongoose,{Schema, Document} from "mongoose";

// Typesafety
export interface Message extends Document{
    content:string,
    createdAt:Date
}

// Schema <Message> is giving typsafety access to the properties of this schema
const MessageSchema: Schema<Message> = new Schema({
    content:{
        type: String,
        required: true
    },
    createdAt:{ 
        type: Date ,
        required:true,
        default:Date.now()
    },
})


// Typesafety for User
export interface User extends Document{
    username:string,
    email:string, 	
    password:string;
    verifyCode:string,
    verifyCodeExpiry:Date,
    isVerified:boolean,
    isAcceptingMessage:boolean,
    messages:Message[]
}

const UserSchema: Schema<User> = new Schema({
    username:{
        type: String,
        required: [true,"Username is required"],
        trim: true,
        unique: true,
    },

    email:{ 
        type: String ,
        required:[true,"Email is required"],
        unique:true,
        // regex is used here
        match:[/[a-z0-9]+@[a-z]+\.[a-z]{2}/i,"please use a valid email address"]
    },

    password:{
        type: String,
        required:[true,"Password is required"],
    },
    verifyCode:
    {  
        type:String,
        required:[true,"Verify code is required"]
    },
    verifyCodeExpiry:{
        type:Date,
        required:[true,"Verify Code Expiry Date is required"]
    },
    isVerified:{
        type:Boolean,
        default:false,
    },
    isAcceptingMessage:{
        type:Boolean,
        default:true
    },
    messages: [MessageSchema],
})

const UserModel = (mongoose.models.User as mongoose.Model<User>) || mongoose.model<User>("User",UserSchema)

export default UserModel;