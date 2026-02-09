'use client'

import { StudentType, STYLE } from '@/constants/type'
import { useState, useTransition } from 'react'
import { createStudent, deleteStudent, updateStudent } from '../_actions/studentAction'

export default function StudentForm({ students }: { students: StudentType[] }) {

    const [isPending, startTransition] = useTransition()
    const [deletingId, setDeletingId] = useState<string | null>(null)

    return (
        <div className={STYLE}>
            {/* CREATE */}
            <form action={createStudent}>
                <input className={STYLE} name="name" placeholder="name" required />
                <input className={STYLE} name="age" placeholder="age"
                    type="number" required />
                <button className={STYLE}>Add</button>
            </form>

            <hr />

            {/* LIST + UPDATE + DELETE */}
            {students.map(s => (
                <form key={s.id} action={updateStudent}>
                    <input className={STYLE} type="hidden" name="id" value={s.id} />
                    <input className={STYLE}
                        type="text" name="name" defaultValue={s.name} />
                    <input className={STYLE}
                        type="number" name="age" defaultValue={s.age} />
                    <button className={STYLE}>Update</button>
                    <button className={STYLE} type="button"
                        onClick={() => {
                            setDeletingId(s.id)
                            startTransition(() => deleteStudent(s.id))
                        }}
                    >
                        {isPending && deletingId === s.id ? "Deleting..." : "Delete"}
                    </button>
                </form>
            ))
            }
        </div >
    )
}