import { parseJwt } from "@/utils";
import NextAuth from "next-auth";
import KeycloakProvider from "next-auth/providers/keycloak";

export const authOptions = {
  providers: [
    KeycloakProvider({
      clientId: process.env.KEYCLOAK_ID,
      clientSecret: process.env.KEYCLOAK_SECRET,
      issuer: process.env.KEYCLOAK_ISSUER
    }),
  ],
  
  callbacks: {
    async session({ session, user, token }) {
      let isAdmin = false;
      if(token.roles) {
        isAdmin = token.roles.includes('admin')
      }
      session.user.isAdmin = isAdmin;

      return session;
    },

    async jwt({ token, user, account, profile, isNewUser }) {

      console.log('r', account)

      if (account?.access_token) {
        const parseToken = parseJwt(account?.access_token);
        token.roles = parseToken.realm_access.roles;
      }

      if (account) {
        // Save the access token and refresh token in the JWT on the initial login
        return {
          ...token,
          access_token: account.access_token,
          expires_at: Math.floor(Date.now() / 1000 + account.expires_in),
          refresh_token: account.refresh_token,
        };
      } else if (Date.now() < token.expires_at * 1000) {
        // If the access token has not expired yet, return it
        return token;
      } else {
        
        try {
          
          const response = await fetch(
            "http://localhost:8080/realms/nextjs-app/protocol/openid-connect/token",
            {
              headers: { "Content-Type": "application/x-www-form-urlencoded" },
              body: new URLSearchParams({
                grant_type: "refresh_token",
                client_id: process.env.KEYCLOAK_CLIENT_ID,
                client_secret: process.env.KEYCLOAK_CLIENT_SECRET,
                refresh_token: token.refresh_token,
              }),
              method: "POST",
            }
          );

          const tokens = await response.json();

          if (!response.ok) throw tokens;
          
          console.log('t', tokens)

          return {
            ...token, // Keep the previous token properties
            access_token: tokens.access_token,
            expires_at: Math.floor(Date.now() / 1000 + tokens.expires_in),
            refresh_token: tokens.refresh_token ?? token.refresh_token,
          };
        } catch (error) {
          console.error("Error refreshing access token", error);
          // The error property will be used client-side to handle the refresh token error
          return { ...token, error: "RefreshAccessTokenError" };
        }
      }
    },
  },
  
};

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };
