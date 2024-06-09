import NextAuth from 'next-auth';
import NextAuthConfig from 'next-auth';

const authConfig = {
  // ... your configuration options (providers, callbacks, etc.)
  providers: [],
  callbacks: {
    authorized({ request, auth }: any) {
      const protectedPaths = [
        /\/shipping/,
        /\/payment/,
        /\/place-order/,
        /\/profile/,
        /\/order\/(.*)/,
        /\/admin/,
      ];
      const { pathname } = request.nextUrl;
      if (protectedPaths.some((p) => p.test(pathname))) return !!auth;
      return true;
    },
  },
};

export const { auth: middleware } = NextAuth(authConfig);

export const config = {
  matcher: [
    // Match all request paths except for API routes, static files, etc.
    '/((?!api|_next/static|_next/image|favicon.ico).*)',
  ],
};
