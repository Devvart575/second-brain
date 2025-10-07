import { z } from "zod";

const userValidation = z.object({
    username : z.string()
    .min(3, "username must be at least 3 character")
    .max(20, "username should not be maximum 20 character"),
    password : z.string()
    .min(4, "password at least 4 character")
    .max(20, "passsword should not be maximum 8 character")
    .regex(/[0-9]/, "password should contain a number")
    .regex(/[A-Z]/, "Password me ek capital letter hona chahiye")
    .regex(/[@$!%*?&#]/, "Password me ek special character (@$!%*?&#) hona chahiye") 

})

export default userValidation;