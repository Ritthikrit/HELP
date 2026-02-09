// app/students/layout.tsx
import Link from "next/link";
import { STYLE } from "@/constants/type";
import { ClerkProvider, SignInButton, SignedIn, SignedOut, UserButton } from "@clerk/nextjs";

export default function Layout({ children }: { children: React.ReactNode }) {
    return (
        <ClerkProvider>


            {/* เพิ่มเมนู Todo ตรงนี้ */}


            <div>
                <nav className="mx-8 p-4 flex gap-4 items-center border-b">
                    <Link className={STYLE} href="/students/">Home</Link>
                    <Link className={STYLE} href="/students/todo">Todo List</Link>
                    <Link className={STYLE} href="/students/editStudent">Edit</Link>
                    <Link className={STYLE} href="/students/register">Register</Link>
                    <Link className={STYLE} href="/students/check">Check</Link>




                    {/* ส่วนจัดการการเข้าสู่ระบบของ Clerk */}
                    <div className="ml-auto flex gap-4">
                        <SignedOut>
                            {/* ถ้ายังไม่ Login ให้โชว์ปุ่มนี้ */}
                            <SignInButton mode="modal">
                                <button className="bg-blue-600 text-white px-4 py-2 rounded-md">
                                    Login with Google
                                </button>
                            </SignInButton>
                        </SignedOut>

                        <SignedIn>
                            {/* ถ้า Login แล้ว ให้โชว์รูปโปรไฟล์และปุ่ม Logout */}
                            <UserButton showName />
                        </SignedIn>
                    </div>
                </nav>
                <main className="p-4">{children}</main>
            </div>
        </ClerkProvider>
    );
}