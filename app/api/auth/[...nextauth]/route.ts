import NextAuth from 'next-auth';

const handler = NextAuth({
  providers: [
    {
      id: 'gumroad',
      name: 'Gumroad',
      type: 'oauth',
      authorization: {
        url: 'https://gumroad.com/oauth/authorize',
        params: {
          scope: 'view_profile view_sales',
        },
      },
      token: 'https://api.gumroad.com/oauth/token',
      userinfo: 'https://api.gumroad.com/v2/user',
      clientId: process.env.NEXT_PUBLIC_GUMROAD_CLIENT_ID,
      clientSecret: process.env.GUMROAD_CLIENT_SECRET,
      profile(profile) {
        return {
          id: profile.user.user_id,
          name: profile.user?.name,
          email: profile.user?.email,
        };
      },
    },
  ],
});

export { handler as GET, handler as POST };
