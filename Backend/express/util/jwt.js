import jwt from "jsonwebtoken";
import "dotenv/config";
const generateTokenAccess=(user)=>{
    jwt.sign(
        {
            role:user.role,
            id:user._id
        },
    process.env.SECRET_KEY_ACCESS,
    {
        expiresIn:"1h"
    }
    )
}
const generateTokenRefresh=(user)=>{
    jwt.sign(
        {
           
            id:user._id
        },
    process.env.SECRET_KEY_REFRESH,
    {
        expiresIn:"1h"
    }
    )
}

export default {generateTokenAccess,generateTokenRefresh};
