import NextAuth from "next-auth"
import google from "next-auth/providers/google"



export const {authOptions} = NextAuth({
    session : {
        strategy: "jwt",
    },
    providers: [google],
})

