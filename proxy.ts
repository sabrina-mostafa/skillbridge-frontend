import { NextRequest, NextResponse } from "next/server";
import { env } from "./src/env";
import { USER_ROLES, UserRoles } from "./src/constants/user/UserRoles";



const AUTH_URL = env.AUTH_URL;

export async function proxy(req: NextRequest) {
    const { pathname, searchParams } = req.nextUrl;

    try {
        const cookie = req.headers.get("cookie");

        const sessionRes = await fetch(`${AUTH_URL}/get-session`, {
            headers: {
                cookie: cookie || "",
            },
        });

        if (!sessionRes.ok) {
            return NextResponse.redirect(new URL("/", req.url));
        }

        const session = await sessionRes.json();
        const user = session?.user;


        if (!user) {
            return NextResponse.redirect(new URL("/", req.url));
        }

        const role: UserRoles | undefined = user.role;

        // ===============================
        // 1. EMAIL NOT VERIFIED
        // ===============================
        if (!user.emailVerified) {
            const verifyUrl = new URL("/verify-email", req.url);
            verifyUrl.searchParams.set("email", user.email);

            if (pathname !== "/verify-email") {
                return NextResponse.redirect(verifyUrl);
            }

            return NextResponse.next();
        }

        // ===============================
        // 2. NO ROLE → onboarding
        // ===============================
        if (!role) {
            console.log("NO ROLE");
            if (!pathname.startsWith("/onboarding")) {
                return NextResponse.redirect(new URL("/onboarding", req.url));
            }
            return NextResponse.next();
        }

        // ===================================================
        // 3. ROLE-BASED DASHBOARD PROTECTION
        // ===================================================
        if (
            pathname.startsWith("/dashboard/admin") &&
            role !== USER_ROLES.ADMIN
        ) {
            return NextResponse.redirect(new URL("/dashboard", req.url));
        }

        if (
            pathname.startsWith("/dashboard/tutor") &&
            role !== USER_ROLES.TUTOR
        ) {
            return NextResponse.redirect(new URL("/dashboard", req.url));
        }

        if (
            pathname.startsWith("/dashboard/student") &&
            role !== USER_ROLES.STUDENT
        ) {
            return NextResponse.redirect(new URL("/dashboard", req.url));
        }

        // role === ADMIN
        if (role === USER_ROLES.ADMIN) {
            if (!pathname.startsWith("/dashboard/admin")) {
                return NextResponse.redirect(
                    new URL("/dashboard/admin", req.url)
                );
            }

            return NextResponse.next();
        }

        // ===============================
        // 4. ROLE BUT PROFILE NOT COMPLETED
        // ===============================
        if (role && !user.profileCompleted) {
            const target = `/onboarding/${role.toLowerCase()}`;

            if (!pathname.startsWith("/onboarding")) {
                return NextResponse.redirect(new URL(target, req.url));
            }

            // prevent wrong onboarding route access
            if (
                pathname.startsWith("/onboarding") &&
                !pathname.startsWith(target)
            ) {
                return NextResponse.redirect(new URL(target, req.url));
            }
            return NextResponse.next();
        }

        // ===============================
        // 5. FULLY COMPLETED USER
        // ===============================
        // if (role && user.profileCompleted) {
        //     console.log("FULL USER");
        //     const profileUrl = `/user/${createSlug(user.name)}/profile`;

        //     // prevent loop
        //     if (!pathname.startsWith("/user")) {
        //         return NextResponse.redirect(new URL(profileUrl, req.url));
        //     }
        // }
        if (pathname.startsWith("/onboarding")) {
            return NextResponse.redirect(new URL("/dashboard", req.url));
        }

        return NextResponse.next();

    } catch (err) {
        return NextResponse.redirect(new URL("/", req.url));
    }
}

export const config = {
    matcher: [
        "/dashboard/:path*",
        "/onboarding/:path*",
        "/user/:path*",
        "/forgot-password",
        "/reset-password",
    ],
};