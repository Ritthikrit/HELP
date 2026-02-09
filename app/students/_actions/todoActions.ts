'use server'
import { revalidatePath } from "next/cache"
import { redirect } from "next/navigation"

const TODO_URL = "http://localhost:4000/todos"

// ฟังก์ชันสำหรับเพิ่มงานใหม่ (เรียกใช้จากหน้า Todo List)
export async function addTodoAction(formData: FormData) {
    const data = {
        task: formData.get("task"),
        time: Number(formData.get("time")),
        isDone: false // ค่าเริ่มต้นเมื่อเพิ่มใหม่
    }

    await fetch(TODO_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
    })

    revalidatePath("/students/todo")
}

// ฟังก์ชันสำหรับอัปเดตข้อมูล (เรียกใช้จากหน้า Edit)
export async function updateTodoAction(formData: FormData) {
    const id = formData.get("id")
    const data = {
        task: formData.get("task"),
        time: Number(formData.get("time")),
        isDone: formData.get("isDone") === "on" // รับค่าจาก checkbox (ถ้าติ๊กจะเป็น "on")
    }

    await fetch(`${TODO_URL}/${id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
    })

    revalidatePath("/students/todo")
    redirect("/students/todo")
}

// ฟังก์ชันสำหรับลบข้อมูล
export async function deleteTodoAction(id: string) {
    await fetch(`${TODO_URL}/${id}`, { method: "DELETE" })
    revalidatePath("/students/todo")
}