import { auth, currentUser } from "@clerk/nextjs/server";

export default async function EditPage() {
    const { userId } = await auth();
    const user = await currentUser();

    if (!userId) return <div>กรุณาเข้าสู่ระบบ</div>;

    return (
        <div>
            <h1>สวัสดีคุณ {user?.firstName}</h1>
            {/* โค้ดหน้าแก้ไขของคุณ */}
        </div>
    );
}