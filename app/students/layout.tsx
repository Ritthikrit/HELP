// app/students/layout.tsx
import Link from "next/link";
import { STYLE } from "@/constants/type";
import Logout from "./LogoutButton";
import Login from "./LoginButton";

export default function Layout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <div>
            <nav className="mx-8 p-4 flex gap-4 items-center"> {/* เพิ่ม flex gap เพื่อความสวยงาม */}
                <Link className={STYLE} href="/students/">Home</Link>

                {/* เพิ่มเมนู Todo ตรงนี้ */}
                <Link className={STYLE} href="/students/todo">Todo List</Link>

                <Link className={STYLE} href="/students/register">Register</Link>
                <Link className={STYLE} href="/students/editStudent">Edit</Link>
                <Link className={STYLE} href="/students/check">Check</Link>
                <Login />
                <Logout />
            </nav>

            {/* เนื้อหาหน้า Todo จะมาโผล่ที่ children ตรงนี้อัตโนมัติ */}
            {children}
        </div>
    );
}