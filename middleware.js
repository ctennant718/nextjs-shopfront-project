import { NextResponse } from "next/server";
import { withMiddlewareAuthRequired, getSession } from '@auth0/nextjs-auth0/edge';

import { checkRole } from "@/lib/api-functions/server/utils";
import settings from "@/lib/api-functions/server/permissions";

const {
  identifier,
  roles: { admin: adminRole },
} = settings;

export const config = {
  matcher: ["/admin/(.*)"],
};

export default withMiddlewareAuthRequired(async function middleware(req) {
  try {
    const res = NextResponse.next();
    const {user} = await getSession(req, res);

    const isAdmin = checkRole(user, identifier, adminRole);
  
    if (!isAdmin) {
      return NextResponse.redirect(new URL("/", req.url));
    }
    return res;
  } catch (err) {
    
    // If not logged in
    NextResponse.redirect(new URL("/api/auth/login", req.url));
  }
});