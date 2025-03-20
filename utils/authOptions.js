import connectDB from '@/config/database';
import User from '@/models/User';
import GoogleProvider from 'next-auth/providers/google';
export const authOptions = {
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
      authorization: {
        params: {
          prompt: 'consent', // Forces users to re-consent each time they sign in
          access_type: 'offline', //  Requests a refresh token so that access tokens can be renewed without user intervention.
          response_type: 'code', // Uses the Authorization Code Flow for secure authentication.
        },
      },
    }),
  ],
  callbacks: {
    // invoked on successful sign in
    async signIn({ profile }) {
      // 1. Connect to the database
      await connectDB();
      // 2. Check if user exists
      const userExists = await User.findOne({ email: profile.email });
      // 3. if not, create user
      if (!userExists) {
        const username = profile.name.slice(0, 20);
        await User.create({
          email: profile.email,
          username,
          image: profile.picture,
        });
      }
      // 4. return true to allow sign in
      return true;
    },
    // session callback function that modifies the session object
    async session({ session }) {
      // 1. Get user from database
      const user = await User.findOne({
        email: session.user.email,
      });
      // 2. Assign user id from the session
      session.user.id = user._id.toString();
      // 3. return session
      return session;
    },
  },
};
