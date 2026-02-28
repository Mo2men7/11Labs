import { clerkMiddleware, createRouteMatcher } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";

const isPublicRoute = createRouteMatcher(["/signup(.*)", "/signin(.*)"]);
const isOrganizationSelectionRoute = createRouteMatcher([
  "/organization-selection(.*)",
]);

export default clerkMiddleware(async (auth, req) => {
  const { userId, orgId } = await auth();

  if (isPublicRoute(req)) {
    return NextResponse.next();
  }

  if (!userId) {
    await auth.protect();
    return;
  }

  if (isOrganizationSelectionRoute(req)) {
    return NextResponse.next();
  }

  if (userId && !orgId) {
    const organizationSelection = new URL("/organization-selection", req.url);
    return NextResponse.redirect(organizationSelection);
  }

  return NextResponse.next();
});

export const config = {
  matcher: [
    // Skip Next.js internals and all static files, unless found in search params
    "/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)",
    // Always run for API routes
    "/(api|trpc)(.*)",
  ],
};
