'use client'
import { ChangeEvent, FormEvent, useState } from "react"

// --- Types ---
type TodoType = {
    id: number
    task: string
    time: number
    isDone: boolean
}

type TodoPropsType = TodoType & {
    deleteTodo: (id: number) => void
    editTodo: (id: number) => void
    toggleDone: (id: number) => void
}

export default function TodosPage() {
    // เก็บ array id task time status 
    const [todos, setTodos] = useState<TodoType[]>([
        { id: 1, task: "Play pingpong", time: 30, isDone: false },
        { id: 2, task: "Swimming at pool", time: 60, isDone: true },
        { id: 3, task: "Write this easy homework", time: 130, isDone: false },
    ])


    //เก็บข้อมูลที่พิมพ์ค้างไว้ใน Input (Task Name และ Time)

    const [form, setForm] = useState({ task: '', time: 0 })

    //ตัวแปรสำคัญที่ใช้เช็คว่า 
    // "ตอนนี้เรากำลังเพิ่มงานใหม่ (-1)" หรือ 
    // "กำลังแก้ไขงานเดิม (ใช้ ID ของงานนั้น)"
    const [editTodoId, setEditTodoId] = useState(-1)

    // Handle Input Changes
    const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target
        setForm((prev) => ({ ...prev, [name]: name === 'time' ? Number(value) : value }))
    }

    // --- Core Functions ---

    // Create/Update Todo

    const handleUpdateTodo = (e: FormEvent) => {
        e.preventDefault()

        if (editTodoId === -1) {
            // ADD

            // editTodoId === -1 มันจะสร้าง Object ใหม่ขึ้นมา
            // คำนวณ ID ต่อจากตัวสุดท้าย แล้วใช้ setTodos([...todos, newTodo])
            // เพื่อเพิ่มงานเข้าไปในรายการเดิม
            const id = todos.length ? todos[todos.length - 1].id + 1 : 1
            const newTodo: TodoType = { id, ...form, isDone: false }
            setTodos([...todos, newTodo])
        } else {
            //EDIT

            const updated = todos.map((item) =>
                item.id === editTodoId ? { ...item, ...form } : item
            )
            setTodos(updated)
            setEditTodoId(-1)
        }
        setForm({ task: '', time: 0 })
    }


    const deleteTodo = (id: number) => {
        setTodos(todos.filter(item => item.id !== id))
    }

    const editTodo = (id: number) => {
        const target = todos.find(item => item.id === id)
        if (target) {
            setEditTodoId(id)
            setForm({ task: target.task, time: target.time })
        }
    }

    const toggleDone = (id: number) => {
        setTodos(todos.map(item =>
            item.id === id ? { ...item, isDone: !item.isDone } : item
        ))
    }

    return (
        <main className="flex justify-center border items-center min-h-screen">
            <div className=" p-10 md:p-20 rounded-2xl w-full max-w-2xl">
                <h1 className="text-3xl font-bold mb-6 text-amber-900 border-b pb-2">My Todo List</h1>

                {/* List of Todos */}
                <ul className="space-y-3">
                    {todos.map((item, index) => (
                        <TodoDetail
                            key={item.id}
                            {...item}
                            deleteTodo={deleteTodo}
                            editTodo={editTodo}
                            toggleDone={toggleDone}
                        />
                    ))}
                </ul>

                {/*Section */}
                <form className="border p-6 mt-8 bg-white rounded-2xl shadow-inner" onSubmit={handleUpdateTodo}>
                    <h2 className="text-xl font-bold mb-4 text-amber-800">
                        {editTodoId === -1 ? "Add New Task" : "Edit Task"}
                    </h2>

                    <div className="space-y-4">
                        <div>
                            <label className="block text-sm font-medium mb-1">Task Name</label>
                            <input
                                className="w-full border p-2 rounded-lg focus:ring-2 focus:ring-amber-500 outline-none"
                                type="text" name="task"
                                value={form.task}
                                onChange={handleChange}
                                placeholder="Hello World"
                                required
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-medium mb-1">Time (minutes)</label>
                            <input
                                className="w-full border p-2 rounded-lg focus:ring-2 focus:ring-amber-500 outline-none"
                                type="number" name="time"
                                value={form.time}
                                onChange={handleChange}
                                required
                            />
                        </div>
                        <button className="w-full bg-[#413312] text-white font-bold py-2 rounded-full hover:bg-black transition shadow-md">
                            {editTodoId === -1 ? "Add Todo" : "Update Todo"}
                        </button>
                    </div>
                </form>
            </div>
        </main>
    )
}

//Components

function TodoDetail({ id, task, time, isDone, deleteTodo, editTodo, toggleDone }: TodoPropsType) {
    return (
        <li className={`flex items-center justify-between p-4 rounded-xl border`}>
            <div className="flex items-center gap-3">
                <input
                    type="checkbox"
                    checked={isDone}
                    onChange={() => toggleDone(id)}
                    className="w-5 h-5 accent-amber-700"
                />
                <div>
                    <div className={`font-bold ${isDone ? 'text-red-600' : 'text-amber-900'}`}>
                        {task}
                    </div>
                    <div className="text-sm text-amber-700 italic">{time} mins</div>
                </div>
            </div>

            <div className="flex gap-2">
                <button
                    className="text-amber-600 border border-amber-400 px-3 py-1 rounded-lg text-xs font-bold hover:bg-amber-200"
                    onClick={() => editTodo(id)}
                > EDIT </button>
                <button
                    className="text-red-500 border border-red-300 px-3 py-1 rounded-lg text-xs font-bold hover:bg-red-100"
                    onClick={() => deleteTodo(id)}
                > DELETE </button>
            </div>
        </li>
    )
}