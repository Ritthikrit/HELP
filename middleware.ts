// middleware.ts
import { clerkMiddleware, createRouteMatcher } from "@clerk/nextjs/server";

// เลือกหน้าที่ "ต้อง Login" ถึงจะเข้าได้
const isProtectedRoute = createRouteMatcher([
  '/students/editStudent(.*)', // ป้องกันหน้า Edit ทั้งหมด
]);

export default clerkMiddleware(async (auth, req) => {
  if (isProtectedRoute(req)) await auth.protect(); // ถ้าไม่ใช่สมาชิก ให้เด้งไปหน้า Login
});

export const config = {
  matcher: [
    '/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)',
    '/(api|trpc)(.*)',
  ],
};