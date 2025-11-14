import passport from 'passport'
import {Strategy as GoogleStrategy} from "passport-google-oauth20";

import { prisma } from "../lib/prismaClient.js";
import { UserSchema } from '../types/index.js';



passport.use(
    new GoogleStrategy(
        {
            clientID:process.env.GOOGLE_CLIENT_ID!,
            clientSecret:process.env.GOOGLE_CLIENT_SECRET!,
            callbackURL:"http://localhost:8000/auth/google/callback"
        },
        async (accessToken,refreshToken ,profile , done) => {  
            

            const email = profile.emails?.[0]?.value ?? "";

            if (!email) {
                return done(new Error("Email not found in Google profile"));
            }

            let user = await prisma.user.findUnique({ where: { email } });


            if(!user){
                await prisma.user.create({
                    data: {
                        googleId:profile.id,
                        username: profile.displayName ?? "",
                        email,
                        password: "",

                    }
                })
                console.log("Registerd Successfull 🚀🚀🚀")
            }

            const parsed = UserSchema.safeParse(user);
            if (!parsed.success) return done(null, parsed.error);
            return done(null , profile)
        },
    )
)


export default passport;