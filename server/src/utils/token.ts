import jwt from "jsonwebtoken";

export const generateAccessToken = (userId:string): string => {
    return jwt.sign(
        {id: userId},
            process.env.JWT_SECRET as string,
        {
            expiresIn:  (process.env.JWT_EXPIRES_IN as jwt.SignOptions["expiresIn"]) || "15m",
        })
    }

export const generateRefreshToken = (userId: string): string => {
  return jwt.sign(
    { id: userId },
        process.env.REFRESH_TOKEN_SECRET as string,
    {
        expiresIn: (process.env.REFRESH_TOKEN_EXPIRES_IN as jwt.SignOptions["expiresIn"]) || "2d",
    });
};        
    
