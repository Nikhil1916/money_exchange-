/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
import NextAuth from "next-auth"
import CredentialsProvider from 'next-auth/providers/credentials';
import { authOptions } from "../../../lib/auth";

const handler = NextAuth(authOptions);

export {handler as GET , handler as POST};