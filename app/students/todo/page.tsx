import { deleteTodoAction, addTodoAction } from "../_actions/todoActions"
import Link from "next/link"

export default async function TodosPage() {
    // Fetch ข้อมูลมาแสดง (Server Component ไม่ต้องใช้ useEffect)
    const res = await fetch("http://localhost:4000/todos", { cache: 'no-store' });
    const todos = await res.json();

    return (
        <main className="flex justify-center p-10 bg-gray-50 min-h-screen">
            <div className="w-full max-w-2xl bg-white p-8 rounded-2xl shadow-lg">
                <h1 className="text-3xl font-bold mb-6 text-amber-900 border-b pb-2">My Todo List</h1>
                
                {/* List of Todos */}
                <ul className="space-y-3 mb-8">
                    {todos.map((item: any) => (
                        <li key={item.id} className="flex items-center justify-between p-4 rounded-xl border">
                            <div>
                                <div className={`font-bold ${item.isDone ? 'text-gray-400 line-through' : 'text-amber-900'}`}>
                                    {item.task}
                                </div>
                                <div className="text-sm text-amber-700 italic">{item.time} mins</div>
                            </div>
                            <div className="flex gap-2">
                                <Link href={`/students/todo/edit/${item.id}`} className="text-amber-600 border border-amber-400 px-3 py-1 rounded-lg text-xs font-bold hover:bg-amber-50"> EDIT </Link>
                                <form action={deleteTodoAction.bind(null, item.id)}>
                                    <button type="submit" className="text-red-500 border border-red-300 px-3 py-1 rounded-lg text-xs font-bold hover:bg-red-100"> DELETE </button>
                                </form>
                            </div>
                        </li>
                    ))}
                </ul>

                {/* Section สำหรับ Add (อยู่หน้าแรกตามที่ต้องการ) */}
                <form action={addTodoAction} className="border p-6 bg-amber-50 rounded-2xl shadow-inner">
                    <h2 className="text-xl font-bold mb-4 text-amber-800">Add New Task</h2>
                    <div className="space-y-4">
                        <input name="task" placeholder="Task Name" className="w-full border p-2 rounded-lg" required />
                        <input name="time" type="number" placeholder="Time (minutes)" className="w-full border p-2 rounded-lg" required />
                        <button className="w-full bg-[#413312] text-white font-bold py-2 rounded-full">Add Todo</button>
                    </div>
                </form>
            </div>
        </main>
    )
}