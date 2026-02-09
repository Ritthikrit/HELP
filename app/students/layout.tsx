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
            <nav className="mx-8 p-4">
                <Link className={STYLE} href="/students/">Home</Link>
                <Link className={STYLE} href="/students/register">Register</Link>
                <Link className={STYLE} href="/students/editStudent">Edit</Link>
                <Link className={STYLE} href="/students/check">Check</Link>
                <Login />
                <Logout />
            </nav>
            {children}
        </div>
    );
}
