// middleware.ts
import { clerkMiddleware, createRouteMatcher } from "@clerk/nextjs/server";

// กำหนดหน้าที่ "ต้อง Login เท่านั้น" ถึงจะเข้าได้
const isProtectedRoute = createRouteMatcher([
  '/students/editStudent(.*)', // ล็อคหน้าแก้ไข
  '/students/todo(.*)',        // ถ้าอยากให้หน้า Todo ต้อง Login ด้วยให้ใส่บรรทัดนี้
]);

export default clerkMiddleware(async (auth, req) => {
  // ตรวจสอบว่าหน้าปัจจุบันอยู่ในรายชื่อที่ต้องป้องกันไหม
  if (isProtectedRoute(req)) {
    await auth.protect(); // ถ้ายังไม่ Login ระบบ Clerk จะเด้งไปหน้า Sign-in ให้เอง
  }
});

export const config = {
  matcher: [
    // ป้องกันหน้าทั้งหมด ยกเว้นไฟล์ระบบของ Next.js และไฟล์รูปภาพ
    '/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)',
    '/(api|trpc)(.*)',
  ],
};