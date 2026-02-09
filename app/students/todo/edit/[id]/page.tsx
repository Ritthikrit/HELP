import { updateTodoAction } from "../../../_actions/todoActions"

export default async function EditTodoPage({ params }: { params: { id: string } }) {
    const { id } = await params;
    const res = await fetch(`http://localhost:4000/todos/${id}`, { cache: 'no-store' });
    const todo = await res.json();

    return (
        <main className="flex justify-center items-center min-h-screen">
            <form action={updateTodoAction} className="border p-8 bg-white rounded-2xl shadow-xl w-full max-w-md">
                <h2 className="text-2xl font-bold mb-6 text-amber-800">Edit Task</h2>
                
                <input type="hidden" name="id" value={todo.id} />

                <div className="space-y-5">
                    <div>
                        <label className="block text-sm font-medium mb-1">Task Name</label>
                        <input name="task" defaultValue={todo.task} className="w-full border p-2 rounded-lg" required />
                    </div>
                    <div>
                        <label className="block text-sm font-medium mb-1">Time (minutes)</label>
                        <input name="time" type="number" defaultValue={todo.time} className="w-full border p-2 rounded-lg" required />
                    </div>
                    
                    {/* ส่วนแก้ไข isDone (อยู่หน้า edit ตามที่ต้องการ) */}
                    <div className="flex items-center gap-2 border p-3 rounded-lg bg-gray-50">
                        <input 
                            type="checkbox" 
                            name="isDone" 
                            defaultChecked={todo.isDone} 
                            className="w-5 h-5 accent-amber-700"
                        />
                        <label className="text-sm font-medium">Mark as Done</label>
                    </div>
                    
                    <button type="submit" className="w-full bg-amber-900 text-white font-bold py-2 rounded-full">
                        Update Todo
                    </button>
                </div>
            </form>
        </main>
    )
}