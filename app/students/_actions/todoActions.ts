'use server'
import { revalidatePath } from "next/cache"
import { redirect } from "next/navigation"

const TODO_URL = "http://localhost:4000/todos"

// ฟังก์ชันสำหรับอัปเดตข้อมูล (Update)
export async function updateTodoAction(formData: FormData) {
    const id = formData.get("id")
    const data = {
        task: formData.get("task"),
        time: Number(formData.get("time")),
        isDone: formData.get("isDone") === "true"
    }

    await fetch(`${TODO_URL}/${id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
    })

    revalidatePath("/students/todo")
    redirect("/students/todo")
}

// ฟังก์ชันสำหรับลบข้อมูล (Delete)
export async function deleteTodoAction(id: string) {
    await fetch(`${TODO_URL}/${id}`, { method: "DELETE" })
    revalidatePath("/students/todo")
}