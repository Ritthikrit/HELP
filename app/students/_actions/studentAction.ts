'use server'
import { STUDENT_URL } from "@/constants/type"
import { revalidatePath } from "next/cache"

export async function createStudent(formData: FormData) {
    const student = {
        name: formData.get('name'),
        age: Number(formData.get('age')),
    }

    await fetch(STUDENT_URL, {
        method: 'POST',
        body: JSON.stringify(student),
        headers: { 'Content-Type': 'application/json' },
    })
    revalidatePath('/students/editStudent')
}

export async function updateStudent(formData: FormData) {
    const id = formData.get('id')
    const student = {
        name: formData.get('name'),
        age: Number(formData.get('age')),
    }

    await fetch(`${ STUDENT_URL }/${ id }`, {
        method: 'PATCH',
        body: JSON.stringify(student),
        headers: { 'Content-Type': 'application/json' },
    })
    revalidatePath('/students/editStudent')
}

const wait = (ms: number) => new Promise(resolve => setTimeout(resolve, ms))

export async function deleteStudent(id: string) {
    await fetch(`${ STUDENT_URL }/${ id }`, {
        method: 'DELETE',
    })
    // await wait(1000)
    revalidatePath('/students/editStudent')
}