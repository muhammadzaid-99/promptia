import NextAuth from 'next-auth'
import GoogleProvider from 'next-auth/providers/google'
import { connectToDB } from '@utils/database'
import { dbQuery } from '@utils/db-pg'
import User from '@models/user'

const handler = NextAuth({
    providers: [
        GoogleProvider({
            clientId: process.env.GOOGLE_ID,
            clientSecret: process.env.GOOGLE_CLIENT_SECRET,
        })
    ],
    callbacks: {
        async session({ session }) {
            // const sessionUser = await User.findOne({
            //     email: session.user.email
            // })

            // session.user.id = sessionUser._id.toString();

            // return session;

            const sessionUser = await dbQuery('SELECT * FROM users WHERE email = $1', [session.user.email])

            session.user.id = sessionUser.rows[0].id.toString();

            return session;
        },
        async signIn({ profile }) {
            try {
                // await connectToDB();

                // console.log('Profile received from provider: ', profile)

                // console.log("Checking profile in database...")

                // check if a user already exists
                // const userExists = await User.findOne({
                //     email: profile.email
                // })

                // console.log("User exists in database? :", userExists)

                // // if not, create a new user, save to DB
                // if (!userExists) {
                //     await User.create({
                //         email: profile.email,
                //         name: profile.name,
                //         image: profile.picture
                //     })
                // }

                console.log('Profile received from provider: ', profile)
                console.log("Checking profile in database...")
                const userExists = await dbQuery('SELECT * FROM users WHERE email = $1', [profile.email])
                console.log(userExists.rows[0])

                if (!userExists.rowCount) {
                    console.log('User does not exist in database. Creating new user...')
                    const response = await dbQuery('INSERT INTO users (email, name, picture_url) VALUES ($1, $2, $3)', [profile.email, profile.name, profile.picture])
                }

                return true

            } catch (error) {
                console.log(error)
                return false
            }
        }
    }


})

export { handler as GET, handler as POST }